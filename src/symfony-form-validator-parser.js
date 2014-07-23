/*! symfony-form-validator-parser - v0.0.1 - 2014-07-03
* https://github.com/bichotll/symfony-form-validator-parser
* Copyright (c) 2014 bichotll; Licensed Apache2 */
/*! symfony-form-validator-parser - v0.0.1 - 2014-07-03
* https://github.com/bichotll/symfony-form-validator-parser
* Copyright (c) 2014 bichotll; Licensed Apache2 */
(function($) {

    'use strict';
    // Static method.
    $.sfvp = function(options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.sfvp.options, options);
        //check if the object is passed
        if (options.object === '') {
            throw "No object inserted";
        }

        var generatedForm = $('<form role="form" ></form>');
        //createFields
        createFields(options, generatedForm);
        // Return something awesome.
        return generatedForm;
    };
    /**
     * Static method default options.
     * 
     * @public
     */
    $.sfvp.options = {
        /**
         * The form object
         * 
         * @public
         */
        object: '',
        /**
         * Names to avoid the form containers
         * 
         * @public
         * @type Array
         */
        formContainerNames: [
            '_form',
            'form_'
        ],
        /**
         * Field types to avoid the sub paths/fields
         * 
         * @private
         * @type Array
         */
        subChoiseAvoidedTypes: [
            'time',
            'date',
            'datetime',
            'birthday'
        ]
    };
    
    /**
     * Already checked paths. Workaround for repeated fields
     * 
     * @private
     * @type Array
     */
    var checkedPaths = [];
    
    /**
     * Time paths. Used to don't drill the subChoise paths like time field types.
     * 
     * @private
     * @type array
     */
    var subChoiseAvoidedPaths = [];
    
    /**
     * Create all the fields
     * 
     * @private
     * @param {type} options
     * @param {type} generatedForm
     * @returns {undefined}
     */
    function createFields(options, generatedForm) {
        //drill the array object
        $.each(options.object, function(key, value) {
            //it's first element and a form
            if (key === 0 && !checkField(value, options)) {
                generatedForm.addClass('sfvp-form');
                return true;
            } else if (checkField(value, options)) {
                generatedForm.append(addField(value));
            }
        });
    }

    /**
     * Checks if it's a field
     * 
     * @private
     * @param {Object} field
     * @param {Array} options
     * @returns {Boolean}
     */
    function checkField(field, options) {
        //workaround repeated fields
        if ($.inArray(field.fullPathName, checkedPaths) > -1) {
            return false;
        }
        checkedPaths.push(field.fullPathName);
        if (field.fullPathName[field.fullPathName.length - 1] === ']') {

            //check if it's just a form container
            var isFormContainer = $.grep(options.formContainerNames, function(n) {
                return field.type.indexOf(n) > -1;
            });
            if (isFormContainer.length) {
                return false;
            }

            //check if it's one of the subChoiceAvoidedTypes
            if ($.inArray(field.type, options.subChoiseAvoidedTypes) > -1) {
                subChoiseAvoidedPaths.push(field.fullPathName);
            } else {
                var isChoiseAvoided = $.grep(subChoiseAvoidedPaths, function(n) {
                    return field.fullPathName.indexOf(n) > -1;
                });
                if (isChoiseAvoided.length > 0) {
                    return false;
                }
            }

            return true;
        }
        return false;
    }

    /**
     * Add the field to the form
     * 
     * @private
     * @param {Object} field
     * @returns {Object}
     */
    function addField(field) {
        var el;
        //check kinda field
        if (typeof field.options.choices !== "undefined") {
            el = $('<select></select>');
            //add option elements
            $.each(field.options.choices, function(key, value) {
                el.append($('<option value="' + key + '" >' + value + '</option>'));
            });
        } else if (field.type === "textarea") {
            el = $('<textarea></textarea>');
        } else {
            el = $('<input></input>');
        }

        //check the field type
        if (field.type === 'repeated') {
            el.data('repeated', true);
            el.attr('type', 'hidden');
        }
        if (field.type === 'checkbox') {
            el.attr('type', 'checkbox');
        }
        if (field.type === 'radio') {
            el.attr('type', 'radio');
        }
        if (field.type === 'file') {
            el.attr('type', 'file');
        }
        if (field.type === 'hidden') {
            el.attr('type', 'hidden');
        }
        if (field.type === 'button') {
            el.attr('type', 'button');
            el.attr('value', field.pathName[0]);
        }
        if (field.type === 'reset') {
            el.attr('type', 'reset');
            el.attr('value', field.pathName[0]);
        }
        if (field.type === 'submit') {
            el.attr('type', 'submit');
            el.attr('value', field.pathName[0]);
        }
        if (field.options.required === true) {
            el.attr('required', true);
        }

        //add the value
        if (field.value !== null){
            el.val(field.value);
        }
        //add name and id
        el.attr('name', field.fullPathName);
        el.attr('id', field.fullPathName);
        //add constraints data
        el.data('constraints', field.constraints);
        //add all the options
        el.data('options', field.options);
        //twB 3
        el.addClass('form-control');
        //create div container n label twBootstrap 3
        var label = $('<label>' + field.pathName[0] + '</label>');
        label.attr('for', field.fullPathName);
        var divFormGroup = $('<div class="form-group"></div>');
        divFormGroup.append(label);
        divFormGroup.append(el);
        
        //if hidden hide
        if (el.attr('type') === 'hidden'){
            divFormGroup.addClass('hide');
        }
        
        //return the field group
        return divFormGroup;
    }

}(jQuery));

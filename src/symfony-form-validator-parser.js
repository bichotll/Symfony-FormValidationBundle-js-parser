/*
 * symfony-form-validator-parser
 * 
 *
 * Copyright (c) 2014 bichotll
 * Licensed under the Apache2 license.
 */

(function($) {

    'use strict';

//  // Collection method.
//  $.fn.awesome = function () {
//    return this.each(function (i) {
//      // Do something awesome to each selected element.
//      $(this).html('awesome' + i);
//    });
//  };

    // Static method.
    $.sfvp = function(options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.sfvp.options, options);

        //check if the object is passed
        if (options.object === '') {
            throw "No object inserted";
        }

        var generatedForm = $("<form></form>");

        //drill the array object
        $.each(options.object, function(key, value) {
            //it's first element and a form
            if (key === 0 && !checkField(value)) {
                generatedForm.addClass('sfvp-form');
                return true;
            } else if (checkField(value)) {
                generatedForm.append(addField(value));
            }
        });

        // Return something awesome.
        return generatedForm;
    };

    // Static method default options.
    $.sfvp.options = {
        object: ''
    };
    
    /**
     * Already checked paths. Workaround for repeated fields
     * 
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
     * Field types to avoid the sub paths/fields
     * 
     * @type Array
     */
    var subChoiseAvoidedTypes = [
        'time',
        'date',
        'datetime',
        'birthday'
    ];
    
    /**
     * Names to avoid the form containers
     * 
     * @type Array
     */
    var formContainerNames = [
        '_form',
        'form_'
    ];

    /**
     * Checks if it's a field
     * 
     * @private
     * @param {Object} field
     * @returns {Boolean}
     */
    function checkField(field) {
        //workaround repeated fields
        if ($.inArray(field.fullPathName, checkedPaths) > -1) {
            return false;
        }
        checkedPaths.push(field.fullPathName);
        
        if (field.fullPathName[field.fullPathName.length - 1] === ']') {
            
            //check if it's just a form container
            var isFormContainer = $.grep(formContainerNames, function(n) {
                return field.type.indexOf(n) > -1;
            });
            if (isFormContainer.length) {
                return false;
            }

            //check if it's one of the subChoiceAvoidedTypes
            if ($.inArray(field.type, subChoiseAvoidedTypes) > -1) {
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
        if (field.options.required === true) {
            el.attr('required', true);
        }

        //add name and id
        el.attr('name', field.fullPathName);
        el.attr('id', field.fullPathName);

        return el;
    }

//  // Custom selector.
//  $.expr[':'].sfvp = function (elem) {
//    // Is this element awesome?
//    return $(elem).text().indexOf('sfvp') !== -1;
//  };

}(jQuery));

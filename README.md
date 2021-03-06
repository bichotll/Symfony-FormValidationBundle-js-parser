# Symfony bichotll/FormValidationBundle parser

It creates the form from the FormValidationBundle json form provided. I'm using it on my APIs.

It's used with [https://github.com/bichotll/FormValidationBundle](https://github.com/bichotll/FormValidationBundle).


## Getting Started

###1.Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/bichotll/jquery-symfony-form-validator-parser/master/dist/jquery.symfony-form-validator-parser.min.js
[max]: https://raw.github.com/bichotll/jquery-symfony-form-validator-parser/master/dist/jquery.symfony-form-validator-parser.js

###2.Get it with bower
```shell
bower install -S symfony-form-validator-parser
```

###3. Let's just check it

In your web page:

```html
<script src="path.../jquery.js"></script>
<script src="path.../symfony-form-validator-parser.min.js"></script>
<script>
jQuery(function($) {
  $.sfvp(); // returns Exception "No object inserted"
});
</script>
```


## Documentation

Not so much to explain. It just creates a complete html form object from the FormValidationBundle object.

###Options

 - object: {Object} The FormValidationBundle object.
 - fillData: {boolean} (default: true) Maybe you do not want to fill the data.
 - formContainerNames: {Array} (default: ['_form','form_']) Form container types that we don't have to create an field
 - subChoiseAvoidedTypes: {Array} (default: ['time','date','datetime','birthday']) Symfony creates some sub-fields for time type fields. We avoid them. If you want them just set subChoiseAvoidedTypes to an empty array.


## Examples

###Simple functionality

```js
//get the object from api rest (for example)
$.get( "entity/getFormInfo", function( data ) {
    //get the form generated
    var form = $.sfvp({
        object: data
    });

    //append to body
    $('body').append(form);
});
```


## Release History

###1.2.0
 - added support for entity type creating select with its options

###1.1.0
 - changed the way it handles the data (field values). Compatible with FormValidationBundle 1.2.0

###1.0.7 
 - bug solved for avoided types

###1.0.6
 - Added formContainerNames and subChoiseAvoidedTypes as public options.

###1.0.2
 - Parsed submit, reset and button properly

###1.0.0 
 - It creates the form and fill it with data


##TODO
 - TDD tests. Simply if bored or new changes.
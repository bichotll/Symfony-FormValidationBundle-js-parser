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

###1.0.1
 - Parsed submit, reset and button properly

###1.0.0 
 - It creates the form and fill it with data


##TODO
 - TDD tests. Simply if bored or new changes.
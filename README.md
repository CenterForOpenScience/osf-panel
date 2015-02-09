# osf-panel
Smart panels that show and hide bootstrap columns

### How to Install

If you are using Bower, add osf-panel to your bower.json file and install by running

```bower install osf-panel```

If you just want to use the distribution file, copy paste dist/jquery-osfPanel.js or the minified version to your project.


### How to use it

Step 1: You need to create a div tag that will include the buttons. Add a class to this div that you can pass to the plugin.

```html
<div class="switch pull-right"></div>
```

Step 2: Then for each of the columns you want to use add the title you would like to appear on the button. This will also initialize the plugin for these columns. If you don't add this to a column it will not be included in the toggle.

```html
    <div class="col-md-5" data-osf-panel="Second">
    ...
    </div>
```

Step 3: Initialize the plugin with javascript. Here you can add options. The most important one is the selector that identifies where the button div is.

```html
<script type="text/javascript">
    $(document).ready(function(){
        $('*[data-osf-panel]').osfPanel({ buttonElement : '.switch', onSize : 'md' });
    });
</script>
```

Here's a description of options:

```javascript
    var settings = {                                       // Default options
        complete : null,                                            // Function to run at the end.
        sizes : { "xs" : 0, "sm" : 768, "md" : 992, "lg" : 1200 },  // Default Bootstrap sizes. If you edited your default sizes change them here as well
        buttonElement : ".switch",                                  // Where to place the buttons
        onClass : 'btn-primary',                                    // The class to add to buttons for ON
        offClass : 'btn-default',                                   // The class to add to buttons for OFF
        onSize : 'sm'                                               // Which size onwards to apply, it's best to start at sm.
    };
```

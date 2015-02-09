/**
 * osf-panel - Smart panels that show and hide bootstrap columns
 * @author Caner Uguz
 * @version v0.0.1
 * @link https://github.com/caneruguz/osf-panel
 * @license Apache 2.0
 */
(function($) {
    $.fn.osfPanel = function(options) {
        var settings = $.extend({                                       // Default options
            complete : null,                                            // Function to run at the end.
            sizes : { "xs" : 0, "sm" : 768, "md" : 992, "lg" : 1200 },  // Default Bootstrap sizes.
            buttonElement : ".switch",                                  // Where to place the buttons
            onClass : 'btn-primary',                                    // The class to add to buttons for ON
            offClass : 'btn-default',                                   // The class to add to buttons for OFF
            onSize : 'sm'                                               // Which size onwards to apply 
        }, options),
        el = this,                                                      // The elements this was called on. This is a list, should run .each().
        modes = ['xs', 'sm', 'md', 'lg'],
        size = settings.sizes,
        currentMode,
        initialize = false;
        
        // Check what size we are on 
        el.updateMode = function(){
            var width = $(window).width();                             
            if(width >= size.xs && width < size.sm ){
                currentMode = "xs";
            }
            if(width >= size.sm && width < size.md ){
                currentMode = "sm";
            }
            if(width >= size.md && width < size.lg ){
                currentMode = "md";
            }
            if(width >= size.lg ){
                currentMode = "lg";
            }
        }
                     
        // Adjust the widths of the visible columns
        el.adjustVisible = function(){
            // how many are still open? 
            var open = $('[data-osf-panel]:visible').length; 
            var each = 12/open; 
            var colCSS = 'col-' + currentMode + '-' + each;
            el.each(function(index, element){
            // remove pertinent css
            var cssStrings = $(element).attr('class').split(' ');
            for(var i = 0; i < cssStrings.length; i++){
                if(cssStrings[i].indexOf('col-' + currentMode + '-'));
                cssStrings.splice(i, 1);
            }
            $(element).attr('class', cssStrings.join(' ')); 

            $(element).addClass(colCSS);
            })
        }
        
        // Set some variables in the very beginning for consistency
        el.initialize = function(){
            el.each(function(index, element){
                if($(element).is(':visible')){
                    $(element).attr('data-osf-toggle', 'on');
                }
                $(element).attr('data-css-cache', $(element).attr('class')); 
            });
            el.createButtons();
        }
        
        // Clean up the changes this plugin does. 
        el.reset = function(){
            $('[data-osf-panel]').each(function(index, element){
                var cache = $(element).attr('data-css-cache');
                $(element).show();
                if(cache && cache.length > 0){
                    $(element).attr('class', cache);
                }
            });
        }    

        // Create the buttons
        el.createButtons = function(){
            el.updateMode();
            $(settings.buttonElement).html('');
            console.log(currentMode);
            if(modes.indexOf(currentMode) >= modes.indexOf(settings.onSize)){
                $(settings.buttonElement).append('<div class="btn-group btn-group-sm"></div>');
                $(settings.buttonElement + ' > .btn-group').append('<div class="btn btn-default disabled">Toggle view: </div>')
                el.each(function(index, element){
                    var btnClass = settings.offClass; 
                    var title = $(element).attr('data-osf-panel');
                    var status = $(element).attr('data-osf-toggle');
                    
                    if(status === 'on') {
                        btnClass = settings.onClass;
                        $(element).show();
                    } 
                    if(status === 'off') {
                        btnClass = settings.offClass;
                        $(element).hide();
                    } 
                    $(settings.buttonElement + ' > .btn-group').append('<div class="btn ' + btnClass +'">' + title + '</div>')
                })
                el.adjustVisible();                
            } else {
                el.reset();
            }
        }

        // Button on click
        $(document).on('click', settings.buttonElement + ' .btn', function(){
            // toggle what is clicked
            var title = $(this).text();
            if($(this).hasClass(settings.onClass)){
                $(this).removeClass(settings.onClass).addClass(settings.offClass);
                $('[data-osf-panel="' + title + '"]').attr('data-osf-toggle', 'off').hide();
            
            } else if ($(this).hasClass(settings.offClass)) {
                $(this).removeClass(settings.offClass).addClass(settings.onClass);
                $('[data-osf-panel="' + title + '"]').attr('data-osf-toggle', 'on').show();                
            }
            el.adjustVisible();
        });
         
         
        $(window).resize(function(){
            el.createButtons();
        });
        
        el.initialize();


        // Run the complete function if there is one
        if ( $.isFunction(settings.complete ) ) {
            settings.complete.call( this );
        }

        // Return the element so jquery can chain it
        return this;

    }

}(jQuery));
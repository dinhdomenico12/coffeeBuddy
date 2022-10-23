

var coffee_object = {
    templates: {
        brew_list: $.templates("#brew_list"),
        strength_selector: $.templates("#strength_selector"),
    },
    DEFAULTS : {
        max_water_container_size: 3000,
        cup_size: 250,
        BREWS: [
            {   
                id: 1,
                name: 'Perculating Drip',
                default_strength: 16,
                water_volume_in_ml: 250, 
            },
            {   
                id: 2,
                name: 'V60',
                default_strength: 16,
                water_volume_in_ml: 250, 
            },
            {   
                id: 3,
                name: 'Chemex',
                default_strength: 17,
                water_volume_in_ml: 510,
            },
            {   
                id: 4,
                name: 'French Press',
                default_strength: 12,
                water_volume_in_ml: 500,
            },
            {   
                id: 5,
                name: 'Siphon',
                default_strength: 16,
                water_volume_in_ml: 250,
            },
            {   
                id: 6,
                name: 'Aeropress',
                default_strength: 6,
                water_volume_in_ml: 90,
            },
            {   
                id: 7,
                name: 'Espresso',
                default_strength: 2,
                water_volume_in_ml: 36, 
            },
        ],
        cup_presets: [
            { label: "Tea Cup (125ml)" , cups: 0.5 },
            { label: "1 Cup (250ml)" , cups: 1 },
            { label: "2 Cup (250ml)" , cups: 2 },
            { label: "Pot (12 Cups)" , cups: 12 },
            { label: "6 Cup (250ml)" , cups: 2 },
        ]
    },
    my_brew : { 
        default_strength: 0,
        brew_types_id : 1,
        brew_name: 'aeropress',
        strength: 15,
        water_volume_in_ml : 250, 
        beans_to_grind: 7,
        max_beans: 200,
    },

    
    helpers : {  

        reset_strength: function(){
            $.observable( coffee_object.my_brew  ).setProperty("strength" , coffee_object.my_brew.default_strength )
            coffee_object.helpers.calculate_beans_to_grind();
        },

        water_formatter: function ( water_volume_in_ml ){
            // return water_volume_in_ml + "ml";
            var liters = Math.floor( water_volume_in_ml / 1000 );
            if( liters == 0 ){
                return water_volume_in_ml + "ml";
            }
            else{
                var ml = ( water_volume_in_ml % 1000 ) / 1000;
                return Math.round( ( liters + ml ) * 100 ) / 100 + " L ";
            }
        },
        preset_cup_water_ml: function( number_of_cups ){
            $.observable( coffee_object.my_brew ).setProperty( "water_volume_in_ml" , coffee_object.DEFAULTS.cup_size * number_of_cups  );
            coffee_object.helpers.calculate_beans_to_grind();
        },
        calculate_beans_to_grind: function(){
            // calculate max beans
            $.observable( coffee_object.my_brew ).setProperty( "max_beans" , Math.round( coffee_object.DEFAULTS.max_water_container_size / coffee_object.my_brew.strength ) );
            $.observable( coffee_object.my_brew ).setProperty( "beans_to_grind" ,  Math.round( coffee_object.my_brew.water_volume_in_ml / coffee_object.my_brew.strength ) );
        },
        calculate_water_volume_in_ml: function(){
            $.observable( coffee_object.my_brew ).setProperty( "water_volume_in_ml" ,  coffee_object.my_brew.beans_to_grind * coffee_object.my_brew.strength );
        },
        go_home: function(){
            coffee_object.templates.brew_list.link("#appContainer", coffee_object.DEFAULTS, coffee_object.helpers );
        },
        brew_selected: function( brew_ind ){
            // update my_brew 
            var selected_brew = coffee_object.DEFAULTS.BREWS[ brew_ind ];
            coffee_object.my_brew.brew_types_id         = selected_brew.id;
            coffee_object.my_brew.brew_name             = selected_brew.name;
            coffee_object.my_brew.default_strength      = selected_brew.default_strength;
            coffee_object.my_brew.strength              = selected_brew.default_strength;
            coffee_object.my_brew.water_volume_in_ml    = selected_brew.water_volume_in_ml;
            coffee_object.my_brew.water_to_grinds       = selected_brew.water_to_grinds;
            coffee_object.templates.strength_selector.link("#appContainer", coffee_object.my_brew, coffee_object.helpers ); 
            coffee_object.helpers.calculate_beans_to_grind();
            
        },

    },



};
 

$( "document" ).ready( function(){ 
    // coffee_object.helpers.go_home();
    // set this to make it easy in the templates for linking and reading
    // do this after it hase been initialized, otherwise coffee_object.DEFAULTS does not exist
    coffee_object.my_brew.DEFAULTS = coffee_object.DEFAULTS;
    coffee_object.helpers.brew_selected( 1 );

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode
        $("#themeCSS" ).attr( 'href' , "themes/dark.min.css" )
    }else{
         $("#themeCSS" ).attr( 'href' , "themes/yeti.min.css" )
    }
});
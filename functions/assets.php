<?php

/**
 * WordPress Assets and related functions
 * @package storm-base-theme
 */

// Add assets.
add_action('wp_enqueue_scripts', 'setup_assets');
/**
 * Our default function for enqueueing scripts and styles
 */
function setup_assets()
{
    global $wp_scripts;

    // *all* javascripts and css files must be included here. Nothing in header.php please.
    // Any custom JS needs a new file in js/ and included via the gulpfile.babel.js
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $sass_file = '/assets/dev/css/app.css?no_cache=' . time();
        $coffee_file = '/assets/dev/js/app.js?no_cache=' . time();
    } else {
        $sass_file = '/assets/dist/css/app.css';
        $coffee_file = '/assets/dist/js/app.js';
    }

    wp_register_style('core-style-sass', get_template_directory_uri() . $sass_file, array(), false, false);
    wp_enqueue_style('core-style-sass');

    /* Optional: wp_enqueue_style('dashicons'); */
    wp_deregister_script('jquery');

    // Lots of plugins require jquery to be loaded. Thus, we have to be evil and name our single script jquery.
    wp_register_script('jquery', get_template_directory_uri() . $coffee_file, array(), false, true);
    wp_enqueue_script('jquery');

}

<?php
/**
 * WordPress Assets and related functions
 * @package storm-base-theme
 */

// Add assets.
add_action( 'wp_enqueue_scripts', 'setup_assets' );
/**
 * Our default function for enqueueing scripts and styles
 */
function setup_assets() {
	global $wp_scripts;

	// *all* javascripts and css files must be included here. Nothing in header.php please.
	// Any custom JS needs a new $site.coffee file in coffee/ and included via the gulpfile.js
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		$sass_file = 'app.css';
		$coffee_file = 'app.js';
	} else {
		$sass_file = 'app.min.css';
		$coffee_file = 'app.min.js';
	}

	wp_register_style( 'core-style-sass', get_template_directory_uri().'/css/'.$sass_file, array(), false, false );
	wp_enqueue_style( 'core-style-sass' );

	/* Optional: wp_enqueue_style('dashicons'); */
	wp_deregister_script( 'jquery' );

	// Lots of plugins require jquery to be loaded. Thus, we have to be evil and name our single script jquery.
	wp_register_script( 'jquery', get_template_directory_uri().'/js/dist/'.$coffee_file, array(), false, true );
	wp_enqueue_script( 'jquery' );

	// IE conditionals.
	wp_register_script( 'html5shiv', get_template_directory_uri().'/public/components/html5shiv/dist/html5shiv.min.js', array(), false, false );
	wp_register_script( 'html5shiv-print', get_template_directory_uri().'/public/components/html5shiv/dist/html5shiv-printshiv.min.js', array(), false, false );
	$wp_scripts->add_data( 'html5shiv', 'conditional', 'lt IE 9' );
	$wp_scripts->add_data( 'html5shiv-print', 'conditional', 'lt IE 9' );

}



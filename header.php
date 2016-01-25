<?php
/**
 * Globally Included Header
 * @package storm-base-theme
 */

?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title><?php
	global $page, $paged;

	wp_title( '|', true, 'right' );
	bloginfo( 'name' );

	$site_description = get_bloginfo( 'description', 'display' );

	if ( $paged >= 2 || $page >= 2 ) {
		echo ' | ' . sprintf( 'Page %s', intval( max( intval( $paged ), intval( $page ) ) ) );
	}

	?></title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
	<link rel="icon" type="image/x-icon" href="/favicon.ico">
	
	<?php wp_head(); ?>
	
	<!--[if gte IE 9]>
	<style type="text/css">
		.gradient {
			 filter: none;
		}
	</style>
	<![endif]-->
	
	
</head>

<body <?php body_class(); ?>>

	<header id="main-header">
	</header>
	
	<section id="content">

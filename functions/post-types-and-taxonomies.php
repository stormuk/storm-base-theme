<?php

/**
 * Post Types and Taxonomies Definitions
 * @package storm-base-theme
 */

add_theme_support('post-thumbnails');
add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));


add_action('init', 'register_post_types_menus_and_taxonomies');

/**
 * Our default init function to register post types, taxonimies and image sizes.
 */
function register_post_types_menus_and_taxonomies()
{

    /**
    This code contains samples of all the things likely to be in this file.

    You should copy/paste blocks out of this to do common things.
    add_image_size('box-image', 300, 125, true);


    $labels = array(
        'name'              => __('Service Categories'),
        'singular_name'     => __('Service Category'),
        'search_items'      => __('Search Service Categories'),
        'all_items'         => __('All Service Categories'),
        'parent_item'       => __('Parent Service Category'),
        'parent_item_colon' => __('Parent Service Category:'),
        'edit_item'         => __('Edit Service Category'),
        'update_item'       => __('Update Service Category'),
        'add_new_item'      => __('Add New Service Category'),
        'new_item_name'     => __('New Service Category Name'),
        'menu_name'         => __('Service Categories'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'services/range', 'with_front' => false),
    );

    register_taxonomy('service_category', array('service'), $args);

    register_post_type('service', array(
        'labels' => array(
                "name" => "Services",
                "singular_name" => "Service",
                "add_new_item" => "Add new service",
                "edit_item" => "Edit service",
                "new_item" => "New service",
                "view_item" => "View service",
                "search_items" => "Search services",
                "not_found" => "No services found",
                "not_found_in_trash" => "No services found in the trash"
            ),
        'has_archive' => false,
        'public' => true,
        'rewrite' => array(
            'slug' => 'services',
            'with_front' => false
        ),
        'menu_icon' => 'dashicons-portfolio',
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'supports' => array('thumbnail', 'title', 'editor')
        )
    );

    register_post_type('course', array(
        'labels' => array(
                "name" => "Training Courses",
                "singular_name" => "Course",
                "add_new_item" => "Add new course",
                "edit_item" => "Edit course",
                "new_item" => "New course",
                "view_item" => "View course",
                "search_items" => "Search courses",
                "not_found" => "No courses found",
                "not_found_in_trash" => "No courses found in the trash"
            ),
        'public' => true,
        'rewrite' => array(
            'slug' => 'training',
            'with_front' => false
        ),
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'supports' => array('title')
        )
    );

    register_post_type('location', array(
        'labels' => array(
                "name" => "Locations",
                "singular_name" => "Location",
                "add_new_item" => "Add new location",
                "edit_item" => "Edit location",
                "new_item" => "New location",
                "view_item" => "View location",
                "search_items" => "Search locations",
                "not_found" => "No locations found",
                "not_found_in_trash" => "No locations found in the trash"
            ),
        'public' => false,
        'show_ui' => true,
        'rewrite' => false,
        'menu_icon' => 'dashicons-location-alt',
        'exclude_from_search' => true,
        'publicly_queryable' => true,
        'supports' => array('thumbnail', 'title', 'editor')
        )
    );


    $labels = array(
        'name'              => __('Course Categories'),
        'singular_name'     => __('Course Category'),
        'search_items'      => __('Search Course Categories'),
        'all_items'         => __('All Course Categories'),
        'parent_item'       => __('Parent Course Category'),
        'parent_item_colon' => __('Parent Course Category:'),
        'edit_item'         => __('Edit Course Category'),
        'update_item'       => __('Update Course Category'),
        'add_new_item'      => __('Add New Course Category'),
        'new_item_name'     => __('New Course Category Name'),
        'menu_name'         => __('Course Categories'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => 'course_category',
        'rewrite'           => false,
    );

    register_taxonomy('course_category', array('course'), $args);

    register_nav_menus(
        array(
            'header_menu' => 'Header Menu',
            'footer_about_menu' => 'Footer About Menu',
            'footer_right_menu' => 'Footer Right Menu',
            'footer_copyright_links' => 'Footer Copyright Links'
        )
    );
     */
}

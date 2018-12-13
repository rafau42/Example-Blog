<?php

function example_blog_post_types() {
 
  register_post_type('photo', array(
    'supports' => array('title'),
    'rewrite' => array('slug' => 'photos'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Photos',
      'add_new_item' => 'Add New Photo',
      'edit_item' => 'Edit Photo',
      'all_items' => 'All Photos',
      'singular_name' => 'Photo'
    ),
    'menu_icon' => 'dashicons-camera',
    'taxonomies'  => array( 'category' )
  ));

}

add_action('init', 'example_blog_post_types');
<?php
require get_theme_file_path('/inc/load-more.php');
require get_theme_file_path('/inc/ajax.php');
require get_theme_file_path('/inc/ajax-single.php');
require get_theme_file_path('/inc/ajax-comment.php');
require get_theme_file_path('/inc/load-more-comments.php');
require get_theme_file_path('/inc/better-comments.php');
require get_theme_file_path('/inc/post-views.php');

function blog_example_files() {
    wp_register_script( 'main-js', get_stylesheet_directory_uri() . '/js/scripts-bundled.js', array('jquery'), null, true );
    wp_localize_script( 'main-js', 'wp_params', array(
        'ajaxurl' => site_url() . '/wp-admin/admin-ajax.php', 
        'current_page' => get_query_var( 'paged' ) ? get_query_var('paged') : 1,
        'max_page' => $wp_query->max_num_pages
    ) );
    wp_enqueue_script( 'main-js' );
    wp_enqueue_script( 'comment-reply' ); 
    wp_enqueue_style( 'genericons', get_template_directory_uri() . '/css/genericons.css', array() );
    wp_enqueue_style( 'fonts', get_template_directory_uri() . '/css/custom-fonts.css', array() );
    wp_enqueue_style('font awesome', 'https://use.fontawesome.com/releases/v5.5.0/css/all.css');
    wp_enqueue_style('css-main', get_stylesheet_uri());
}

add_action('wp_enqueue_scripts', 'blog_example_files');

function blog_example_features() {
    add_theme_support('title-tag');
    add_theme_support( 'post-thumbnails', array( 'page' ) ); 
    add_image_size('photo_medium', 400, 400, true);
    add_image_size('photo_small', 250, 250, true);
    set_post_thumbnail_size(700, 500, true);
    register_nav_menu( 'primary', esc_html__( 'Main Navigation', 'zero_to_mastery' ) );
  }
  
  add_action('after_setup_theme', 'blog_example_features');

  function atg_menu_classes($classes, $item, $args) {
    if($args->theme_location == 'primary' ) {
      $classes[] = 'navigation__item';
    }
    return $classes; 
  }

  add_filter('nav_menu_css_class','atg_menu_classes',1,3);
  
  function add_link_atts($atts) {
    $atts['class'] = "navigation__link";
    return $atts;
  }

  add_filter( 'nav_menu_link_attributes', 'add_link_atts'); 

  function adjust_queries($query) {

    if (!is_admin() && $query->is_main_query()) {
      $query->set('posts_per_page', 4);
    }
 
  }
  
  add_action('pre_get_posts', 'adjust_queries');
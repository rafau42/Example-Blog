<?php function blog_ajax_handler(){
	$args['paged'] = $_POST['page'] + 1; 
    $args['post_status'] = 'publish';
    $args['posts_per_page'] = 4;
 
	query_posts( $args );
 
    if( have_posts() ) { ?>

<div class="ajax<?php echo $args['paged']; ?>">

	<?php while( have_posts() ) { 
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' ); 
    } ?>

</div>

<?php
}
die; 
}

    add_action('wp_ajax_loadmore_blog', 'blog_ajax_handler');
add_action('wp_ajax_nopriv_loadmore_blog', 'blog_ajax_handler');

function blog_archive_ajax_handler($cat){
    $args['paged'] = $_POST['page'] + 1;
    $args['post_status'] = 'publish';  
    $args['posts_per_page'] = 4;
    $args['cat'] = $cat;

	query_posts( $args );

    if( have_posts() ) { ?>

<div class="ajax<?php echo $args['paged']; ?>">

	<?php while( have_posts() ) { 
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' ); 
    } ?>

</div>

<?php
}
wp_die();
}

function category_sport_ajax_handler() {
    blog_archive_ajax_handler(2);
}

add_action('wp_ajax_loadmore_category_sport', 'category_sport_ajax_handler');
add_action('wp_ajax_nopriv_loadmore_category_sport', 'category_sport_ajax_handler');

function category_food_ajax_handler() {
    blog_archive_ajax_handler(3);
}

add_action('wp_ajax_loadmore_category_food', 'category_food_ajax_handler');
add_action('wp_ajax_nopriv_loadmore_category_food', 'category_food_ajax_handler');

function category_books_ajax_handler() {
    blog_archive_ajax_handler(4);
}

add_action('wp_ajax_loadmore_category_books', 'category_books_ajax_handler');
add_action('wp_ajax_nopriv_loadmore_category_books', 'category_books_ajax_handler');

function category_uncategorized_ajax_handler() {
    blog_archive_ajax_handler(1);
}

add_action('wp_ajax_loadmore_category_uncategorized', 'category_uncategorized_ajax_handler');
add_action('wp_ajax_nopriv_loadmore_category_uncategorized', 'category_uncategorized_ajax_handler');

function gallery_ajax_handler(){
    $args['paged'] = $_POST['page'] + 1;
    $args['post_status'] = 'publish';
    $args['posts_per_page'] = 4;
    $args['post_type'] = 'photo';
 
	query_posts($args);
	
	if( have_posts() ) { ?>

<div class="page-gallery__ajax-container ajax<?php echo $args['paged']; ?>">

	<?php while( have_posts() ) { 
    the_post();
			get_template_part( 'template-parts/content', 'gallery' );
    } ?>

</div>

<?php }
	die; 
}
add_action('wp_ajax_loadmore_gallery', 'gallery_ajax_handler');
add_action('wp_ajax_nopriv_loadmore_gallery', 'gallery_ajax_handler'); ?>
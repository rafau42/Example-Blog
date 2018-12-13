<?php
function ajax_blog() {
    $args['paged'] = $_POST['page'];
    $args['post_status'] = 'publish';
    $args['posts_per_page'] = 4;  
    
    query_posts( $args ); ?>

<div class="main__container">

	<?php if( have_posts() ) { 
    while( have_posts() ) { 
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' ); 
    } ?>

</div>

<div class="main__container-btn">
	<button class="main__btn btn btn--load-more load-more-blog" type="button">More posts</button>
</div>

<?php
}
die; 
}

add_action('wp_ajax_blog', 'ajax_blog');
add_action('wp_ajax_nopriv_blog', 'ajax_blog');

function ajax_page($page) {
    $args['paged'] = $_POST['page'];  
    $args['pagename'] = $page;
    query_posts( $args ); ?>

<div class="main__container">

	<?php if( have_posts() ) { 
    while( have_posts() ) { 
    the_post(); 
    get_template_part( 'template-parts/content', $page ); 
    } ?>

</div>

<?php
}
die; 
}

function ajax_page_contact() {
ajax_page('contact');
}

add_action('wp_ajax_contact', 'ajax_page_contact');
add_action('wp_ajax_nopriv_contact', 'ajax_page_contact');

function ajax_page_sample_page() {
    ajax_page('sample-page');
    }
    
add_action('wp_ajax_sample_page', 'ajax_page_sample_page');
add_action('wp_ajax_nopriv_sample_page', 'ajax_page_sample_page');


function ajax_category($category){
    $args['paged'] = $_POST['page'];  
    $args['post_status'] = 'publish';
    $args['category_name'] = $category;
    
    query_posts( $args ); ?>

<div class="main__container">

	<?php if( have_posts() ) { 
    while( have_posts() ) { 
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' ); 
    } ?>

</div>

<div class="main__container-btn">
	<button class="main__btn btn--load-more load-more-category-<?php echo $category; ?>"
	 type="button">More posts</button>
</div>

<?php
}
die; 
}

function ajax_category_sport() {
ajax_category('sport');
}

add_action('wp_ajax_category_sport', 'ajax_category_sport');
add_action('wp_ajax_nopriv_category_sport', 'ajax_category_sport');

function ajax_category_food() {
ajax_category('food');
}
    
add_action('wp_ajax_category_food', 'ajax_category_food');
add_action('wp_ajax_nopriv_category_food', 'ajax_category_food');

function ajax_category_books() {
ajax_category('books');
}
    
add_action('wp_ajax_category_books', 'ajax_category_books');
add_action('wp_ajax_nopriv_category_books', 'ajax_category_books');

function ajax_category_uncategorized() {
ajax_category('uncategorized');
}
        
add_action('wp_ajax_category_uncategorized', 'ajax_category_uncategorized');
add_action('wp_ajax_nopriv_category_uncategorized', 'ajax_category_uncategorized');

function ajax_gallery() {
    $args['paged'] = $_POST['page'];
    $args['post_status'] = 'publish';  
    $args['post_type'] = 'photo';
    $args['posts_per_page'] = 4;
 
    query_posts( $args ); ?>

<div class="main__container page-gallery">

	<?php if( have_posts() ) { 
    while( have_posts() ) { 
    the_post();
    get_template_part( 'template-parts/content', 'gallery' ); 
    } ?>

</div>

<div class="main__container-btn">
	<button class="main__btn btn--load-more load-more-gallery" type="button">More posts</button>
</div>
<?php
}
die; 
}

add_action('wp_ajax_gallery', 'ajax_gallery');
add_action('wp_ajax_nopriv_gallery', 'ajax_gallery');
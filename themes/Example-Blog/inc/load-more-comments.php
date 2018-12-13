<?php
function comments_loadmore_handler(){
 
	global $post;
	$post = get_post( $_POST['post_id'] );
    setup_postdata( $post ); ?>
    
 <div class = "ajax<?php echo $_POST['cpage']; ?>">

 <?php
    wp_list_comments( array(
		'page' => $_POST['cpage'], // current comment page
        'per_page' => get_option('comments_per_page'),
        'callback' => 'better_comments'
    ) );
    ?>
    
    </div>

<?php
	die;
} 
add_action('wp_ajax_loadmore_comments', 'comments_loadmore_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_loadmore_comments', 'comments_loadmore_handler'); // wp_ajax_nopriv_{action}

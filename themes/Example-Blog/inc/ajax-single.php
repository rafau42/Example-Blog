<?php 
function ajax_single() {
    $args['p'] = $_POST['post_id'];  

    query_posts( $args ); ?>

    <div class="main__container"> 
    
        <?php if( have_posts() ) { 
        while( have_posts() ) { 
        the_post();
        get_template_part( 'template-parts/content', 'single' ); 
        } ?>
    
    </div>

<?php
}
die;
}

add_action ( 'wp_ajax_single', 'ajax_single' );
add_action ( 'wp_ajax_nopriv_single', 'ajax_single' );

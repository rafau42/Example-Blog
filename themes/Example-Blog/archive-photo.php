<?php get_header(); ?>

<main class="main">
	<div class="main__container page-gallery">

		<?php while(have_posts()) : the_post();

get_template_part( 'template-parts/content', 'gallery' );
if ( $wp_query->max_num_pages ) : 
endif;
endwhile; ?>

	</div>
	
	<div class="main__container-btn">
	<button class="main__btn btn btn--load-more load-more-gallery" type="button">More photos</button>
	</div>
		
</main>

<?php
get_sidebar();
get_footer();

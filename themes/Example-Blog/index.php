<?php get_header(); ?>

<main class="main">
	<div class="main__container">

		<?php while(have_posts()) {
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' );
    wp_reset_postdata();
} ?>

	</div>

	<?php if (  $wp_query->max_num_pages > 1 )
	echo '<div class="main__container-btn">
	<button class="main__btn btn btn--load-more load-more-blog" role="button">More posts</button>
	</div>'; ?>

</main>

<?php get_sidebar();
get_footer(); ?>
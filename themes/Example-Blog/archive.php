<?php get_header(); ?>

<main class="main">
	<div class="main__container">

		<?php while(have_posts()) {
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' );
} ?>

	</div>

	<?php if (  $wp_query->max_num_pages > 1 )
	echo ' <button class="btn btn--red btn--load-more load-more-blog-archive">More posts</button>'; ?>

</main>

<?php get_sidebar();
get_footer(); ?>
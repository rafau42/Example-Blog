<?php get_header(); ?>

<main class="main">
	<div class="main__container">

		<?php while(have_posts()) {
    the_post();
    get_template_part( 'template-parts/content', 'excerpt' );
    $category = get_the_category(); 
        } ?>

	</div>
  
    <div class="main__container-btn">
    <button class="main__btn btn btn--load-more load-more-category-<?php echo $category[0]->cat_name; ?>" type="button">More posts</button>
	</div>
</main>

<?php get_sidebar();
get_footer(); ?>
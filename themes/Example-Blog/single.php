<?php get_header(); ?>

<main class="main">
<div class="main__container">
	<?php
while(have_posts()) {
    the_post();
    get_template_part( 'template-parts/content', 'single' );
} ?>

</div>
</main>

<?php get_sidebar();
get_footer(); 
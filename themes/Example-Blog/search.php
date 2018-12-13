<?php get_header(); ?>

<main class="main">

<?php
  if (have_posts()) {
      
    while(have_posts()) {
      the_post();
      get_template_part( 'template-parts/content', 'excerpt' );
    }

  } else {
    echo '<h2 class="headline headline--small-plus">No results match that search.</h2>';
  }
?>

</main>

<?php get_sidebar();
get_footer(); ?>
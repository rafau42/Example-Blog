<aside class="aside">
	<div class="aside__container">
		<div class="aside__tabbed-content">
			<h3 class="aside__heading">Recommended</h3>
			<button class="aside__button btn btn--aside btn--dark" id="button-recent" type="button" aria-label="Show recent posts" aria-expanded = "false" aria-controls="widget tabed content" title="Show recent posts">
			<span class = "sr-only sr-state">Open</span>
			Recent
			<span class = "sr-only">Posts</span>
			</button>
			<button class="aside__button btn btn--aside btn--dark" id="button-popular" type="button" aria-label="Show recent posts" aria-expanded = "false" aria-controls="widget tabed content" title="Show popular posts">
			<span class = "sr-only sr-state">Open</span>
			Popular
			<span class = "sr-only">Posts</span>
			</button>
			<button class="aside__button btn btn--aside btn--dark" id="button-comments" type="button" aria-label="Show recent posts" aria-expanded = "false" aria-controls="widget tabed content" title="Show recent comments">
			<span class = "sr-only sr-state">Open</span>
			Comments
			</button>
			
			<div class="aside__post-box post-box box-hidden" id="target1">

				<?php 
 $recentPosts = new WP_query(array(
     'posts_per_page' => '3',
 ));
 wp_reset_postdata();

while ($recentPosts->have_posts()) : $recentPosts->the_post();
    get_template_part( 'template-parts/content', 'post-box' );
  endwhile; ?>

			</div>

			<div class="aside__post-box post-box box-hidden" id="target2">

				<?php 
$popularpost = new WP_Query( array( 
    'posts_per_page' => 3, 
    'meta_key' => 'wpb_post_views_count', 
    'orderby' => 'meta_value_num', 
    'order' => 'DESC'  ) );
    wp_reset_postdata();

while ( $popularpost->have_posts() ) : 
    $popularpost->the_post();
    get_template_part( 'template-parts/content', 'post-box' );
endwhile;
?>

			</div>

			<div class="aside__comment-box comment-box box-hidden" id="target3">

                <?php $args = array(
    'number' => '3'
);

$comments_query = new WP_Comment_Query;
    
$comments = $comments_query->query( array(
    'number' => '3'
)); 
wp_reset_postdata();

	foreach ( $comments as $comment ) :
        get_template_part( 'template-parts/content', 'comment-box' );
    endforeach; 

?>

			</div>
		</div>
		<div class="aside__gallery-box gallery-box">
			<a class="gallery-box__link" href="<?php echo get_post_type_archive_link('photo'); ?>">Gallery &raquo;</a>


			<?php
    $galleryQuery = new WP_query(array( 
'post_type' => 'photo',
'posts_per_page' => 2,
'category_name' => 'avaiable_in_sidebar'
    ));
wp_reset_postdata();
    while($galleryQuery->have_posts()) : $galleryQuery->the_post();

$photo = get_field('photo_small'); ?>

			<div class="gallery-box__wrap-image">
				<img class="gallery-box__image" src="<?php echo $photo['url']; ?>" alt="<?php echo $photo['alt']; ?>">
			</div>

			<?php endwhile; ?>
		</div>
	</div>
</aside>
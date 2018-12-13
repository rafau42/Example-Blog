
<?php $image = get_the_post_thumbnail_url(); ?>

	<article class="main__article article">
		<div class="article__wrap-photo">
			<img src="<?php echo get_the_post_thumbnail_url(); ?>" class="article__photo" alt="" title="" >
		</div>

		<div class="article__wrap-text">
			<h2 class="article__heading">
				<?php the_title(); ?>
			</h2>
	
            <?php the_content(); ?>
            
		</div>
	</article>
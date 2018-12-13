<?php $image = get_field('thumbnail_small'); ?>

<div class="post-box__post post">
	<div class="post__img-wrap">
		<img src="<?php echo $image['url']; ?>" class="post__img" alt="<?php echo $image['alt']; ?>">
	</div>
	<div class="post__container ">
		<a href="<?php the_permalink(); ?>" class="post__link js-single-link" data-id="<?php echo get_the_ID(); ?>">
			<?php the_title(); ?>
		</a>
		<time datetime="<?php echo get_the_date(); ?>" class="post__time">
			<?php echo get_the_date(); ?>
		</time>
	</div>
</div>
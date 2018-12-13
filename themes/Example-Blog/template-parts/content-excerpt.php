<?php $image = get_field('thumbnail_medium'); ?>

<article class="main__article article-excerpt">
	<div class="article-excerpt__wrap-photo">
		<img src="<?php echo $image['url'] ?>" class="article-excerpt__photo" alt="<?php echo $image['alt'] ?>">
	</div>

	<div class="article-excerpt__wrap-text">
    <div class="article-excerpt__wrap-date-author">
			<time datetime="<?php echo get_the_date(); ?>" class="article-excerpt__date">
				<?php echo get_the_date(); ?>
			</time>
			<cite class="article-excerpt__author">
				<a href="#" class="article-excerpt__author-link">
					<?php the_author(); ?>
				</a>
			</cite>
        </div>
        
		<a class="article-excerpt__link js-single-link" href="<?php the_permalink(); ?>" data-id="<?php echo get_the_ID(); ?>">
			<h1 class="article-excerpt__heading">
				<?php the_title(); ?>
			</h1>
		</a>
	
		<?php if (has_excerpt()) {
    the_excerpt(); 
} else { ?>

		<p class="article-excerpt__paragraph">
			<?php echo wp_trim_words(get_the_content(), 20); ?>
		</p>

		<?php } ?>

		<a href="<?php the_permalink(); ?>" class="article-excerpt__btn btn btn--red btn--main-content btn--article">Continue reading &raquo;</a>
	</div>
</article>
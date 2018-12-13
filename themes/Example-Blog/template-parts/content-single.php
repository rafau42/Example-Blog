<?php $image = get_field('thumbnail_medium');
wpb_set_post_views(get_the_ID()); ?>

<article class="main__article article">
	<div class="article__wrap-photo">
		<img src="<?php echo $image['url']; ?>" class="article__photo" alt="<?php echo $image['alt']; ?>">
	</div>

	<div class="article__wrap-text">
		<h2 class="article__heading">
			<?php the_title(); ?>
		</h2>
		<span class="article__views">
			<?php echo wpb_get_post_views(get_the_ID()); ?>
		</span>
		<div class="article__wrap-date-author">
			<time datetime="<?php echo get_the_date(); ?>" class="article__date">
				<?php echo get_the_date(); ?>
			</time>
			<cite class="article__author">
				<a href="#" class="article__author-link">
					<?php the_author(); ?>
				</a>
			</cite>
		</div>
		<?php the_content(); ?>
	</div>

	<div class="article__share-buttons share-buttons">
		<h2 class="share-buttons__heading">Share post:</h2>
		<a class="share-buttons__btn share-buttons__btn--facebook" href="http://www.facebook.com/sharer/sharer.php?s=100&p[url]=<?php echo urlencode(get_permalink()); ?>"
		 target="_blank">
			<i class="share-buttons__icon genericon genericon-facebook-alt" aria-hidden="true"></i>Facebook</a>
		<a class="share-buttons__btn share-buttons__btn--twitter" href="https://twitter.com/intent/tweet?text=<?php echo urlencode(get_the_title()); ?>+<?php echo get_permalink(); ?>"
		 target="_blank">
			<i class="share-buttons__icon genericon genericon-twitter" aria-hidden="true"></i>Twitter</a>
		<a class="share-buttons__btn share-buttons__btn--google" href="https://plus.google.com/share?url=<?php echo urlencode(get_permalink()); ?>"
		 target="_blank">
			<i class="share-buttons__icon genericon genericon-googleplus" aria-hidden="true"></i>Google+</a>
	</div>

</article>

<?php comments_template(); ?>
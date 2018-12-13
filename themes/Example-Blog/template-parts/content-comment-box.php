<div class="comment-box__comment-excerpt comment-excerpt">
	<?php echo get_avatar($comment, 40, '', '', array('class' => 'comment-excerpt__img') ); ?>
	<div class="comment-excerpt__container">
		<span class="comment-excerpt__span">
			<?php echo $comment->comment_author ?>
			on
			<a href="<?php echo get_permalink($comment->comment_post_ID); ?>" rel="external nofollow"
			 class="comment-excerpt__link js-single-link" data-id="<?php echo $comment->comment_post_ID; ?>">
				<?php echo get_the_title($comment->comment_post_ID); ?>
			</a>
		</span>

	</div>
</div>
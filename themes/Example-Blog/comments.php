<?php

if ( post_password_required() ) {
	return;
}
?>

<div class="comments">

	<?php if ( have_comments() ) : ?>

	<h2 class="comments__title">

		<?php $comments_number = get_comments_number();
			if ( '1' === $comments_number ) {
				printf( _x( 'One Reply to &ldquo;%s&rdquo;', 'comments title'), get_the_title() );
			} else {
				printf(
					_nx(
						'%1$s Reply to &ldquo;%2$s&rdquo;',
						'%1$s Replies to &ldquo;%2$s&rdquo;',
						$comments_number,
						'comments title'
					),
					number_format_i18n( $comments_number ),
					get_the_title()
				);
			}
			?>
	</h2>

	<ol class="comments__list">
		<?php
				wp_list_comments(
					array(
                        'per_page' => get_option('comments_per_page'),
                        'callback' => 'better_comments'
					)
				);
			?>
	</ol>

	<?php
		$cpage = get_query_var('cpage') ? get_query_var('cpage') : 1;
 
if( $cpage > 1 ) {
    echo '<div class="comments__loadmore-wrap">
    <button class="loadmore-comments comments__btn btn btn--load-more">More comments</button>
    </div>
	<script>
	    parent_post_id = ' . get_the_ID() . ',
    	    cpage = ' . $cpage . '
	</script>';
}

	endif; 
    $args = array(
        'class_form' => 'comment-respond__form',

        'fields' => apply_filters(
            'comment_form_default_fields', array(
                'author' =>'<p class="comment-respond__author">' . 
                '<label for="author" class="comment-respond__author-label">Name *</label> ' .
                '<input class="comment-respond__author-input" id="author" name="author" type="text" size="30" ' . $aria_req . ' />'  . '</p>' ,

                'email'  => '<p class="comment-respond__email">' . 
                '<label for="email" class="comment-respond__email-label">Your Email *</label> ' . 
                '<input class="comment-respond__email-input" id="email" name="email" type="text" ' . $aria_req . ' />' . '</p>',
            )
        ),
        'comment_field' => '<p class="comment-respond__comment">' .
        '<label for="comment" class = "comment-respond__comment-label">Let us know what you have to say: *</label>' .
        '<textarea class = "comment-respond__comment-textarea" name="comment" id = "comment" cols="45" rows="8" aria-required="true"></textarea>' .
        '</p>',

        'comment_notes_after' => '',
        'title_reply' => '<div class="comment-respond__headline"><h2>Leave a Reply</h2></div>',
        'class_submit' => 'comment-respond__submit btn btn--red btn--comment'
    );
	comment_form($args);
	?>

</div>
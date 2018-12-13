<?php
function replace_author_link_class($class2){
    $class2 = str_replace("class='url", "class='comment__author-link", $class2);
    return $class2;
}

add_filter('get_comment_author_link', 'replace_author_link_class');

function move_comment_field_to_bottom( $fields ) {
    $comment_field = $fields['comment'];
    unset( $fields['comment'] );
    $fields['comment'] = $comment_field;
    return $fields;
    }
     
    add_filter( 'comment_form_fields', 'move_comment_field_to_bottom' );

function replace_reply_link_class($class){
    $class = str_replace("class='comment-reply-link", "class='comment__reply-link", $class);
    return $class;
}

add_filter('comment_reply_link', 'replace_reply_link_class');

function better_comments( $comment, $args, $depth ) {
	global $post;
	$author_id = $post->post_author;
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
		case 'pingback' :
		case 'trackback' :
		break;
		default : ?>

<li class="comments__item" id="li-comment-<?php comment_ID(); ?>">
	<article id="comment-<?php comment_ID(); ?>" <?php comment_class(
	 'comment'); ?>>

		<div class="comment__details">

			<header class="comment__meta">
				<div class="comment__wrap-author">
					<?php echo get_avatar( $comment, 25 ); ?>
					<cite class="comment__cite">
						<?php comment_author(); ?>
					</cite>
				</div>
				<span class="comment__wrap-date">
					<?php printf( '<time class = "comment__date" datetime="%1$s">%2$s</time>',
						get_comment_time( 'c' ),
						sprintf( _x( '%1$s', '1: date' ), get_comment_date() )
					); ?>
					<?php esc_html_e( 'at' ); ?>
					<?php comment_time(); ?>
				</span>

			</header>

			<?php if ( '0' == $comment->comment_approved ) : ?>
			<p class="comment__awaiting-moderation">
				<?php esc_html_e( 'Your comment is awaiting moderation.' ); ?>
			</p>
			<?php endif; ?>
			<div class="comment__content">
				<?php comment_text(); ?>
			</div>

			<div class="comment__reply">
				<?php comment_reply_link( array_merge( $args, array(
						'reply_text' => esc_html__( 'Reply to this message' ),
						'depth'      => $depth,
						'max_depth'	 => $args['max_depth'] )
					) ); ?>
			</div>

		</div>

	</article>

	<?php
		break;
	endswitch;
} ?>
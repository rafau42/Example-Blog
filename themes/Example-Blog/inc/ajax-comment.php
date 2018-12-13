<?php
add_action( 'wp_ajax_ajaxcomments', 'misha_submit_ajax_comment' ); // wp_ajax_{action} for registered user
add_action( 'wp_ajax_nopriv_ajaxcomments', 'misha_submit_ajax_comment' ); // wp_ajax_nopriv_{action} for not registered users
 
function misha_submit_ajax_comment(){
	/*
	 * Wow, this cool function appeared in WordPress 4.4.0, before that my code was muuuuch mooore longer
	 *
	 * @since 4.4.0
	 */
	$comment = wp_handle_comment_submission( wp_unslash( $_POST ) );
	if ( is_wp_error( $comment ) ) {
		$error_data = intval( $comment->get_error_data() );
		if ( ! empty( $error_data ) ) {
			wp_die( '<p>' . $comment->get_error_message() . '</p>', __( 'Comment Submission Failure' ), array( 'response' => $error_data, 'back_link' => true ) );
		} else {
			wp_die( 'Unknown error' );
		}
	}
 
	/*
	 * Set Cookies
	 */
	$user = wp_get_current_user();
	do_action('set_comment_cookies', $comment, $user);
 
	/*
	 * If you do not like this loop, pass the comment depth from JavaScript code
	 */
	$comment_depth = 1;
	$comment_parent = $comment->comment_parent;
	while( $comment_parent ){
		$comment_depth++;
		$parent_comment = get_comment( $comment_parent );
		$comment_parent = $parent_comment->comment_parent;
	}
 
 	/*
 	 * Set the globals, so our comment functions below will work correctly
 	 */
	$GLOBALS['comment'] = $comment;
	$GLOBALS['comment_depth'] = $comment_depth;
 
	/*
	 * Here is the comment template, you can configure it for your website
	 * or you can try to find a ready function in your theme files
	 */
 
	$comment_html = '<li class = "comments__item" id="comment-' . get_comment_ID() . '">
		<article class="comment" id="div-comment-' . get_comment_ID() . '">
			<div class="comment__details">
                <header class="comment__meta">
                <div class = "comment__wrap-author"> ' .
                get_avatar( $comment, 35 ) .
                '<cite class = "comment__cite">' .
                get_comment_author() .
                '</cite>
                </div>' .
                '<span class = "comment__wrap-date">' . get_comment_date() .
                ' at '  . get_comment_time() . 
                '</span>' .
				'</header>' .
                '<div class="comment__content"> ' .
                apply_filters( 'comment_text', get_comment_text( $comment ), $comment ) . 
                '</div>
                </div>
                </article>
                </li>';
	echo $comment_html;
 
	die();
 
}
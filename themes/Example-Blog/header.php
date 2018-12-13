<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png">
    <link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="#fff">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/icons/favicon.ico" />
    <meta name="msapplication-config" content="icons/browserconfig.xml">
    <meta name="theme-color" content="#222">
    <meta name="msapplication-navbutton-color" content="#222">
    <meta name="apple-mobile-web-app-status-bar-style" content="#222">
    <meta itemprop="url" content="https://exampleblog.freeko.pl">
    <meta name="description" content="Example-blog">
    <meta name="dcterms.description" lang="eng" content="Example-blog">
    <meta name="keywords" content="Example-blog">
    <meta name="dcterms.subject" lang="eng" content="Example-blog">
    <meta name="application-name" content="Example-blog">
    <meta property="og:site_name" content="Example-blog">
    <meta property="og:url" content="https://exampleblog.freeko.pl">
    <meta property="og:title" content="Example-blog">
	<?php wp_head(); ?>
</head>

<body <?php body_class('container'); ?>>
		<header class="header">
			<div class="header__title-wrap">
				<a class="header__link" href="<?php echo home_url(); ?>">Example Blog</a>
			</div>

			<?php get_search_form(); ?>

			<nav class="header__social-buttons social-buttons">
				<ul class="social-buttons__list">
					<li class="social-buttons__item">
						<a href="#" class="social-buttons__btn btn btn--red" aria-label="rss" title="rss">
							<i class="social-buttons__icon genericon genericon-feed" aria-hidden="true"></i>
						</a>
					</li>
					<li class="social-buttons__item">
						<a href="#" class="social-buttons__btn btn btn--red" aria-label="twitter" title="twitter">
							<i class="social-buttons__icon genericon genericon-twitter" aria-hidden="true"></i>
						</a>
					</li>
					<li class="social-buttons__item">
						<a href="#" class="social-buttons__btn btn btn--red" aria-label="facebook" title="facebook">
							<i class="social-buttons__icon genericon genericon-facebook-alt" aria-hidden="true"></i>
						</a>
					</li>
					<li class="social-buttons__item">
						<a href="#" class="social-buttons__btn btn btn--red" aria-label="google plus" title="google plus">
							<i class="social-buttons__icon genericon genericon-googleplus" aria-hidden="true"></i>
						</a>
					</li>
					<li class="social-buttons__item">
						<a href="#" class="social-buttons__btn btn btn--red" aria-label="youtube" title="youtube">
							<i class="social-buttons__icon genericon genericon-youtube" aria-hidden="true"></i>
						</a>
					</li>
				</ul>
			</nav>
		</header>
		<div class="navigation-wrap" id="main-navigation-wrap">
			<nav class="navigation" id="main-navigation" role="navigation">

				<?php
						// Display Main Navigation.
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'container' => false,
							'menu_class' => 'navigation__list',
							'echo' => true,
							)
						);
					?>
			</nav>
		</div>
		<div class="content-container">
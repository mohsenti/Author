<!DOCTYPE html>

<!--[if IE 8 ]><html class="ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9 ]><html class="ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->

<head>
    <?php wp_head(); ?>
</head>

<body id="<?php print get_stylesheet(); ?>" <?php body_class(); ?>>
	<?php hybrid_do_atomic( 'body_top' ); ?>
	<!--skip to content link-->
	<a class="skip-content" href="#main"><?php _e('Skip to content', 'author'); ?></a>
	<div id="overflow-container" class="overflow-container">
		<div id="main-sidebar" class="main-sidebar">
			<?php hybrid_do_atomic( 'before_main_sidebar' ); ?>
			<header class="site-header" id="site-header" role="banner">
				<div id="title-container" class="title-container">
					<?php
					$avatar_method = get_theme_mod('avatar_method');
					if( $avatar_method == 'gravatar' || $avatar_method == 'upload' ) { ?>
						<div id="site-avatar" class="site-avatar" style="background-image: url('<?php echo ct_author_output_avatar(); ?>')"></div>
					<?php } ?>
					<div class="container">
						<?php get_template_part('logo')  ?>
						<p class="tagline"><?php bloginfo('description'); ?></p>
					</div>
				</div>
				<button id="toggle-navigation" class="toggle-navigation">
					<i class="fa fa-bars"></i>
				</button>
				<?php ct_author_social_icons_output('header'); ?>
				<?php get_template_part( 'menu', 'primary' ); ?>
			</header>
			<?php hybrid_do_atomic( 'after_header' ); ?>
			<?php get_sidebar( 'primary' ); ?>
			<?php hybrid_do_atomic( 'after_sidebar' ); ?>
		</div>
		<?php hybrid_do_atomic( 'before_main' ); ?>
		<div id="main" class="main" role="main">
			<?php hybrid_do_atomic( 'main_top' ); ?>
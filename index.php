<?php
/**
 * Default (Fallback) Template
 * @package storm-base-theme
 */

?><?php get_header(); ?>

<div class="row">
	<div class="large-12 small-12 columns">
		<?php the_post();
		the_content(); ?>
	</div>
</div>

<?php get_footer(); ?>

<?php
/**
 * Default (Fallback) Template
 * @package storm-base-theme
 */

?><?php get_header(); ?>

<div class="grid-x">
    <div class="cell">
        <?php the_post();
        the_content(); ?>
    </div>
</div>

<?php get_footer(); ?>

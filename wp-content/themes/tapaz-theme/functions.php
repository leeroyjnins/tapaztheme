<?php
/**
 * Tapaz Theme functions and definitions
 */

if (!function_exists('tapaz_theme_support')):
    function tapaz_theme_support()
    {
        // Add support for block styles.
        add_theme_support('wp-block-styles');

        // Enqueue editor styles.
        add_editor_style('style.css');
    }
endif;
add_action('after_setup_theme', 'tapaz_theme_support');

/**
 * Enqueue scripts and styles.
 */
function tapaz_theme_scripts()
{
    // Enqueue main stylesheet.
    wp_enqueue_style('tapaz-theme-style', get_stylesheet_uri());

    // Enqueue Custom Slider styles
    wp_enqueue_style(
        'tapaz-slider-style',
        get_template_directory_uri() . '/assets/css/slider.css',
        array(),
        '1.0.0'
    );

    // Enqueue Custom Slider script
    wp_enqueue_script(
        'tapaz-slider-script',
        get_template_directory_uri() . '/assets/js/slider.js',
        array(),
        '1.0.0',
        true
    );

    // Enqueue Ticker styles
    wp_enqueue_style(
        'tapaz-ticker-style',
        get_template_directory_uri() . '/assets/css/ticker.css',
        array(),
        '1.0.0'
    );

    // Enqueue Ticker script
    wp_enqueue_script(
        'tapaz-ticker-script',
        get_template_directory_uri() . '/assets/js/ticker.js',
        array(),
        '1.0.0',
        true
    );

    // Enqueue Homepage styles
    wp_enqueue_style(
        'tapaz-homepage-style',
        get_template_directory_uri() . '/assets/css/homepage.css',
        array(),
        '1.0.0'
    );

    // Enqueue Homepage script
    wp_enqueue_script(
        'tapaz-homepage-script',
        get_template_directory_uri() . '/assets/js/homepage.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'tapaz_theme_scripts');

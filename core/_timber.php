<?php

// context
add_filter( 'timber/context', function( $context ) {
    $context['menus'] = get_menus();
    $context['assets'] = get_template_directory_uri() . '/assets';
    $context['_session'] = $_SESSION;
    $context['_get'] = $_GET;
    $context['_post'] = $_POST;

    return $context;
} );


// loader
add_filter( 'timber/loader/loader', function ( $loader ) {
    $loader->addPath( get_template_directory() . "/assets", "assets" );
    $loader->addPath( get_template_directory() . "/assets/icons", "icons" );
    $loader->addPath( get_template_directory() . "/assets/images", "images" );
    $loader->addPath( get_template_directory() . "/assets/svg", "svg" );
    $loader->addPath( get_template_directory() . "/views/utils", "utils" );
    $loader->addPath( get_template_directory() . "/views/components", "components" );
    $loader->addPath( get_template_directory() . "/views/acf-components", "acf-components" );

    return $loader;
} );


// twig
add_filter( 'timber/twig', function( $twig ) {
    $twig->addExtension( new \Twig\Extension\StringLoaderExtension() );
    $twig->getExtension( \Twig\Extension\CoreExtension::class )->setTimezone( 'Europe/Paris' );

    // WordPress
    $twig->addFunction( new \Timber\Twig_Function( 'get_term', 'get_term' ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_meta', 'get_meta' ) );
    $twig->addFunction( new \Timber\Twig_Function( 'wp_list_categories', 'wp_list_categories' ) );

    // utils
    $twig->addFunction( new \Timber\Twig_Function( 'uniqid', function() { return uniqid(); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'timber_post', function( $id ) { return new \Timber\Post( $id ); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'timber_term', function( $id ) { return new \Timber\Term( $id ); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_menus', function() { return get_menus(); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_posts', function ( $post_type = 'post', $max = 4 ) {
        return \Timber\Timber::get_posts( array(
            'post_type' => $post_type,
            'numberposts' => $max,
            'orderby' => 'date',
            'order' => 'DESC'
        ) );
    } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_languages', function () {
        if ( function_exists( 'pll_the_languages' ) ) {
            return pll_the_languages( array( 'raw' => true ) );
        }

        return null;
    } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_home_url', function () {
        return function_exists( 'pll_home_url' ) ? pll_home_url() : get_bloginfo( 'url' );
    } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_current_language', function () {
        return function_exists( 'pll_current_language' ) ? pll_current_language() : explode( '-', get_bloginfo( 'language' ) )[0];
    } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_current_language_name', function () {
        return function_exists( 'pll_current_language' ) ? pll_current_language( 'name' ) : null;
    } ) );

    // data
    $twig->addFunction( new \Timber\Twig_Function( 'get_data', function() {
        $path = get_template_directory() . '/data.json';
        
        if ( file_exists( $path ) ) {
            return  json_decode( file_get_contents( $path ), true );
        }
    } ) );

    $plugin_functions = array(
        'acf' => array(
            'get_field',
            'get_fields',
        ),
        'polylang' => array(
            'pll__',
        ),
        'woocommerce' => array(
            'wc_get_product',
            'get_woocommerce_currency_symbol'
        )
    );

    foreach ( $plugin_functions as $function_names ) {
        foreach ( $function_names as $function_name ) {
            if ( function_exists( $function_name ) ) {
                $twig->addFunction( new \Timber\Twig_Function( $function_name, $function_name ) );
            } else {
                $twig->addFunction( new \Timber\Twig_Function( $function_name, function() {
                    return null;
                } ) );
            }
        }
    }

    // Woocommerce
    $twig->addFunction( new \Timber\Twig_Function( 'get_cart', function() {
        global $woocommerce;

        return $woocommerce ? $woocommerce->cart : null;
    } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_shipping', function() {
        global $woocommerce;

        return $woocommerce ? $woocommerce->shipping : null;
    } ) );

    // Danka
    $twig->addFunction( new \Timber\Twig_Function( 'get_breadcrumbs', function() { return Breadcrumbs::get_breadcrumbs(); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_share', function() { return SocialNetwork::get_share(); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_social_network', function() { return SocialNetwork::get_social_network(); } ) );
    $twig->addFunction( new \Timber\Twig_Function( 'get_image_html', function( $id ) { return AppImages::get_image_html( $id ); } ) );
    
    return $twig;
} );


// Ajouter les fichiers twig à l'éditeur de thème
add_filter( 'wp_theme_editor_filetypes', function( $types ) {
    $types[] = 'twig';

    return $types;
} );

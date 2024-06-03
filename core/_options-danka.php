<?php

if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title'    => 'Options DANKA',
        'menu_title'    => 'Options DANKA',
        'menu_slug'     => 'settings-danka',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Réseaux Sociaux',
        'menu_title'    => 'Réseaux Sociaux',
        'parent_slug'   => 'settings-danka',
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Bandeau information',
        'menu_title'    => 'Bandeau information',
        'parent_slug'   => 'settings-danka',
    ));
}
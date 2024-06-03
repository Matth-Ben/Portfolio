<?php

if ( WP_DEBUG ) {
	add_filter( 'body_class', function( $classes ) {
		$classes[] = 'debug';

		return $classes;
	} );
}
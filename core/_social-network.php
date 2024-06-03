<?php

class SocialNetwork
{
    public function __construct() {}

    public static function get_share()
    {
        $options = get_field("social-network-share", "option");

        return $options;
    }

    public static function get_social_network()
    {
        $options = get_field("social-network-links", "option");

        return $options;
    }
}

new  socialNetwork();
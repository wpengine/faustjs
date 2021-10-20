#!/bin/bash

cd /var/www/html

wp plugin install wp-graphql --activate --allow-root

wp db export /var/www/html/wp-content/plugins/$WP_PLUGIN_FOLDER/tests/_data/dump.sql --allow-root

cd /var/www/html/wp-content/plugins/$WP_PLUGIN_FOLDER

cp .env.testing.example .env.testing

cd /var/www/html

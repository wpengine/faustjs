#!/bin/bash

cd /var/www/html/wp-content/plugins/$WP_PLUGIN_FOLDER

# Setup WordPress test core files and database
bash -c "./bin/install-wp-tests.sh $WP_TESTS_DB_NAME $WORDPRESS_DB_USER $WORDPRESS_DB_PASSWORD $WORDPRESS_DB_HOST latest" 

# Install composer deps
composer install

# Back to the root WP folder
cd /var/www/html/

#!/bin/bash

cd /var/www/html/

ls

cd wp-content/plugins/$WP_PLUGIN_FOLDER

bash -c "./bin/install-wp-tests.sh $WP_TESTS_DB_NAME $WORDPRESS_DB_USER $WORDPRESS_DB_PASSWORD $WORDPRESS_DB_HOST latest" 

#4. back to the root WP folder
cd /var/www/html/

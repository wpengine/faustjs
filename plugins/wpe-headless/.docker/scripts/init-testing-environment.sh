#!/bin/bash

cd /var/www/html/

ls

#1. check if wordpress is already installed/configured
if (sudo -u www-data -- wp core is-installed)
then

	#2. check if the database is ready
	if ! (sudo -u www-data -- wp db check)
	then
		# wait a moment for the database container
		sleep 1
		exit 1;
	fi

	#3. init the testing instance
	cd wp-content/plugins/$WP_PLUGIN_FOLDER && sudo -u www-data -- bash -c "./bin/install-wp-tests.sh $WP_TESTS_DB_NAME $WORDPRESS_DB_USER $WORDPRESS_DB_PASSWORD $WORDPRESS_DB_HOST latest"	
fi

#4. back to the root WP folder
cd /var/www/html/

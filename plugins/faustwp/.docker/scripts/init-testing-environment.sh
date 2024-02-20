#!/bin/bash

# Exits with a status of 0 (true) if provided version number is higher than proceeding numbers.
version_gt() {
    test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1";
}

# Ensure mysql is loaded
dockerize -wait tcp://${WORDPRESS_DB_HOST}:3306 -timeout 1m

cd /var/www/html/wp-content/plugins/$WP_PLUGIN_FOLDER

# Setup WordPress test core files and database
bash -c "./bin/install-wp-tests.sh $WP_TESTS_DB_NAME $WORDPRESS_DB_USER $WORDPRESS_DB_PASSWORD $WORDPRESS_DB_HOST $WP_VERSION"

# Install composer deps
composer install

# Install pcov/clobber if PHP7.1+
if version_gt $PHP_VERSION 7.0 && [[ "$COVERAGE" == '1' ]]; then
    echo "Using pcov/clobber for codecoverage"
    echo "pcov.enabled=1" >> /usr/local/etc/php/conf.d/docker-php-ext-pcov.ini
    echo "pcov.directory=/var/www/html/wp-content/plugins/$WP_PLUGIN_FOLDER" >> /usr/local/etc/php/conf.d/docker-php-ext-pcov.ini
    vendor/bin/pcov clobber
fi

# Back to the root WP folder
cd /var/www/html/

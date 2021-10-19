ARG PHP_VERSION=7.4
ARG WORDPRESS_VERSION=5.6.2

FROM wordpress:cli-php${PHP_VERSION} AS wp-cli
FROM wordpress:${WORDPRESS_VERSION}-php${PHP_VERSION}-apache

# Needed for Codeception WPDB test integration.
RUN docker-php-ext-install pdo pdo_mysql

# Add wp-cli to the main container.
COPY --from=wp-cli --chown=www-data:www-data /usr/local/bin/wp /public/bin/wp-cli.phar
COPY wp-cli/wp-cli.sh /usr/local/bin/wp

RUN set -e \
    ; apt-get -qq update \
    ; apt-get install \
        default-mysql-client \
        less \
        openssh-server \
        sudo \
        subversion \
        default-mysql-client \
        telnet \
        vim \
        -qq --no-install-recommends \
    ; sudo adduser www-data sudo \
    ; chmod +x /public/bin/wp-cli.phar \
    ; chmod +x /usr/local/bin/wp \
    ; chown -R www-data:www-data /public /var/www \
    ; rm -rf /var/lib/apt/lists/*

#4. Copy the script to create the testing environment when the container is started
COPY scripts/init-testing-environment.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/init-testing-environment.sh

ENTRYPOINT ["apache2-foreground"]

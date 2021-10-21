FROM wordpress:latest

# Needed for Codeception WPDB test integration.
RUN docker-php-ext-install pdo pdo_mysql

# Install WP cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp \
    && wp --info

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
    ; rm -rf /var/lib/apt/lists/*

# Copy the script to create the testing environment
COPY scripts/init-testing-environment.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/init-testing-environment.sh

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN chmod +x /usr/local/bin/composer

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]

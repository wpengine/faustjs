#!/usr/bin/env bash

set -eu

##
# Use this script through Composer scripts in the composer.json.
# To quickly build a docker container for the test suite.
##
print_usage_instructions() {
    echo "Usage: composer docker:build";
    echo "";
    echo "Example use:";
    echo "  composer docker:build";
    echo "";
    echo "  WP_VERSION=5.9 composer docker:build";
    exit 1
}

if [ $# -eq 0 ]; then
    print_usage_instructions
fi

TAG=${TAG-latest}
WP_VERSION=${WP_VERSION-latest}

BUILD_NO_CACHE=${BUILD_NO_CACHE-}

subcommand=$1; shift
case "$subcommand" in
    "build" )
        while getopts ":c" opt; do
            case ${opt} in
                c )
                    echo "Build without cache"
                    BUILD_NO_CACHE=--no-cache
                    ;;
                \? ) print_usage_instructions;;
                * ) print_usage_instructions;;
            esac
        done
		docker build $BUILD_NO_CACHE \
                    -t faustwp:${TAG}-wp-${WP_VERSION} \
                    --build-arg WP_VERSION=${WP_VERSION} \
					./.docker;
        ;;
    \? ) print_usage_instructions;;
    * ) print_usage_instructions;;
esac

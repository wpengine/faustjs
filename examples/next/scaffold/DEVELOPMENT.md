# Development

## Updating the ACM Blueprint Export

### Importing

1. Create a fresh site in Local or use the FakerPress plugin to wipe your current WordPress database to a fresh install.
2. Install and activate Atlas Content Modeler.
3. From the WP CLI, run `wp acm blueprint import <URL_TO_ZIP>`. You can use the GitHub RAW URL from the repo: https://github.com/wpengine/faust-scaffold/raw/main/acm-blueprint.zip

This will import the ACM Blueprint export into your WordPress database. Make any modifications as necessary.

### Exporting

1. Before exporting, make sure you have deleted any of the initial content that gets created upon a WordPress install (e.g. "Sample Page", "Hello World", any comments, etc.)
2. From the WP CLI, run `wp acm blueprint export --open --wp-options=category_base,permalink_structure,nav_menu_options,theme_mods_twentytwentytwo --post-types=nav_menu_item,post,page,testimonial,project`. This will export the site into the appropriate ACM Blueprint .zip, and also open the location where the .zip was saved. It will also export the Navigational Menus and the CPTs from the ACM models.
3. Replace the existing `acm-blueprint.zip` in the repo with the newly exported `acm-blueprint.zip` and make a PR with the changes.
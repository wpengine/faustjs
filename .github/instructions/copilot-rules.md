# GitHub Copilot Rules for FaustJS Repository

## Project Structure Guidelines

### Licensing

- **Main packages** (`packages/`): Use MIT license
- **Examples** (`examples/`): Use BSD Zero (0BSD) license
- **Archive/Legacy** (`archive/`): Maintain existing licenses (typically MIT)
- Always update `package.json` files with correct license field when creating new packages

### Package Management

- Use `pnpm` as the package manager (specified in `packageManager` field)
- Maintain consistent versioning across related packages
- Use scoped packages with `@faustjs/` prefixes appropriately

### Directory Structure

- `packages/` - Core library packages (astro, core, nextjs, react)
- `examples/` - Example applications
- `archive/` - Legacy packages (faustwp-cli, faustwp-core)
- `docs/` - Documentation (explanation, how-to, reference, tutorial)

## Code Standards

### TypeScript/JavaScript

- Prefer JSDoc for new packages
- Use consistent tsconfig.json configurations
- Follow existing code style and formatting patterns
- Include proper type definitions

### Package.json Requirements

- Include `license` field with appropriate license
- Use `packageManager` field to specify pnpm version
- Include proper `engines` field for Node.js version requirements
- Use consistent naming conventions for scripts

### Documentation

- Always include README.md files for new packages
- Update documentation when making significant changes
- Follow existing documentation structure in `docs/` folder
- Follow the Diataxis system for creating documentation

## Development Workflow

### File Operations

- Check existing file contents before making edits
- Include sufficient context (3-5 lines) when using replace_string_in_file
- Prefer reading larger file sections over multiple small reads

### Testing and Validation

- Check for errors after making file changes
- Validate package.json syntax and structure
- Ensure new packages follow existing patterns

### Git and Repository

- Respect the current branch and repository structure
- Be mindful of changes that affect multiple packages
- Consider impact on both development and production environments

## Specific Project Guidelines

### FaustJS Context

- This is a headless WordPress framework
- Maintain compatibility with WordPress and GraphQL
- Consider both developer experience and end-user needs
- Follow WordPress best practices

## Error Handling and Debugging

### Common Issues

- Always verify file paths are correct and absolute
- Check for syntax errors in JSON files after editing
- Validate that new packages can be properly installed and used
- Consider dependencies and peer dependencies

### Tool Usage

- Use appropriate tools for each task (don't use terminal commands when file tools are available)
- Prefer semantic search for understanding codebase structure
- Use grep search for specific string patterns
- Read files in meaningful chunks rather than line by line

## Quality Assurance

### Before Completion

- Verify all package.json files have correct license fields
- Ensure new files follow existing patterns and conventions
- Check that all created files are properly formatted
- Validate that changes don't break existing functionality

### Best Practices

- Maintain consistency with existing code style
- Follow semantic versioning for package versions
- Keep dependencies up to date and secure
- Document any breaking changes or migration requirements

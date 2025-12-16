# AGENTS.md

## Build Commands
- `bun dev` - Start development server
- `bun run build` - Build for production  
- `bun run lint` - Run Biome linter (checks formatting, imports, linting)
- `bun run lint:fix` - Auto-fix linting issues with Biome

## Code Style Guidelines

### Imports & Formatting
- Use Biome for all formatting/linting (configured in biome.json)
- Import organization is automated - use `@/*` path aliases for internal imports
- Double quotes for strings
- No trailing semicolons

### TypeScript & React
- Strict TypeScript enabled
- Use `React.forwardRef` for component refs
- Interface props extend HTML element attributes when appropriate
- Use `cva` (class-variance-authority) for component variants
- Use `cn()` utility for conditional className merging

### Component Patterns
- Follow shadcn/ui patterns in components/ui/
- Use Radix UI primitives with custom styling
- Components should be default exports with proper displayName
- Use TypeScript interfaces for props with proper generics

### File Structure
- App router structure in app/
- Reusable components in components/
- UI primitives in components/ui/
- Utilities in lib/

Always run `bun run lint` before committing to ensure code quality.
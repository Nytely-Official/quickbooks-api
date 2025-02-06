# Contributing Guidelines

## Development Setup

1. Clone the repository
2. Install Bun (v1.2.1 or higher)
3. Install dependencies:

```bash
bun install
```

## Development Practices

- Use TypeScript with strict mode
- All new features require tests
- Follow semantic versioning
- Keep documentation updated

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Pull Requests

1. Create a feature branch from `main`
2. Ensure all tests pass:

```bash
bun test
```

3. Update documentation if needed
4. Open PR against `main`

## Code of Conduct

Be respectful and inclusive. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

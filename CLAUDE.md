# Claude Code Instructions

## Pre-Commit Checklist

Before committing changes, ensure all quality checks pass:

```bash
npm run lint      # ESLint
npm run build     # Vite build
```

Both must pass before creating a commit.

## Commit Message Guidelines

This project uses [gitmoji](https://gitmoji.dev/) for commit messages.

**Important**: Use **ONE emoji only** in the commit title. If multiple changes need different emojis, add them in the commit body.

Format:
- `<emoji> <description>` - Simple commit
- `<emoji> (#<issue>) <description>` - With GitHub issue reference

Examples:
```bash
# Good - single emoji in title
✨ add content block editor

# Good - with issue reference
🐛 (#42) fix gallery picker validation

# Good - multiple changes in body
✨ add content block editor

🐛 fix form validation
♻️ refactor serialization utils

# Bad - multiple emojis in title
✨🐛 add editor and fix validation
```

Common emojis:
- ✨ New feature
- 🐛 Bug fix
- ♻️ Refactoring
- 💄 UI/styling
- ⚡️ Performance
- 🎨 Code structure

See [gitmoji.dev](https://gitmoji.dev/) for the complete reference.

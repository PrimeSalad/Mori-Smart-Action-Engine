# Contributing to Mori ActionPoint

First off, thank you for considering contributing to Mori ActionPoint! It's people like you that make this project better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/Mori-Smart-Action-Engine.git
   cd Mori-Smart-Action-Engine
   ```
3. **Set up the development environment** (see [Development Setup](#development-setup))
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** for the enhancement
- **Proposed solution**
- **Alternative solutions** considered

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Code Contributions

1. **Find an issue** to work on or create a new one
2. **Comment on the issue** to let others know you're working on it
3. **Follow the development setup** below
4. **Make your changes** following our style guidelines
5. **Test your changes** thoroughly
6. **Submit a pull request**

## 💻 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

### Frontend Setup

```bash
cd mori
npm install
cp .env.example .env
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd mori
npm test
```

## 🔄 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md** with your changes
5. **Follow the PR template**
6. **Request review** from maintainers

### PR Guidelines

- Keep PRs focused on a single feature or fix
- Write clear commit messages
- Include tests for new functionality
- Update documentation as needed
- Ensure CI/CD checks pass

## 📝 Style Guidelines

### JavaScript/React

- Use ES6+ features
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when relevant

Example:
```
Add voice recording feature

- Implement audio recording in ReportModal
- Add Gemini audio analysis
- Update documentation

Fixes #123
```

### Code Style

**Backend (Node.js):**
- Use `const` and `let`, avoid `var`
- Use async/await over callbacks
- Handle errors properly
- Add JSDoc comments for functions

**Frontend (React):**
- Use functional components with hooks
- Keep components small and reusable
- Use meaningful prop names
- Add PropTypes or TypeScript types

### Documentation

- Update README.md for major changes
- Add inline comments for complex code
- Update API documentation
- Include examples where helpful

## 🧪 Testing

- Write unit tests for new functions
- Add integration tests for features
- Test edge cases
- Ensure tests are deterministic

## 🐛 Debugging

- Use `console.log` sparingly
- Use debugger tools (Chrome DevTools, VS Code debugger)
- Check backend logs for API issues
- Review browser console for frontend errors

## 📚 Resources

- [Setup Guide](SETUP_GUIDE.md)
- [Testing Guide](TESTING_GUIDE.md)
- [API Documentation](API_EXAMPLES.md)
- [Quick Reference](QUICK_REFERENCE.md)

## 💬 Questions?

- Open a [GitHub Discussion](https://github.com/yourusername/Mori-Smart-Action-Engine/discussions)
- Check existing [Issues](https://github.com/yourusername/Mori-Smart-Action-Engine/issues)
- Review the [documentation](README.md)

## 🙏 Thank You!

Your contributions make Mori ActionPoint better for everyone. We appreciate your time and effort!

---

**Happy Contributing!** 🚀

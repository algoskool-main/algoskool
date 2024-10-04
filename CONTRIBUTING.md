# Contributing to AlgoSkool

Thank you for your interest in contributing to **AlgoSkool**! We welcome contributions that help make this project better for learners, developers, and educators alike. Please take a moment to review this document before you get started.

## 💡 **How Can You Contribute?**

There are many ways to contribute to AlgoSkool, including:

1. **Bug Reporting**: Identify issues or bugs in the system and report them in the [Issues](https://github.com/YourUsername/AlgoSkool/issues) section.
2. **Feature Requests**: Suggest new features that could enhance the learning experience for users.
3. **Code Contributions**: Help by fixing bugs, adding new features, or improving existing functionality.
4. **Documentation**: Improve the project’s documentation, including this file, README.md, or any other docs related to the platform.
5. **Testing**: Write or improve unit tests to ensure that the platform remains robust and reliable.
6. **UI/UX Design**: Propose or contribute to improving the user interface and user experience.

## 🛠️ **Getting Started with Contributions**

### 1. **Fork the Repository**

- Click the **Fork** button at the top of this repository to create your own copy of AlgoSkool.
- Clone your fork to your local machine:
  ```bash
  git clone https://github.com/YourUsername/AlgoSkool.git
  ```

### 2. **Create a New Branch**

We use the `main` branch for stable production code. When contributing, create a feature branch with a meaningful name to work on.

- Example of creating a branch for a new feature:
  ```bash
  git checkout -b feature/new-awesome-feature
  ```
  
- Example for bugfixes:
  ```bash
  git checkout -b bugfix/fix-coding-hint-error
  ```

### 3. **Make Your Changes**

Make sure to write clean, modular, and well-documented code. Adhere to the following standards:
  
- **Follow best coding practices** (Use Prettier, ESLint for linting JS, etc.).
- **Document your code**: Use comments to explain complex logic.
- **Write Tests**: If you're adding a feature, try to include tests for it (preferably unit and integration tests).

### 4. **Commit Your Changes**

We use the following convention for commit messages:

- `fix:` for bug fixes.
- `feat:` for new features.
- `docs:` for documentation changes.
- `test:` for adding tests.
  
- Example:
  ```bash
  git commit -m "feat: add AI-guided coding hints feature"
  ```

- After committing:
  ```bash
  git push origin feature/new-awesome-feature
  ```

### 5. **Submit a Pull Request (PR)**

Once you have completed your work:

- Go to the repository on GitHub and click on the **Pull Request** tab.
- Submit a **Pull Request (PR)** to merge your branch into `main`.
- Make sure your PR includes:
  - A clear title and description of the changes.
  - Screenshots or gifs if relevant.
  - Any potential issues or side effects the change might cause.

We will review your PR as soon as possible. If changes are requested, please address them promptly.


## 🧪 **Running Tests**

To ensure that your changes do not introduce any bugs, it’s important to run tests before submitting a pull request. AlgoSkool uses **Jest** and **Mocha** for unit and integration testing. You can run the tests using the following commands:

```bash
npm test
```

Make sure that all tests pass, and try to add tests for any new functionality or features.

## 📝 **Code Style Guidelines**

- **JavaScript/TypeScript**: Follow the Airbnb JavaScript Style Guide.
- **HTML/CSS**: Write clean, semantic HTML and use BEM methodology for CSS class naming.
- **React Components**: Use functional components and hooks where possible.
- **Python for ML Models**: Follow PEP 8 guidelines.

Lint your code with:
```bash
npm run lint
```


## 🛡️ **Security Issues**

If you find a security vulnerability, **DO NOT** open an issue on GitHub. Instead, contact us directly via email at: [security@algoskool.com](mailto:algoskool.official@gmail.com).


## 📄 **License**

By contributing to this project, you agree that your contributions will be licensed under the MIT License, unless explicitly stated otherwise.


## 💬 **Need Help?**

Feel free to ask any questions regarding contributing to AlgoSkool by opening an issue or reaching out via [contact@algoskool.com](mailto:algoskool.official@gmail.com).

We appreciate your contribution and are excited to collaborate with you to make AlgoSkool better for everyone!

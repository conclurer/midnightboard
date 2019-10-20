# Conventions for this repo 

This document describes the general conventions on how to contribute and work as a software team. 

## Git conventions

### Master Branch

The `master` branch is per default protected and you should never commit to this branch directly without a pull request.
The `master` branch is for representing the software in its production build this means it should be free of application breaking errors or any other "development" implementations
The `master` branch gets updated in most cases after a sprint review or when a new set of features is ready to be released. 

### Branches

For the general development a branch called `development` is provided where new features / fixes etc. are pushed into before this branch gets merged into the master branch.
When working on issues (e.g. bugs, features, improvements etc) you should always create a new branch based on the current `development` 
branch and append a prefix for the type of issue and what you are working on aswell as the issue number.

A basic example:

```
You are working on issue number 1337 which is a new feature 

You checkout the current development branch and create a new branch from it via `git checkout -b feature/amazing-new-feature-1337`.
And all changes you make are commited to this branch.
```

### Pull Requests 

When you are done with your implementation and have all of your changes committed you should create a pull request to add your features to the `development` branch.
But before you can contribute your pull requests needs to be reviewed by another team member.

### Commits

* Add your issue number to your commit 
* Provide a basic description to each commit (e.g. BAD: `fix` GOOD: `#1337 fixed a bug with our login implementation`) 

## Code conventions

* Javascript code (and other formats) should be styled by (prettier)[https://prettier.io/] 
* Always use a linter to catch common mistakes or bugs ((ESLint)[https://eslint.org/] for javascript)



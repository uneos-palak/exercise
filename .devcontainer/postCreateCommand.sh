#!/bin/zsh
# Please make sure this file is not deleted as it gets called by the devcontainer-image

sleep 3 # Is needed to ensure the container is running correctly

# When mapping the cloned repository from the host into the dev container, git will
# complain about dubious ownership. This configures the folder as save.
git config --global --add safe.directory $(pwd)

pre-commit install

pipx install bump-my-version
pip install --upgrade pip
pip install -e "./services/backend[tests]"


# Configure npm auth for Github packages
echo "@uneos:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=$(gh auth token)" > ~/.npmrc

# should be the same as in .pre-commit-config.yaml
cd services/frontend
npm install

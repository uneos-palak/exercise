# service_extern_excercise1

## Setup the cluster

The project is configured to use with a local kubernetes cluster (minikube) that is started automatically when you start the devcontainer. If (for whatever reason) the cluster is not running you can use the cli to start and stop minikube. You get the current status with minikube status.

```sh
minikube status
```

## Startup the application

The cluster is managed by Tilt (see Tiltfile). This enables starting up the application, starting the debugging endpoints, recompiling the images, port-forwarding and hot-reloading.
To startup the application in the cluster you could use the Tilt cli:

```sh
Tilt up --stream
```

This will build all images, load all helm charts and forward the relevant ports. For convenience a little webserver is packaged that gives an overview of the status of all components in the cluster managed by Tilt. This is started on port `10350` and is autoforwarded to localhost.

## Task Explorer

For convenience all relevant tasks (e.g. to interact with the cluster, start storybook) are described in the `tasks.json` as part of `vscode`. The extension `Task Explorer` makes them easily accessible. There should be an icon in the primary side bar that leads to the menu. If not, the setting can be enabled in the following config:

```
taskExplorer.enableSideBar
```

## Shutdown of the application

To remove all pods from the local cluster and restart with a clean setup, tilt provides the command `down` to reset and cleanup the cluster.

```sh
Tilt down
```

## Pre-commit

To ensure code quality we are using several pre-commit hooks that run automatically before each commit. However, you could run the command separately the see the changes or problems the could currently might have. To run the command use

```sh
pre-commit run --all-files
```

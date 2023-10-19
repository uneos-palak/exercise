# {{project_name}} Frontend

## Setup/ update project

**Note**: You can skip this step if you are using a Dev Container. It is automatically
performed as part of the `.devcontainer/postStartCommand.sh` script.

```sh
npm install
```

### Debugging the frontend

You can use the VS Code `Frontend` launch configuration:

1. Select the `Run and Debug` tab (`ctrl/cmd+shift+D`)
2. Select `Frontend (existing tilt session)` in the top selector
3. Click `Start Debugging` (`F5`)

In the background, this starts the browser and opens a debugging session.

### Open the documentation of our components in a new browser tab

```sh
npm run storybook
```

Alternatively, you can use the VS Code `storybook` task.

## Browser devtools

The Vue browser devtools extension allows you to explore a Vue app's component tree, inspect the state of individual components, track state management events, and profile performance.

[Documentation](https://devtools.vuejs.org)

## Customize Vite configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

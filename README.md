# Svelte UIKit
A framework for prototyping mobile apps in Svelte.
The goal is to reproduce the general navigation of a mobile application.

The system design is equivalent to Apple's UIKit API.

## Extending NavigationView

For example, if you want to place a floating button on a View represented by UINavigationController, you can inherit it as follows.

```
<script lang="ts">
    import NavigationView from "$lib/NavigationView.svelte";
    import type { UINavigationController } from "$lib/UINavigationController.js";
    import { UIView } from "$lib/UIView.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import DemoScreen from "./DemoScreen.svelte";

    export let viewController: UINavigationController;

    function onFabClick() {
        viewController.present(new UIViewController(new UIView(DemoScreen), {}));
    }
</script>

<NavigationView {viewController}>
    <button class="fab" on:click={onFabClick}>FAB</button>
</NavigationView>

<style>
    .fab {
        position: absolute;
        width: 88px;
        height: 88px;
        left: 22px;
        bottom: 22px;
        z-index: 100;
    }
</style>
```





# create-svelte

Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Read more about creating a library [in the docs](https://kit.svelte.dev/docs/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```

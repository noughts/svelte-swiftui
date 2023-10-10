# Svelte UIKit
A framework for prototyping mobile apps in Svelte.
The goal is to reproduce the general navigation of a mobile application.

The system design is equivalent to Apple's UIKit API.

# Motivation
[TBD]

# Setup

In Safari on the iPhone, Pull To Refresh is triggered when flicking down at the top of the screen, and the flick event does not work as expected.

This can be avoided by specifying `overflow:hidden;` in the `body` style.

```html
<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body style="overflow: hidden;">%sveltekit.body%</body>
</html>
```

# Basics

The code to implement [standard tab bar navigation](https://developer.apple.com/documentation/uikit/uitabbarcontroller) in iOS is as follows


```svelte
<!-- src/routes/+page.svelte -->

<script lang="ts">
    import { UISceneController, UITabBarController, UIView, UIViewController, App } from "@noughts/svelte-uikit";
    // imports some Svelte Components here. e.g.: import WorldClockView from "./WorldClockView.svelte";
</script>

<App
    viewController={new UISceneController(
        new UITabBarController([
            new UIViewController(new UIView(WorldClockView), { tabBarItem: { title: "World Clock", icon: "language" } }),
            new UIViewController(new UIView(AlermView), { tabBarItem: { title: "Alarm", icon: "alarm" } }),
            new UIViewController(new UIView(BedtimeView), { tabBarItem: { title: "Bedtime", icon: "bed" } }),
            new UIViewController(new UIView(StopwatchView), { tabBarItem: { title: "Stopwatch", icon: "timer" } }),
            new UIViewController(new UIView(TimerView), { tabBarItem: { title: "Timer", icon: "pace" } }),
        ])
    )}
/>

<style>
    :global(*) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        --ui-tint-color:orange !important;
    }
</style>
```

# Add a SubView to NavigationView.

For example, if you want to place a floating button on a View represented by UINavigationController, you can do it as follows.

```svelte
<!-- +page.svelte -->
<App
    viewController={new UITabBarController([
        new UINavigationController(
            new UIViewController(new UIView(LandmarkList), {
                hidesNavigationBarWhenPushed: true,
            }),
            {tabBarItem: { title: "wo/NavBar", icon: { name: "home" } }},
            new UIView(Fab)
        )
    ])}
/>
```


```svelte
<!-- Fab.svelte -->
<script lang="ts">
    import { UIView } from "$lib/UIView.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import DemoScreen from "./DemoScreen.svelte";
    export let viewController: UIViewController;
    function onFabClick() {
        viewController.present(new UIViewController(new UIView(DemoScreen), {}));
    }
</script>

<button class="fab" on:click={onFabClick}>FAB</button>

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

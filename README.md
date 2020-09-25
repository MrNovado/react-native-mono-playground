# Abstract

React-native + WEB monorepo playground. Following https://github.com/benawad/react-native-web-series tutorial. FreeCodeCamp has a full video here: https://youtu.be/_CBYbEGvxYY .

Unfortunately, Ben' build won't start anymore (at least I wasn't been able to start it on android). But the approach shown in the tutorial is still solid & should be possible to follow with the new `0.63.2` RN' version.

# Inspirations

- https://github.com/benawad/react-native-web-series
- https://github.com/devhubapp/devhub

# Prerequisites

- Node `12.10.0`!
- Yarn ~`1.22+`
- `wix/wml` & `facebook/watchman` global install
- npm `serve` global install
- `xcode|android` sdk installation (https://reactnative.dev/docs/environment-setup follow the guide very closely! __do not modify install paths!__)

# Issues

- We __should-NOT__ use global installations of `react-native/-cli`. Installing any of those globally will break builds.
- Metro has a bug with regular expression https://github.com/facebook/react-native/issues/26598 . Workaround is to downgrade `node` to `12.10.0`.
- React-native still doesn't understand symlinking, so we need to use copy-watchers like `wix/wml` https://github.com/wix/wml/issues/38 . It depends on https://github.com/facebook/watchman/releases , so we need to install & configure the `facebook/watchman` as well.
- Installing Android-story has its own quirks. https://reactnative.dev/docs/environment-setup . Basically, we should follow the guide to the letter, installing `Android/Sdk` anywhere-else besides its default location will break builds -- resetting `Path/ANDROID_HOME` variables makes no diffrence -- only default install works.
- Working with Android emulators also requires at the very least `50GB` of free space! So, given that it will only work in its default location, Windows (maybe others too) users will have to make sure they have a lot of free space on their `C:/` drive available beforehand.
- Working with `react-native-web` requires adding `cross-env SKIP_PREFLIGHT_CHECK=true` before `react-scripts`. Some sort of dependency collision, not sure why exactly (?).
- `react-native-web` is dependant on `react-dom`! Removing `react-dom` from dependencies will break builds.

## Watchman installation guide

https://github.com/wix/wml/issues/38#issuecomment-683534388

> For people who late that have this issue:
> Steps by step how to run WML
> 
> * Install `wml`: `$ npm install -g wml`
> * Install Watchman:
>   
>   * Windows: https://github.com/facebook/watchman/releases (Add to PATH and restart terminal)
>   * MacOS: `$ brew update && brew install watchman`
> * Delete existing watches: `$ watchman watch-del-all`
> * Activate `watchman` for `wml`: `$ watchman watch "C:\Program Files\nodejs\node_modules\wml\src"`
>   
>   * (Windows) Find nodejs package location: `$ npm list -g --depth 0 | head -1` > You will see something like this `C:\Program Files\nodejs`
>   * (MacOS) Find nodejs location: `$ which node`
> * Add link: `$ wml add <package to sync location> <dest package location>`
> * Watch & Sync: `$ wml start`


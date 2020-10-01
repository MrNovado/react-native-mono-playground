# Abstract

React-native + WEB monorepo playground. Following https://github.com/benawad/react-native-web-series tutorial. FreeCodeCamp has a full video here: https://youtu.be/_CBYbEGvxYY .

Unfortunately, Ben' build won't start anymore (at least I wasn't been able to start it on android). But the approach shown in the tutorial is still solid & should be possible to follow with the new `0.63.2` RN' version.

# Inspirations

- https://github.com/benawad/react-native-web-series
- https://github.com/devhubapp/devhub
- https://github.com/Fallup/react-monorepo-example/tree/base-setup (fork: https://github.com/MrNovado/react-monorepo-example) following: https://blog.salsitasoft.com/pitfalls-of-building-a-monorepo-for-react-native-and-react-web-apps/

# Docs

- https://reactnative.dev/docs/environment-setup
- https://github.com/necolas/react-native-web ( http://necolas.github.io/react-native-web/docs )
- https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906
- https://blog.salsitasoft.com/pitfalls-of-building-a-monorepo-for-react-native-and-react-web-apps/

# Prerequisites

- Node `12.10.0`!
- Yarn ~`1.22+`
- `wix/wml` & `facebook/watchman` global install (see below)
- npm `serve` global install
- `xcode|android` sdk installation (https://reactnative.dev/docs/environment-setup follow the guide very closely! __do not modify install paths!__)

# Issues

## Major

- React native monorepo setup: symlinking & hoisting (metro & yarn) issues:
  - ~~React-native still doesn't understand symlinking (https://github.com/facebook/metro/issues/1 , https://github.com/viewstools/yarn-workspaces-cra-crna/issues/26), so we need to use copy-watchers like `wix/wml` https://github.com/wix/wml/issues/38 . It depends on https://github.com/facebook/watchman/releases , so we need to install & configure the `facebook/watchman` as well.~~
  - Instead of `wix/wml` you might wanna consider to add `watchFolders` to `metro.config.js`, which is effectively the same thing: https://gist.github.com/huntie/85ea491763b444bfa1bdc8e997fc2765#file-metro-config-js-L15-L22
  - Not only that, but all hoisted dependencies won't be visible for metro bundler (https://github.com/facebook/metro/issues/7)! Even if you add a `[dep-a, dep-a/**]` nohoist rule, all the dependencies of `dep-a/** (e.g.: dep-a/.../dep-c)` would still be hoisted it seems & metro won't be able to bundle them. https://stackoverflow.com/questions/56675874/nohoist-with-workspaces-still-hoisting
  - Also, you cannot use nohoist-all, like `[**]` or `[*, */**]` rules with yarn unfortunately since it will throw ENOENT: https://github.com/yarnpkg/yarn/issues/6988
  - So the solution is to use a combination of nohoist rules, metro white & black dep lists: https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906 , https://blog.salsitasoft.com/pitfalls-of-building-a-monorepo-for-react-native-and-react-web-apps/

## Minor

- We __should-NOT__ use global installations of `react-native/-cli`. Installing any of those globally will break builds.
- Metro has a bug with regular expression https://github.com/facebook/react-native/issues/26598 . Workaround is to downgrade `node` to `12.10.0`.
- Installing Android-story has its own quirks. https://reactnative.dev/docs/environment-setup . Basically, we should follow the guide to the letter, installing `Android/Sdk` anywhere-else besides its default location will break builds -- resetting `Path/ANDROID_HOME` variables makes no diffrence -- only default install works.
- Working with Android emulators also requires at the very least `50GB` of free space! So, given that it will only work in its default location, Windows (maybe others too) users will have to make sure they have a lot of free space on their `C:/` drive available beforehand.
- Working with `react-native-web` requires adding `cross-env SKIP_PREFLIGHT_CHECK=true` before `react-scripts`. Some sort of dependency collision, not sure why exactly (?).
- `react-native-web` is dependant on `react-dom`! Removing `react-dom` from dependencies will break builds.

## iOS specific issues

### Podfile.lock missing when initial react-native run-ios

https://stackoverflow.com/questions/58546659/podfile-lock-missing-when-initial-react-native-run-ios/58561773#58561773 

> Step 1:
> `sudo gem install cocoapods`
>
> Step 2: 
> `cd ios && pod install && cd ../ && react-native run-ios`
>
> If you still get error while installing pods continue the below steps.
> 
> Step 3: Put this in console ->
> `xcrun -k --sdk iphoneos --show-sdk-path`
>
> if the answer is
> ```
> xcrun:_ error: SDK "iphoneos" cannot be located
> xcrun: error: SDK "iphoneos" cannot be located
> xcrun: error: unable to lookup item 'Path' in SDK 'iphoneos'
> ```
> then put this:
> 
> `sudo xcode-select --switch /Applications/Xcode.app`
>
> Then install pod again

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

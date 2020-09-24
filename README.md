# Abstract

React-native + WEB monorepo playground. Following https://github.com/benawad/react-native-web-series tutorial series.

# Issues

- We __should-NOT__ use global installations of `react-native/-cli`. Installing any of those globally will break builds.
- Metro has a bug with regular expression https://github.com/facebook/react-native/issues/26598 . Workaround is to downgrade `node` to `12.10.0`.
- React-native still doesn't understand symlinking, so we need to use copy-watchers like `wix.wml` https://github.com/wix/wml/issues/38 . It depends on https://github.com/facebook/watchman/releases , so we need to install & configure the `facebook/watchman` as well.
- Installing Android-story has its own quirks. https://reactnative.dev/docs/environment-setup . Basically, we should follow the guide to the letter, installing `Android/Sdk` anywhere-else besides its default location will break builds -- resetting `Path/ANDROID_HOME` variables makes no diffrence -- only default install works.
- Working with Android emulators also requires at the very least `50GB` of free space! So, given that it will only work in its default location, Windows (maybe others too) users will have to make sure they have a lot of free space on their `C:/` drive available beforehand.
- Working with `react-native-web` requires adding `cross-env SKIP_PREFLIGHT_CHECK=true` before `react-scripts`. Some sort of dependency collision, not sure why exactly (?).
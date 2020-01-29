# RN Docker Starter Kit

> This app is configured for ANDROID ONLY.
> A lot more configuration is needed for apple build.
> Hence, this project is not recommended for apple.

## Installation

> It is recommended to run the commands with super user privileges.

- To install the dependencies, run 
```
yarn install
```

- Now, you can carry on in either a contained docker environment or independently.
If you choose not to use docker container, skip this step.
Make sure you have `docker@>=19.03.5` and `docker-compose@>=1.24.1`.
Now run
```
./scripts/start.sh 
```
This will bring up a new shell. Run your next commands in this shell.

- Copy Java codes from `node_modules` to `android` directory by running
```
yarn jetify
```

- Then open the `android` directory with `Android Studio` and sync gradle (Skip if using docker).

- After that copy the file `.env.example` with name `.env`.
Provide necessary values in `.env` file.

- To bundle your JS files, run
```
yarn bundle
```

- To create the android app(apk), run
```
yarn make-unix # for linux and mac
yarn make-win # for windows
```

> For Mac or Linux: To fix the issue of './gradlew: Permission denied', run
> ``` 
> sudo chmod 777 android/gradlew
> ```

This will create an apk file in `android/app/build/outputs/apk/debug`
named `app-debug.apk`.
While using `docker`, there is a possibility that the apk file created
inside the container is not synced with host.
Check the creation time of the apk file to be sure.
If it's not synced, then delete the apk file and re-run the command.

Before creating a new apk, run `yarn jetify` if you installed a new
`react-native` package and `yarn bundle` if you changed your JS codes.

- Now, install the apk file to your mobile with `adb`.
Alternatively, connect your mobile with USB and run
```
yarn install-unix # for linux and mac
yarn install-win # for windows
```

## Live Update
Start a react native server by running
```
yarn start
```

Then open the app and shake your phone real hard. This will bring a pop up menu.
Go to settings. Go to **Debug server host & port for device**.
In the input field, insert `<your ip address>:8081`. For example,
if `192.168.1.10` is your IP address, then insert `192.168.1.10:8081`
and press OK. Make sure your PC and android device is connected to the
same network.

After that if you edit anything in the `app` directory and save,
the android app (running in the mobile) will be reloaded automatically.

> This will work only for JS file. Every time you change something in
>the `android` directory, you have to make a new apk file.

## Changing App Name
Go to `android/app/src/main/res/values/strings.xml` and change the value
of `app_name`.

## Changing App Icon
Go to `android/app/src/main/res`. There are several directories starting
with **mipmap**. There is a file named `ic_launcher.png` in every
**mipmap** directory. Replace all files named `ic_launcher.png` with your
desired icon file.

## Adding New Screen
Add your screen component to `app/screens` directory.
Open `app/screens/index.js`. Import your screen component there and
add it to `Screens` object. If your screen should be visible publicly,
add it to `PublicScreens` object rather. `app/screens/index.js` file
exports a `navigate` object. If your screen name is `Screen1`, then
now you should be able to navigate to your screen as `navigate.to('Screen1')`.
A link to your screen is also added to **Sidebar** as well. However,
if you want a more convenient way to navigate to your screen, you may add
a helper to `navigateTo` variable. You will find this just above exporting
`navigate` variable. For example, you can navigate to home by either
`navigate.to('Home')` or `navigate.to.home()`.

## Getting around `redux`
A convention I followed in this app that data needed by only one component
(or a limited number of sub-components) should use component's own state.
On the contrast, data needed by multiple components should be kept in `redux` store.

### Action
To make a new action, first create UPPER_CASE constant holding the type
of the action in any file inside `app/actions` directory. Then export the
action function. An action function is a function that takes a number
of parameters and returns an object containing the type of the action and other 
parameters. In most cases, you will just return an object that holds the type 
and params passed to the function. For example, `register` action is as the following

```javascript
export const register = (username, password) => ({
  type: REGISTER,
  username,
  password,
});
```
Also, don't forget the export the action type at the bottom in the `export default`
expression. The action function will be used in your component to create a new
action and the types will be used by reducers.

### Reducers
A reducer is just a function that updates the state. I would rather call it
a mutator that mutates current state. A reducer function takes current `state` and
an `action` and updates the state based on the action. You should not update the
`state` object. Rather make a deep copy of it(possibly with `cloneDeep` function
from `lodash`) and update the copy. A reducer function should also export the initial
state related to that particular reducer.

Then import the reducer in `app/reducers/index.js` and add that to the object passed to
`combineReducers` function.

## Adding New Package
Although, this project is built with `react-native@0.61.4`, the core Java files are
replaced by `react-native-navigation` files. As a result, automatic package linking 
does not work. While adding a new package, you need to follow instruction for
`<= react-native@0.59`.

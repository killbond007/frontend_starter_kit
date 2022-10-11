Based on [create-react-app 3.1.1](https://github.com/facebook/create-react-app)

## Prerequisites

- [NodeJS 8.10.0+](https://nodejs.org/en/)
- [Yarn 1.12.1+](https://yarnpkg.com/fr/docs/install)

The project supports IE11+ and latest versions of recent browsers, except Opera Mini. That doesn't mean the project won't work in older browsers but we can't guarantee all features will be functional.  
See the full list of supported browsers here: [https://browserl.ist](https://browserl.ist/?q=%3E0.2%25%2C+not+dead%2C+not+op_mini+all%2C+not+ie+%3C%3D+9)

## Commands

- Runs the project by starting mock and application servers:

  ```
  $ start
  ```

- Runs the application server:

  ```
  $ serve
  ```

- Runs the mock server:

  ```
  $ mock
  ```

- Packages a deployment version of the application:

  ```
  $ build
  ```

- Runs unit tests:

  ```
  $ test
  ```

- Runs unit tests for CI purpose

  ```
  $ test:ci
  ```

- **create-react-app** ejecting script:

  ```
  $ eject
  ```

- Formats the code base:
  ```
  $ prettier
  ```

## Precommit

Commands `test:ci` and `prettier` are run before each commit to ensure the code is constantly well-formatted and tested.

## Styling

The project implements [styled-components](https://www.styled-components.com/) to manage component styles.

All component folders contain a `__styles__` directory for styling files.

The style guide is defined in `src/__theme__/theme.js`:  
All design facets of the application are referenced and used throughout the app by using the **ThemeProvider** component provided by **styled-components**.

## Unit tests

The project uses [jest](https://github.com/facebook/jest) as test runner and expectation library and [react-testing-library](https://github.com/kentcdodds/react-testing-library) as testing framework.  
JSX tags contains as often as possible a `data-testid` attribute to retrieve elements throughout the DOM.

## Code splitting

The project implements [redux-dynamic-modules](https://github.com/microsoft/redux-dynamic-modules) to dynamically load pages workflow (actions/reducers/sagas).
Page components are loaded using `Suspense` and `lazy` React modules.

## i18n

Localization is provided by [react-i18next](https://react.i18next.com/)

## Modules

In order to optimize the loading process of the app, code is split into chunks that are loaded as user is navigating throughout the different routes.

That means pages have to be isolated the way they can be loaded and unloaded with no extra dependencies.

That kind of chunk is called `module`:

A module is a set of several files organized like a small app. Its architecture looks like this:

- `index.js` is the definition of the module
- `actions`
- `components`
- `reducers` (optional)
- `selectors`
- `sagas`

In addition with the `Suspense`/`lazy` mechanism provided by React allowing to defer the loading of a component, we have to deal with the sagas and the reducers.

To do so the project implements [redux-dynamic-modules](https://github.com/microsoft/redux-dynamic-modules).

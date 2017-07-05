# trampss-redux-factory

Factory of Redux reducers and their associated actions and selectors.
> Make your Redux code base tinier and simpler to maintain

[![CircleCI](https://circleci.com/gh/Trampss/trampss-redux-factory.svg?style=shield)](https://circleci.com/gh/Trampss/trampss-redux-factory) [![Coverage Status](https://coveralls.io/repos/github/Trampss/trampss-redux-factory/badge.svg?branch=master)](https://coveralls.io/github/Trampss/trampss-redux-factory?branch=master) [![NPM Version](https://badge.fury.io/js/trampss-redux-factory.svg)](https://www.npmjs.com/package/trampss-redux-factory)
[![Size](http://img.badgesize.io/Trampss/trampss-redux-factory/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [API](#api)

## Purpose
`trampss-redux-factory` creates generic reducers, actions and selectors in two lines.

```es6
import factory from 'trampss-redux-factory'
export default factory(/* middlewares */)('id')('api')('todos')
```
That's it, you exported a reducer function you can register thanks to combinerReducer in Redux.

In this example, we have a `todos` reducer, it has to be combined into `state.api.todos`

## Why
We like to write Redux code as simple as possible and use its middlewares to handle real world problems.
From this point of view, our Redux code base is simpler : it's like a key/value store. But one drawback is the amount of duplicated code, each resource has its own reducers, actions and selectors.

We created this lightweight library, a factory of reducers, actions and selectors, to avoid inconsistency and painful maintainability from our growing Redux code base.

## Installation
 - `yarn add trampss-redux-factory`
 - `npm i trampss-redux-factory`

### peer dependency
 - `lodash` : we use the minimum of lodash function trying to have a lightweight webpack bundle.
   - `keyBy`
   - `without`
   - `uniq`
   - `omit`
   - `at`

## API
 - [factory](#factory)
 - [actions](#actions)
 - [selectors](#selectors)

### factory
You need to use the factory to get a new set of reducer/actions/selectors :
```es6
import factory from 'trampss-redux-factory'
```

This factory takes four parameters, you can use one of these signatures :
 - `factory(middlewares)(fieldKey)(path)(name)`
 - `factory(middlewares)(fieldKey)(path)({ name, prefix })`

Parameters are :
 - **middlewares** (optional), contain an object with `pre` and `post` fields. Both are an array of middlewares to apply before and after the `core` middleware.
 - **fieldKey** (mandatory), the field used to identify your objects (`id` for example)
   - you have to set this parameter.
 - **path** (optional), where the reducer will be combined via `combineReducer`
   - if empty `export default factory('id')()('todos')`, the reducer will be register at the root level of the redux state
   - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
 - **name** (mandatory), the reducer name (for instance: `todos`)
   - it's used to generate actions types
   - it's used to retrieve informations from selectors
   - it can be an object : `{name, prefix}` where `prefix` is added to actions so we avoid some collides if you two reducers with same name in two distincts pathes.

Example:
 - this reducer will use `id` as key field
 - it's combined into `state.api.raw`
 - its name is `todos`
```es6
import factory from 'trampss-redux-factory'
// factory(fieldKey)(path)(name)
export default factory()('id')('api.raw')('todos')
```

Data will be stored into `state.api.raw.todos`

### reducer
The previous factory returns a function which is a reducer.
You just have to combine it like any other reducer :
```es6
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// create your Redux store as usual
const store = createStore(
  combineReducers({
    // [other reducer]
    api: combineReducers({
      // [other reducer]
      raw: combineReducers({
        // import your reducer into api.raw
        // since we configured this path
        todos,
      }),
      // [other reducer]
    }),
    // [other reducer]
  }),
  /* your Redux middlewares */
)

export default store
```

### actions
The factory returns a function (this is the reducer) that also contains actions and selectors as fields.
Some generic actions are available. By now, it's not possible to add custom ones.

Actions are:

| function name | description | signature | generated action |
|---|---|---|---|
| `set` | set an array of instances of your resource | `set(<array>)` | `{ type: '@trampss/SET_TODOS', payload: <array> }` |
| `add` | add an instance of your resource | `add(<instance>)` | `{ type: '@trampss/ADD_TODOS', payload: <instance> }` |
| `remove` | remove one instance of your resource by its key | `remove(<key>)` | `{ type: '@trampss/REMOVE_TODOS', payload: <key> }` |
| `reset` | reset the reducer (wipe all data) | `reset()` | `{ type: '@trampss/RESET_TODOS' }` |


Example, we set todos to our reducer:
```es6
// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// dispatch can be given by one of your middleware (redux-thunk, redux-saga, etc)
// or it can be given by react-redux for example (mapDispatchToProps)
dispatch(
  // set todos
  todos.set([
    {
      id: '1', // we set 'id' as key in the factory
      visible: true,
      label: 'My first todo',
    },
    {
      id: '2',
      visible: false,
      label: 'This todo is done',
    },
  ])
)

```

### selectors
The factory returns a function (this is the reducer) that also contains actions and selectors as fields.
Some generic selectors are available. By now, it's not possible to add custom ones.

Selectors are:

| signature | description | comment |
|---|---|---|
| `get(<id>)(state)` | returns all data, or specific(s) one(s) (by key(s)) | <ul><li>if `<id>` is `undefined`, it returns all data</li><li>if `<id>` is an array, it returns all instances that match one of ids</li><li>in other cases, it returns the instance with its `id` that that match the parameter</li></ul> |
| `getBy(<propertyPath>, <value>)(state)` | get data specified by the field you want to filter with (take care, selectors are not memoized) | Example: `getBy('visible', true)(state)` returns all visible todos.
| `getKeys(state)` | returns all store keys (in array) | |
| `getAsArray(state)` | returns all data in array (raw) | |
| `getLength(state)` | returns number of stored instances | |
| `isInitialized(state)` | return true if the store has been initialized (by `add` or by `set` action) | |
| `getState(state)` | returns the global state of your reducer | The global state contains :<ul><li>`data`: key/value store</li><li>`array`: raw data</li><li>`keys`: keys array</li><li>`initialized`: boolean (set to true by `set` and `add` actions)</li></ul>

Example, we retrieve the todo with id `1`:
```es6
// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// state can be given by one of your middleware (redux-thunk, redux-saga, etc)
// or it can be given by react-redux for example (mapStateToProps)
todos.get('1')(state)

```

# Workshop: Front-End

In this chapter we will tackle how to create various components on the newly setup project.

- [Workshop: Front-End](#workshop-front-end)
  - [Title Changes](#title-changes)
  - [Add a new page: about](#add-a-new-page-about)
  - [Adding navigation buttons](#add-a-navigation-buttons)
  - [Automatically display current location](#automatically-display-current-location)
  - [Adding a new model: User](#adding-a-new-model-user)
  - [Make use of the new components in `view.js`.](#make-use-of-the-new-components-in-viewjs)
  - [Adding buttons](#adding-buttons)
  - [Create a new class file `Home.js`](#create-a-new-class-file-homejs)
  - [Create an new class file `About.js`](#create-an-new-class-file-aboutjs)
  - [Build a table in `aboutPage.js`](#build-a-table-in-aboutpagejs)
  - [Link pages between them](#link-pages-between-them)

## Title Changes

- Modify the `TitleLocation` component so that it shows the current page location.
- Modify the card's title style to have font weight `bold`.
- Hint: you can get page location via route object. You can check route object properties from [here](https://v3.router.vuejs.org/api/#router-forward).

## Add a new page: about

- Create a new `about-page.vue` under `views`.
- Modify router config to include route to path `/about` with a name `about` for routing to `about-page.vue` in `router.js`.
- Hint : you can check Vue Router configuration from [here](https://v3.router.vuejs.org/guide/#javascript).

## Adding navigation buttons

- Add a button in the `home-page.vue` page which purpose will be to take the user to `about-page.vue` page:

  - This should have title "About".
  - Should use one an icon: `faInfo`.
  - Hint: icons can be added via `icon.js`. You can check avialable icons from [here](https://fontawesome.com/search). (Most of icons are in categories `solid` and `regular`).

- Add a button in the `about-page.vue` page which purpose will be to take the user to `home-page.vue` page:
  - This should have title "Home".
  - Should use an icon `faHome`.

- Hint: BootstrapVue provides built-in property to support Vue Router for related components e.g.; `b-button` and `b-link`. You can check the document [here](https://bootstrap-vue.org/docs/reference/router-links).
<!-- - Add a button in the `about` page which purpose will be to request data about the application:
  - Add a title to it
  - Should use an icon
  - Should print to the console its purpose -->

## Automatically display current location

- Modify the `location` data in `TitleLocation` component to a computed property so that the page location will be updated when page change.

## Adding a new model: User

- Create a new class `User.js` under `models`.
- Class should extends a `Model` class from "@vuex-orm/core".
- Class fields should include
  ```
  id: common attribute [default: null]
  username: string [default: ""]
  password: string [default: ""]
  email: string [default: ""]
  confirmed: boolean [default: false]
  ```
- Register `User` model to `VuexORM` database.
- Hint: VuexORM has been initlaized in `store.js`. You can check how to register model from [here](https://vuex-orm.org/guide/model/database-registration.html#changing-the-namespace).

## Adding login form to `home-page.vue` page

- Add form with `email` input and `password` input to `home-page.vue`.
- Use `User` model as data to bind with input's value.
- Add event listener on `submit` event of form to call login API.
- Add a `POST` method to `/auth/local` which will be logged in user with `identifier` and `password` in `User` model API.
  ```
  request body example
  {
    "identifier": "example@mail.com",
    "password": "xxx"
  }
  ```
- Hint 1: VuexORMAxios has an extension to include API calling in VuexORM model via `Custom Actions`. You can check it [here](https://vuex-orm.github.io/plugin-axios/guide/custom-actions.html#when-to-use-custom-actions).
- Hint 2: When Strapi response login API, it will include `jwt` field and `user` field. By default, VuexORM will saved response from API into the store. If you want to do something before saving, you can add option `{ save: false }` to prevent default saving process and maunally insert the data or you can use `dataTransformer` to transform the data earlier. You can check it [here](https://vuex-orm.github.io/plugin-axios/guide/usage.html#handling-responses).

## Display basic user information to `about-page.vue` page

- Add a `GET` method to `/uses/me` which will be get a user based on `Authorization` header in `User` model API
- Call corresponding method in `mounted` hook of `about-page.vue` to automatically get current user data
- Display user's email and user's username from given user's id from API, but retreving the data from VuexORM instead of the response from API.
- Hint: as `Authroization` header should be added to all of VuexORMAxios instance after the loggedin success, you can use `globalApiConfig` to inject `Authorization` header to every axios request. You can check it [here](https://vuex-orm.github.io/plugin-axios/api/model.html#globalapiconfig).

## Adding a new model: Role

- Create a new class `Role.js` under `models`.
- Class should extends a `Model` class from "@vuex-orm/core".
- Class fields should include
  ```
  id: common attribute [default: null]
  name: string [default: ""]
  description: string [default: ""]
  type: string [default: ""]
  ```
- Register `Role` model to `VuexORM` database.
- Connect relationship `one-to-many` from `Role` model to `User` model and vice versa.
- Hint: You can check how to connect model's relationship from [here](https://vuex-orm.org/guide/model/relationships.html).

## Display user role information to `about-page.vue` page

- Modify retreved the data from VuexORM of corresponding user to included role
- Display user's role after user's email and user's username
- Hint: You can check how to load model's relationshop [here](https://vuex-orm.org/guide/data/retrieving.html#relationships).

# Extra Exercise
## Add a new page: todo-list

## Build a table to display user's todo list

## Adding ability to create, edit and delete todo list items

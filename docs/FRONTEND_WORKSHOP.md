# Workshop: Front-End

In this chapter we will tackle how to create various components on the newly setup front-end.

- [Workshop: Front-End](#markdown-header-workshop-front-end)
  - [Title Changes](#markdown-header-title-changes)
  - [Add a new page: about](#markdown-header-add-a-new-page-about)
  - [Adding navigation buttons](#markdown-header-add-a-navigation-buttons)
  - [Automatically display current location](#markdown-header-automatically-display-current-location)
  - [Adding a new model: User](#markdown-header-adding-a-new-model-user)
  - [Adding login form to `home-page.vue` page](#markdown-header-adding-login-form-to-home-pagevue-page)
  - [Display basic user information to `about-page.vue` page](#markdown-header-display-basic-user-information-to-about-pagevue-page)
  - [Adding a new model: Role](#markdown-header-adding-a-new-model-role)
  - [Display user role information to `about-page.vue` page](#markdown-header-display-user-role-information-to-about-pagevue-page)
  - [Extra Exercise](#markdown-header-extra-exercise)

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

## Adding validation to login form

Use these criteria to create validation rule. The warning message should display only one invalid validation.
- email input must not empty, otherwise display warning message "email is required".
- email must be an valid email, otherwise display warning message "email is invalid".
- password must not empty, otherwise display warning message "password is required".
- password must be longer than 6 characters, otherwise display warning message "password must be more than 6 characters"

- Hint 1: use `state` prop of `<b-input>` or `<b-input-group>` to control the invalid state of input.
- Hint 2: use `<b-form-valid-feedback>` to display warning message. You can check it [here](https://bootstrap-vue.org/docs/components/form-group#invalid-feedback).
- Hint 3: use Vuelidate to setup the validation rule. You can check it [here](https://vuelidate.js.org/#sub-basic-form)

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

## Add ability to create, edit and delete todo list items

## Build a table to display user's todo list

## Add unit testing to page: todo-list

- Create test cases following three acceptance criteria
  - it should display create todo list item task and set data to display modal when click
  - it should display todo list item of given user with title, description, edit button and delete button
  - it should display manage modal and set form data when edit todo list item
  - it should display delete modal and set deleted id of todo list item when delete todo list item
- Hint 1: check vue test utils command [here](https://v1.test-utils.vuejs.org/api/wrapper)
- Hint 2: use `beforeEach` hook and jest `cleanAllMocks` function to clean mock for every test cases.
- Hint 3: use `flushPromises` after mounting component to make sure all asynchonous operations were resolved.
- Hint 4: use mockImplementation to mock `api()` method, check how to mock [here](https://jestjs.io/docs/27.x/es6-class-mocks#replacing-the-mock-using-mockimplementation-or-mockimplementationonce)

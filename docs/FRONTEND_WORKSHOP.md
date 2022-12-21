# Workshop: Front-End

In this chapter we will tackle how to create various components on the newly setup project.

- [Workshop: Front-End](#workshop-front-end)
  - [Title Changes](#title-changes)
  - [Add a new page: home](#add-a-new-page-home)
  - [Add a new page: about](#add-a-new-page-about)
  - [Make use of the new components in `view.js`.](#make-use-of-the-new-components-in-viewjs)
  - [Adding buttons](#adding-buttons)
  - [Create a new class file `Home.js`](#create-a-new-class-file-homejs)
  - [Create an new class file `About.js`](#create-an-new-class-file-aboutjs)
  - [Build a table in `aboutPage.js`](#build-a-table-in-aboutpagejs)
  - [Link pages between them](#link-pages-between-them)

## Title Changes

- Modify the `TitleLocation` component so that it shows the current page location in the card
- Modify the `location` data to a computed property
- Modify the card's title style to have font weight `bold`
- Hint: you can get page location via route object. You can check route object properties from [here](https://v3.router.vuejs.org/api/#router-forward)

## Add a new page: about

- Create a new `about-page.vue` under `views`
- Add path `/about` for routing to `about-page.vue` in `router.js`

## Make use of the new page in `router.js`.

- Modify router config to include route to path `/about` with a name `about` for routing to `about-page.vue` in `router.js`
<!-- - Modify the `NavBar` component so that it shows navbar link that route to `about` page
- Hint: you can leverage `<b-navbar-nav>` and `<b-nav-item` to create navbar link to other page. The documentation is provided [here](https://bootstrap-vue.org/docs/components/navbar) -->

## Adding buttons

- Add a button in the `home` page which purpose will be to take the user to `about` page:

  - This should have title "About"
  - Should use one an icon: `info`
  - Should print to the console its purpose
  - Hint: icons can be added via `icon.js`. You can check avialable icons from [here](https://fontawesome.com/search). (Most of icons are in categories `solid` and `regular`)

- Add a button in the `home` page to get the username:
  - Should use one `iconPerson` icon
  - Should print to the console its purpose
- Add a button in the `about` page which purpose will be to take the user to `home` page:

  - This should have title "Home"
  - Should use an icon
  - Should print to the console its purpose

- Add a button in the `about` page which purpose will be to request data about the application:
  - Add a title to it
  - Should use an icon
  - Should print to the console its purpose

## Create a new class file `Home.js`

- Class should have a constructor
  - Constructor should initialize super() and userName
- Write a `getUserName` method which will return the userName and will be used by the "User" button
- Write a `setUserName` method which will set the user to your name
-
- Add a label component in the home page which should use `getUserName` method to display the user.
- Use the `setUserName` method to change the label to your username when pressing the user button
- Press button. Was the label updated?
- Observable model - missing `this.notify()`

## Create an new class file `About.js`

- Class should have a constructor
  - Constructor should
    - initialize super()
    - an empty JSON variable details in which data will be placed
    - a requestedTimes variable
  - Add a method to `getDetails` which will set the JSON variable and increment the requestedTimes variable

## Build a table in `aboutPage.js`

- The table should be filled with data from the `getDetails` method implemented earlier which is being called by the button with the same purpose

## Link pages between them

Make use of [QueryRouter](https://github.com/AliceO2Group/WebUi/blob/dev/Framework/docs/guide/front-router.md)

- Add functionality to the 2 buttons (in home and about pages) to take the user from one page to the other

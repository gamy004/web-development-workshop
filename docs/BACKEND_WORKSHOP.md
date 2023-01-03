# Workshop: Back-End

In this chapter we will tackle how to create various components on the newly setup back-end.

- [Workshop: Back-End](#markdown-header-workshop-back-end)
  - [Create new user via admin console](#markdown-header-create-new-user-via-admin-console)
  - [Create new user via API](#markdown-header-create-new-user-via-api)
  - [Add a new collection type: Todo List Item](#markdown-header-add-a-new-collection-type-to-do-lis-item)
  - [Set permissions for Todo List Item API](#markdown-header-set-permissions-for-todo-list-item-api)
  - [Create new user via admin console](#markdown-header-create-new-todo-list-item-via-admin-console)
  - [Create new user via API](#markdown-header-create-new-todo-list-item-via-api)

## Create new user via admin console
- Create new entry to `Users` collection
- Assign mendatory fields `username`, `email`, and `password`
- Assign `confirmed` field to `ON`
- Assign role `Authenticated` to the corresponding user

## Create new user via API
- Send a `POST` method to `http://localhost:1337/auth/local/register`.
  ```
  request body example
  {
    "username": "example",
    "email": "example@mail.com",
    "password": "xxx"
  }
  ```

## Add a new collection type: Todo List Item

- Create new collection type with name `Todo List Item`
- Collection fields should include
  ```
  title: text [required]
  description: rich text
  ```
- Add relation with User (from: user-permissions). The `User` should have many `Todo List Items`.
- Hint: You can check instructions for creating new collection type and adding relation on step 1 and step 2 from [here](https://docs-v3.strapi.io/developer-docs/latest/getting-started/quick-start.html).

## Set permissions for Todo List Item API

- Enable following `Todo List Item` API endpoints
    - find
    - create
    - update
    - delete
- Hint: You can check instructions for setting up permission on step 3 from [here](https://docs-v3.strapi.io/developer-docs/latest/getting-started/quick-start.html).

## Create new todo list item via admin console
- Create new entry to `Todo List Items` collection
- Assign mendatory fields `title` and `user`

## Create new todo list item via API
- Send a `POST` method to `Todo List Item` API endpoint `create`.
  ```
  request body example
  {
    "title": "example",
    "description": "<p>This is example</p>",
    "user": 2
  }
  ```

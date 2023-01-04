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
- Hint: here's the example on how to sent the request to register a new user [here](https://docs-v3.strapi.io/developer-docs/latest/development/plugins/users-permissions.html#registration)

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
- Send a `POST` method to `Todo List Item` API endpoint `create` (User's token should be added as `Authorization` header with the request).
  ```
  request body example
  {
    "title": "example",
    "description": "<p>This is example</p>",
    "user": 2
  }
  ```

## Create custom controller: create my todo list item
- Add new route with following configuration to `todo-list-item` api
  ```
  method: POST
  path: "/my/todo-list-items"
  handler: "todo-list-item.createMyTodoListItem",
  ```
- Use current `user` in `state` object to create todo list item given the `title` and `description` (description is optional)
- Validate the request `body` that the given title should be not empty, otherwise return http response as 422 "unprocessable entity" with message "title is required."
  ```
  error handling example
  
  if (isInvalid) {
    return ctx.badRequest("Request invalid.");
  }
  ```
- Hint 1: you can extends default behaviour of strapi create's controller from their template from [here](https://docs-v3.strapi.io/developer-docs/latest/development/backend-customization.html#collection-type).
- Hint 2: you can return http error using built-in strapi errors which is implemented by @hapi/boom. you can check boom errors from [here](https://hapi.dev/module/boom/api/?v=10.0.0#http-4xx-errors).

## Create custom controller: find my todo list item
- Add new route with following configuration to `todo-list-item` api
  ```
  method: GET
  path: "/my/todo-list-items"
  handler: "todo-list-item.findMyTodoListItem",
  ```
- Use current `user` in `state` object to get todo list item of particular user

## Create custom controller: update my todo list item
- Add new route with following configuration to `todo-list-item` api
  ```
  method: PUT
  path: "/my/todo-list-items/:id"
  handler: "todo-list-item.updateMyTodoListItem",
  ```
- Add policy `isOwner` to validate the current todo list item can only be updated when the user's id from the `state` object match with the id of the corresponding todo list item
- Validate the request `body` that the given title should be not empty, otherwise return http response as 422 "unprocessable entity" with message "title is required."
- Hint: you can check on how to create policy from [here](https://docs-v3.strapi.io/developer-docs/latest/development/backend-customization.html#api-policies).

## Create custom controller: delete my todo list item
- Add new route with following configuration to `todo-list-item` api
  ```
  method: DELETE
  path: "/my/todo-list-items/:id"
  handler: "todo-list-item.deleteMyTodoListItem",
  ```
- Apply previous policy to this route to get ability of checking ownership of todo list item

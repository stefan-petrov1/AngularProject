### [Demo](https://angularsoftuniproject.web.app)&nbsp;&nbsp;&nbsp;&nbsp;[Dinosaur's Auction](https://github.com/stefan-petrov1/AngularProject)

This codebase was created to show a full application built with Angular that uses a backend server with CRUD operations, authentication, routing, pagination, and more.

# Making requests to the backend API

For convenience, the API server is in the project files so everyone can host it on their own computer. In order to run the server, open a terminal in the server folder and type `node server` or `node server.js`. Make sure you have node installed!

If you want to change the API URL, simply edit `client/src/environments/environment.ts` and change `apiUrl` to the server's URL (i.e. `localhost:3000/api`)

# Getting started

Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally. I use [npm](https://www.npmjs.com/) to manage the dependencies. It should be automatically installed with node. Open a terminal in the client folder and run `npm install` or `npm i` to resolve all dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the project

Run `ng build` to build the project. The build will be stored in the `dist/` directory.

## Functionality overview

The project application is an e-commerce auction site called "Dinosaur's Auction". It uses a custom API for all requests, including authentication - [SoftUniPracticeServer](https://github.com/softuni-practice-server/softuni-practice-server).

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button)
- CR\*\* users (sign up & profile page - no deleting/updating)
- CRUD Posts
- GET and display paginated lists of posts
- Manage cart state manually

**The general page breakdown looks like this:**

- Home page ( URL: /#/home )
  - Welcome page with general site info
- Not Found page ( URL: /#/not-found )
  - Navigated to automatically when you try to access a page that doesn't exist
- Login/Sign up pages ( URL: /#/login, /#/signup )
  - Uses JWT (store the token in localStorage)
- Profile page ( URL: /#/profile )
  - Show basic user info
  - Display list of the user's owned posts
  - Delete post button on each post
  - Edit post button on each post
- Create/Edit post pages ( URL: /#/create, /#/edit/post-id-here )
  - Edit post page can only be accessed by the post's owner
- Catalog page ( URL: /#/catalog )
  - Display paginated lists of posts
  - Filter by search/price posts
- Post details page ( URL: /#/catalog/post-id-here )
  - Add item to cart (unable to add if is owner of post or post already in cart)
- Cart page ( URL: /#/cart )
  - Display the cart items (stored in local storage)
  - Manage state and change detection manually

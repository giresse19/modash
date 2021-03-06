## Instagram scraping app:
 Simple Node.js/MongoDb and Vue.js app which scrapes and analyze instagram(IG) professional accounts.

## Building and running locally:

To run this locally, you need Node.js > 9, a mongoDB cloud instance using atlas and a google service account.

## Get mongoDb atlas instance:
* PS: For testing purpose, the app is currently created with a test instance I made. If you don't wish to create an instance, you can just use the already configure one.

* If you wish to creat your own instance then continue with the steps below:
* Set MongoDB atlas instance from here: 
  - https://cloud.mongodb.com/v2/5ea07fec9dae766e6eb7205f#metrics/replicaSet/5ea08375d1169842708bdf44/explorer.

  - get a database user's name and password and insert those on the `./config/config.ts` file in the variables
  `db_user` and `db_password` respectively.

## Get a google service account with enabled API:
* The purpose of the google service account is to be able to access google vision API, which advises against using an API
key instead of a service account. 

 * Please follow the link below and perform *ONLY*  steps (1) and (2):

 - https://cloud.google.com/natural-language/docs/quickstart-client-libraries#client-libraries-install-nodejs

 - Also enable the Google Vision API for the google project you created.

 - Remember that step (2), ONLY works in the current session of the terminal. That is, if you set the google application credentials on terminal window and later close that particular terminal window, you will need to run it again in the new terminal window inorder to access the API.


 Navigate to a chosen folder:
 * Clone the repository: 
```sh
git clone https://github.com/giresse19/modash.git

```
## Installation
Back-end:
```sh
cd modash/server
$ npm install 
$ npm run server
```
* App should be  exposed at http://localhost:3000 and connected with mongoDB(via mongoDB atlas)

* windows users, if you're getting this annoying npm error:
 *openssl config failed: error:02001002:system library:fopen:No such file or directory*

 Please check the link below for a fix:
 -  https://github.com/npm/npm/issues/17261


| Purpose | URL
| - | -
| 404 page | http://localhost:3000/anypage
| Posting instagram user to server | http://localhost:3000/analyze/username  (you may use postman to perform this action setting body to "raw")
| Get all instgram accounts in DB | http://localhost:3000/api/v1/all
| Get specific profile details | http://localhost:3000/api/v1/profile?name="username"

## Folder structure

### Root files

| File | Comment
| - | -
| `.editorconfig` | IDE styler (see http://editorconfig.org/)
| `.eslintrc.ts` | ESLint Rules, including ES6 and some best practices
| `.gitignore` | Ignoring node_modules
| `tsconfig.json` | typescript config  file
| `Readme.md` | This file
| `package.json` | NPM data including node and npm engine versions

### ./src/server.ts
* Main entrance point, also defined as this on `package.json`
* Catches all exceptions and logs, preventing errors to crash process
* Shows stack traces of exceptions in development env.
* Uses `process.env.PORT` to define listen port, fallbacks to `3000`
* listens to `./app.js`

### ./src/app.ts
* Isolated Express App (without the server).
* It has only one custom middleware that
  * Sets response header for JSON
  * Creates a function to return APIs in `{status:200, data: ...}` format
* It sets `Access-Control-Allow-Origin` to `*` to avoid CORS issues.
* It has 3 public API which uses `services folder`.
* The 3 services accepts usernames via http POST, provides endpoints to access all users in DB, provide specific user profile in DB. 
* instantiate a mongoDB connection.
* It has a fallback route for 404.
* It has an Error route to catch uncaught errors.

### ./src/app/models/Users.ts
* Mongoose connection starts here
* Mongoose models and their schemas are defined and exported here

### ./src/config/db.ts
* Uses `src/models` to get Mongoose Models
* Connects to mongoDB atlas (https://cloud.mongodb.com/v2/5ea07fec9dae766e6eb7205f#metrics/replicaSet/5ea08375d1169842708bdf44/explorer)

### ./src/config/db.ts
* Config for mongoDB atlas is found here
* Contains all global configurations and variables used in the App here too.
* get a database user's name and password and insert in the variables
  `db_user` and `db_password` respectively.

### ./src/app/helper/getImageRequest.ts
* Utility methods to fetch data from instagram with instagram `username`, get insights with media
gotten from fetched instagram user from google vision API is located here. 
* All subroutines are seperated as functions including **Checks** and **Data conversions**

### ./src/app/helper/getMedia.ts
* Utility methods to scrape the media data returned from instagram API and prepare it in the correct format
inorder to get image insights from google API.

### ./src/app/helper/parseCaption.ts
* Has utility methods to parse media comments by `#` and `@` inorder for them to be stored  in a suitable data structure in the DB.

### ./src/app/routes/getUsername.ts
* Contains endpoint for accepting HTTP POST IG `username` and calls the `service.profile` method in the servie inorder to store user profile to DB.
* Validate's username entered and return an error is name is missing in query params.

### ./src/app/services/profile.ts
* Main App logic is here
* Contains 3 exported services (see `module.exports = `)
* All subroutines are seperated as functions including **Checks** and **Data conversions** and handled in `helper` folder
* Saves user information to MongoDB.

#### Front-End:
### installation:
front-end:
```sh
cd modash/client/modash
$ npm install
$ npm run serve 
```

* Navigate to: http://localhost:8080 to view app

### Root files

| File | Comment
| - | -
| `.babel.config.js` | babel configurations defined here.
| `.gitignore` | Ignoring node_modules
| `package.json` | NPM data including node and npm engine versions

### src/components/Header.vue
* Logic, template and style for header component is found here.
* Header component is found on every other page.

### src/components/UserList.vue
* Template and style for `users list` is found here.
* Displays a message when no User has been added in the DB.
* Imports user list state from store.
* Fires `fetchUsers` action upon creation.

### src/components/Profile.vue
* Logic, template and style for an `user` profile is found here.
* Displays an SVG loading animation when data is being fetched.
* Displays an error message to the UI, upon failure, while fetching a `user`. 
* Fires an action to fetch an `user` when mounted to DOM. 

### src/store/module/UserList.js
* Logic for fetching `users list` is found here.
* Contains user list state, action creators

### src/main.js
* Entry point of view app.
* Contains configurations used by the app, such as store and routing
* Has route definitions defined to be use in(only in) `App.vue` 

### src/App.vue
* Wrapper component for other components.
* Contains default styling used in app.
* Imports other components to be rendered here.

### src/assets/
* Contains images used in the app.
* Has SVG file used as a loading animation during fetching of data from API.

### public/index.html/
* Single HTML file used in the app.
* Contains the div `ID` used by the application to render different views.
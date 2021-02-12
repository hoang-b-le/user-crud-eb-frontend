
# user-crud-eb-frontend

The server code from here has to be running.
https://github.com/hoang-b-le/user-crud-eb-backend/

The project is built with Material  React components.
React-Router-Dom for navigation.
JWT header for authorisation as APIs, however, normal browser cookies also work.

Main libaries used:
- React-Router-Dom
- Material Core
- Axios

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Proxy settings
This is the proxy to the back-end and will be used as the server proxy to connect with the backend.

### `  "proxy": "http://localhost:3000/`

## CRUD User App
This CRUD app allows for Sign In / Sign Up (from the navigation bar).

After Signing in, users can see a user list from the top navigation.

They can delete by tapping on the bin icon. Deleting themselves will log a user out.

They can update users by tapping the edit icon.

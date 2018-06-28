# Simple Todo list

This is a simple todo list, written in javascript, using express for the backend and react/redux for the frontend.
It also can work in offline, thanks to redux-offline.

## Running it

To run it you should start the backend and the frontend.
To start the backend use `npm run debug`
To start the frontend `cd react && npm start`

And visit it at http://localhost:3000

## Configuration

By default development server uses mongodb todolist database at localhost, you can change it with environment variable `DB_URI`

If you are running it in production environment, you should set these environment variables:

```
HSTS = true/false
MONGODB_URI
PORT
SECRET
```

## Offline

To enable service worker, the frontend should be run in production environment.
To run it locally you should build the frontend: `cd react && npm run build`.

And visit it at http://localhost:4000

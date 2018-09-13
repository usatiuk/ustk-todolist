# Simple Todo list

This is a simple todo list, written in javascript, using express for the backend and react/redux for the frontend.
It also can work in offline, thanks to redux-offline.

## Getting started

To run it you should start the backend and the frontend.
You can do it with `npm run dev`

create-react-app proxy will be listening at http://localhost:3000.

## Configuration

By default development server uses mongodb `todolist` database at localhost, you can change it with environment variable `DB_URI`

If you are running it in production environment, you should set these environment variables:

```
HSTS = true/false
DB_URI (or MONGODB_URI)
PORT
SECRET
HOST
```

There is google OAuth support, which can be enabled by setting `GOOGLE_ENABLED` variable to true, however for it to actually work you must also set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

## Offline

To enable service worker, the frontend should be run in production environment.
To run it locally you should build the frontend: `cd react && npm run build`.

Express is listening at http://localhost:4000 and serving the built frontend.

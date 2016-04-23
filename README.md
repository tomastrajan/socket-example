# Socket.io, RxJS example

## How to run
Npm build process should work on all major platforms (Win, OSX, Linux) as is ...

* `npm start` - dev mode
* `npm run build` - build client for production
* `npm run prod` - run in prod mode (you have to run `npm run build` first)

#### Dev build
Dev build contains two separate watchers:
* `webpack -w` - takes cae of the client
* `nodemon .` - takes care of the server

This should enhance development speed because `webpack` does
incremental builds when in watch mode by default.
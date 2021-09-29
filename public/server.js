const jsonServer = require('json-server')
const data = require('./db.json')
const routes = require('./routes.json')

const router = jsonServer.router(data) // Express router
const server = jsonServer.create()       // Express server
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter(routes))
server.use(router)

// Avoid CORS issue
server.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(9538, () => {
  console.log('JSON Server is running')
})

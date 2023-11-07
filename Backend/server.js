const http = require("https");
const app = require("./app");
const fs = require('fs');

//used to ensure the port is a valid port number
const normalizedPort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

//method to detect the error type then gracefully exit the server and log the error
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " reqires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// //used to log that the server is now listening to a port
// const onListening = () => {
//   const addr = server.address();
//   const bind = typeof port === "string" ? "pipe " + port : "port " + port;
//   debug("Listening on " + bind);
// };

const port = normalizedPort(process.env.PORT || "3000");
app.set("port", port);

// const server = http.createServer(app);

const server = http.createServer({
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
},app);

server.on("error", onError);
//server.on("listening", onListening);
server.listen(port);

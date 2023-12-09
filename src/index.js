const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const urlObject = new URL(request.url, `http://${hostname}:${port}`);
  const queryObject = urlObject.searchParams;

  if (urlObject.pathname === "/users") {
    const users = getUsers();

    if (users) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(users);
    } else {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Internal Server Error");
    }
  } else if (queryObject.has("hello")) {
    const name = queryObject.get("hello");
    const users = getUsers();

    if (users) {
      const parsedUsers = JSON.parse(users);
      const user = parsedUsers.find(
        (user) => user.name.toLowerCase() === name.toLowerCase()
      );

      if (user) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.end(`hello, ${user.name}`); 
      } else {
        response.statusCode = 400;
        response.setHeader("Content-Type", "text/plain");
        response.end("Bad Request: user not found");
      } 
    } else if (queryObject.get("hello") === undefined) {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Bad Request: enter a name");
    } else {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("internal server error");
    }
  } else if (queryObject.toString() === "") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end("Hello, world!");
  } else {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Internal Server Error");
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});

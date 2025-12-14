const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log("Requested:", req.url);

  // ✅ Serve CSS
  if (req.url === "/style.css") {
    const cssPath = path.join(__dirname, "style.css");
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("CSS not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
    return;
  }

  // ✅ Serve HTML
  let filePath = path.join(__dirname, "pages");
  let statusCode = 200;

  if (req.url === "/" || req.url === "/home") {
    filePath = path.join(filePath, "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(filePath, "about.html");
  } else if (req.url === "/contact") {
    filePath = path.join(filePath, "contact.html");
  } else {
    filePath = path.join(filePath, "404.html");
    statusCode = 404;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

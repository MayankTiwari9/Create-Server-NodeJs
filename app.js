const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Mayank Tiwari");
  // res.end("Mayank Tiwari");
  // console.log(req.url, req.method, req.headers);

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    const content =  fs.readFileSync('message.txt', {encoding: 'utf-8'});
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      `<body><h1>${content}</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`
    );
    res.write("</html>");

    
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  if (url === "/home") {
    res.write("<html>");
    res.write("<head><title> My home page</title></head>");
    res.write("<body><h1>Welcome home</h1></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/about") {
    res.write("<html>");
    res.write("<head><title> My about page</title></head>");
    res.write("<body><h1>Welcome to About Us page</h1></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/node") {
    res.write("<html>");
    res.write("<head><title> My node page</title></head>");
    res.write("<body><h1>Welcome to my Node Js project</h1></body>");
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My first page</title></head>");
  res.write("<body><h1>Hello form my Node.Js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

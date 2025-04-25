const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.headers);
    console.log(req.url);
    console.log(url.parse(req.url, true).query.id);
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write("<h1>Welcome to Node</h1>");
    res.end();
});

server.listen(8000, () => {
    console.log("Server started at port 8000.");
    
})
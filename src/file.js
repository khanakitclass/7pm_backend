const fs = require("fs");

fs.mkdir("./src/data", {recursive: true}, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("Directory created.");
});

fs.writeFile("./src/data/demo.txt", "ok", (err) => {
    if (err) {
        console.log(err);
    }

    console.log("File written successfully.");
    
});

fs.appendFile("./src/data/demo.txt", "done", (err) => {
    if (err) {
        console.log(err);
    }

    console.log("File written successfully.");
    
});

fs.readFile("./src/data/demo.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }

    console.log(data);    
});

fs.unlink("./src/data/demo.txt", (err) => {
    if (err) {
        console.log(err);
    }

    console.log("File deleted successfully"); 
})


const path = require("path");

console.log(__dirname);

console.log(__filename);

console.log(path.basename(__dirname));

console.log(path.basename(__filename));

console.log(path.extname(__filename));

console.log(path.join("public/assets/", "images", "kk"));

console.log(path.resolve("src/public/assets/", "images", "mm"));

console.log(path.parse(__filename));







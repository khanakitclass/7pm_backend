const multer = require("multer")
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("dddddd", file);

        const filePath = path.join("public", file.fieldname);

        console.log(filePath);

        const ext = path.extname(file.originalname).toLowerCase();

        console.log(ext);


        if (!(ext === '.png' || ext === '.jpeg')) {
            return cb(new Error("Only png or jpeg file allowed."))
        }


        // fs.mkdir(filePath, {recursive: true}, (err) => {
        //     if (err) {
        //         console.log(err);
        //     }


        // })

        // cb(null, filePath);

        const tmpPath = path.join(__dirname, '..', 'tmp');
        fs.mkdirSync(tmpPath, { recursive: true });
        cb(null, tmpPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        console.log(uniqueSuffix);

        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;
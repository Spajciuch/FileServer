"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 5000;
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));
app.get("/", (req, res) => {
    res.json({
        status: 200,
        working: true
    });
});
app.get("/file/:path", (req, res) => {
    const rawPath = req.params.path;
    const realPath = "/files/" + rawPath.split("+").join("/");
    const absolutePath = (__dirname + realPath).split("\\").join("/").replace("/dist", "");
    console.log(absolutePath);
    if (fs.existsSync(absolutePath)) {
        const stat = fs.statSync(absolutePath);
        const file = fs.readFileSync(absolutePath);
        // res.writeHead(200, {
        //     'Content-Type': 'file',
        //     'Content-Length': stat.size
        // })
        // const readStream = fs.createReadStream(absolutePath)
        res.sendFile(absolutePath);
    }
    else {
        res.json({ error: "File doesn't exists." });
    }
    res.status(200);
});
app.post("/upload/:path/", (req, res) => {
    const rawPath = req.params.path;
    const realPath = "./files/" + rawPath.split("+").join("/");
    const fileData = req.body.file;
    const imageURL = req.body.image;
    if (fileData) {
        fs.writeFileSync(realPath, fileData);
    }
    if (imageURL) {
        const bff = new Buffer(imageURL.split(",")[1], 'base64');
        fs.writeFileSync(realPath, bff);
    }
    res.redirect("/");
});
app.listen(PORT, () => {
    console.log(`[server] Listening on port ${PORT}. Have a nice day`);
});
//# sourceMappingURL=server.js.map
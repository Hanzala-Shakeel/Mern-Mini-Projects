const express = require("express");

const app = express();

const fs = require("fs");

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hey hanzala");
})

app.post("/post", (req, res) => {
    const { title, detail } = req.body;

    console.log("Received:", title, detail);

    fs.writeFile(`./files/${title.split(" ").join("")}.txt`, detail, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error writing file");
        }

        console.log("File written successfully");
        res.status(200).json("File written successfully");
    });
});

app.get("/get", (req, res) => {
    fs.readdir("./files", (err, files) => {
        if (err) {
            console.error("Error reading folder:", err);
            return res.status(500).send("Error reading folder");
        }
        console.log("Read folder done:", files);
        res.json({ files });
    });
})

app.get("/filepage/:filename", (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, "utf-8", (err, data) => {
        console.log("data", data);
        res.json({ filename, data });
    })
})

app.get("/edit/:editfilename", (req, res) => {
    const editfilename = req.params.editfilename;
    fs.readFile(`./files/${editfilename}`, "utf-8", (err, data) => {
        console.log("data", data, editfilename);
        res.json({ editfilename, data });
    })
})

app.post("/edit/:editfilename", (req, res) => {
    const editfilename = req.params.editfilename;
    const newName = req.body.title;
    fs.rename(`./files/${editfilename}`, `./files/${newName}`, (err, data) => {
        console.log("data", data, editfilename);
        res.json(`file ${editfilename} to ${newName}`);
    })
})

app.delete("/delete", (req, res) => {
    const deleteFileName = req.body.filename;

    fs.unlink(`./files/${deleteFileName}`, (err) => {
        res.json(`file ${deleteFileName} is successfully deleted`);
    })
})


app.listen(3000, () => {
    console.log("server is running on 3000");
})
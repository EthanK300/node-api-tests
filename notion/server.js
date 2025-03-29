require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (request, response) {
    response.sendFile(__dirname + "public/index.html");
});

const PORT = process.env.PORT;
const IP = process.env.IP;

const listener = app.listen(PORT, IP, () => {
    console.log(`server on port ${PORT} on ip ${IP}`);
});

app.post("/databases", async function (request, response) {
    const pageId = process.env.NOTION_PAGE_ID;
    console.log(request.body);
    const title = request.body.data;

    try {
        // Notion API request!
        const newDb = await notion.databases.create({
            parent: {
                type: "page_id",
                page_id: pageId,
            },
            title: [
                {
                    type: "text",
                    text: {
                        content: title,
                    },
                },
            ],
            properties: {
                Name: {
                    title: {},
                },
            },
        });
        response.json({ message: "success!", data: newDb });
        console.log("success creating test db");
    } catch (error) {
        response.json({ message: "error", error });
        console.log("error" + error);
    }
});

app.get("/trigger", async function(req, res) {
    console.log("notion reflection page data:");
    const blockId = process.env.NOTION_REFLECT_ID;
    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    });
    console.log("----------------------------------------------------");
    console.log(response.object);
    //each block right now is 14 size
    const blockSize = 14;
    const numToTop = 3;
    for(let i = numToTop; i < response.results.length; i+=blockSize){
        console.log(response.results[i].type);
    }
    res.status(200).send({
        success:true,
        message:"ok",
    });
});

app.get("/test.html", async function(req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "test.html"));
    console.log("successfully sent test html");
});

app.get("/test.css", async function(req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "test.css"));
    console.log("successfully sent test css");
});
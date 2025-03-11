require("dotenv").config();
const express = require("express");
const app = express();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

app.use(express.static("public"));

app.get("/", function(request, response) {
    response.sendFile(__dirname + "public/index.html");
});

const PORT = process.env.PORT;
const IP = process.env.IP;

const listener = app.listen(PORT, IP ,() => {
    console.log(`server on port ${PORT} on ip ${IP}`);
});
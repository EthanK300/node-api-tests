require("dotenv").config();
console.log(process.cwd());

const api_key = process.env.API_KEY;


const url = "https://api.marketstack.com/v1/eod?access_key=" + api_key + "&symbols=AAPL";
console.log(url);

const options = {
    method: "GET",
};

async function getData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getData();
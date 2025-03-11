const createButton = document.getElementById("newitem");
const getterButton = document.getElementById("getinfo");
const createArea = document.getElementById("text");
const getArea = document.getElementById("content");

createButton.onclick = async function (event) {
    event.preventDefault();
    if(createArea.value == ""){
        alert("must enter value");
    }else{
        const data = createArea.value;
        const body = JSON.stringify({data});
        console.log(body);
        const newResponse = await fetch("/databases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });
        const newData = await newResponse.json();
        printAPIResponse(newData);
    }
}

function printAPIResponse(apiObj) {
    
}
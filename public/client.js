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
        const newResponse = await fetch()
    }
}
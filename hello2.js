import {PS} from "./hello.js"


var para = document.getElementById("hello");
var button = document.getElementById("sh");

function showhello() {
    para.style.display = 'block';
    PS["Main"].main();
}

button.addEventListener("click", showhello);
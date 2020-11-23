const purescript = require("./src/Main.purs")


var para = document.getElementById("hello");
var button = document.getElementById("sh");

function showhello() {
    para.style.display = 'block';
    purescript.main();
}

button.addEventListener("click", showhello);
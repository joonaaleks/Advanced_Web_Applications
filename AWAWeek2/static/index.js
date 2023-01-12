//Declares where the data is send from the input field when the button is pressed
if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }

function initializeCode() {

    const addToListBtn = document.getElementById("submit-data");

    addToListBtn.addEventListener("click", function() {
        const inputfield = document.getElementById("input-text");

        fetch("http://localhost:3000/list", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "list": "' + inputfield.value + '" }'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

    });
}
let advancedOptions=document.querySelectorAll(".adv-option-button");
const increaseTextSizeButton = document.getElementById("increaseTextSize");
const decreaseTextSizeButton = document.getElementById("decreaseTextSize");
const textArea = document.getElementById("textArea");
const cutButton = document.getElementById("cutButton");
const toolbar = document.getElementsByClassName("insert");
const uploadButton = document.getElementById("upload");


function formatText(command, value=null){
    document.execCommand(command,false,value);
}
function undo(){
    document.execCommand('undo');
}
function redo(){
    document.execCommand('redo');
}
function fColor(color) {
    document.execCommand( "foreColor", false, color );   
}
//main logic for colors
const modifyText=(command,defaultUi,value)=>{
    //elecutes command on selected text
    document.execCommand(command,defaultUi,value);
};


increaseTextSizeButton.addEventListener("click", () => {
    const currentFontSize = parseFloat(getComputedStyle(textArea).fontSize);
    textArea.style.fontSize = (currentFontSize + 2) + "px";
});
  
decreaseTextSizeButton.addEventListener("click", () => {
    const currentFontSize = parseFloat(getComputedStyle(textArea).fontSize);
    textArea.style.fontSize = (currentFontSize - 2) + "px";
});
  

//for changing required parameters
advancedOptions.forEach((button)=>{
    button.addEventListener("change",()=>{
        modifyText(button.id,false,button.value);
    });
});


//save function
document.getElementById('save').addEventListener('click', function() {
    var text = document.getElementById('textArea').innerText;
    var blob = new Blob([text], {type: 'application/msword'});
    saveAs(blob, 'document.doc');
});

// FileSaver.js library function
function saveAs(blob, fileName) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

//copy button

document.getElementById("copyButton").addEventListener("click", function() {
    var textArea = document.querySelector("#textArea");
    var range = document.createRange();
    range.selectNode(textArea);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  });


  //cut button
cutButton.addEventListener("click", async () => {
  try {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      await navigator.clipboard.writeText(selectedText);
      console.log('Content copied to clipboard');
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
});

//insert an image
// Add event listener to upload button
uploadButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  // Add event listener to input
  input.addEventListener("change", () => {
    const file = input.files[0];
    const reader = new FileReader();

    // Add event listener to reader
    reader.addEventListener("load", () => {
      const img = document.createElement("img");
      img.src = reader.result;
      textArea.appendChild(img);
    });

    // Read file
    reader.readAsDataURL(file);
  });

  // Open file picker
  input.click();
});

// Add event listener to toolbar buttons
toolbar.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const command = e.target.id;
    document.execCommand(command);
  }
});


//table
function insertTable(){
    console.log('insert table');
    const rows = prompt('Enter the number of rows:');
    const cols = prompt('Enter the number of columns:');

    if (rows && cols) {
        createTable(rows, cols);
    }
};
function createTable(rows, cols) {
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('td');
        cell.innerHTML = ``;
        row.appendChild(cell);
    }

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    textArea.appendChild(table);
}


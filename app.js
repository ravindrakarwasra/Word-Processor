let advancedOptions=document.querySelectorAll(".adv-option-button");
const increaseTextSizeButton = document.getElementById("increaseTextSize");
const decreaseTextSizeButton = document.getElementById("decreaseTextSize");
const textArea = document.getElementById("textArea");
const cutButton = document.getElementById("cutButton");

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

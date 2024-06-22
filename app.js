let advancedOptions=document.querySelectorAll(".adv-option-button");
const increaseTextSizeButton = document.getElementById("increaseTextSize");
const decreaseTextSizeButton = document.getElementById("decreaseTextSize");
const textArea = document.getElementById("textArea");
const cutBtn = document.getElementById('cutBtn');
const toolbar = document.getElementsByClassName("insert");
const uploadButton = document.getElementById("upload");
const loadDocButton=document.getElementById('loadDocButton');
const counter = document.getElementById('count');
const colorButton=document.getElementById('colorButton');
const colorInput=document.getElementById('colorInput');
const searchButton = document.getElementById('searchButton');
const replaceButton=document.getElementById('replaceButton');
const addBorderButton = document.getElementById('addBorderButton');
const font_col=document.getElementById('f_col_button');
const highlighter=document.getElementById('highlighter');
const backColor=document.getElementById('backColor')
const foreColor=document.getElementById('foreColor');


//searchButton
searchButton.addEventListener('click', () => {
  const searchTerm = prompt('Enter a word to search:');
  const text = textArea.innerText;
  const regex = new RegExp(searchTerm, 'gi');
  const newText = text.replace(regex, `<span class="highlight">${searchTerm}</span>`);
  textArea.innerHTML = newText;
});
//replaceButton
replaceButton.addEventListener('click', () => {
  const searchTerm = prompt('Enter a word to search and replace:');
  const replaceTerm = prompt('Enter a word to replace with:');
  const text = textArea.innerText;
  const regex = new RegExp(searchTerm, 'gi');
  const newText = text.replace(regex, `<span class="highlight">${replaceTerm}</span>`);
  textArea.innerHTML = newText;
});
//count the number of words present in the textArea 
textArea.addEventListener('input', () => {
  const letters = textArea.textContent;
  const words = letters.split(/\s+/);
  const wordCount = words.filter(word => word!== '').length;
  counter.textContent = `Words: ${wordCount}`;
});
//addButton
addBorderButton.addEventListener('click',()=>{
  const borderWidth=prompt("Enter Border Width:")
  const borderColor=prompt("Enter Border Color:")
  const borderStyle=prompt("Enter Border Style:") 
  if(borderWidth && borderColor && borderStyle ){
      textArea.style.border=`${borderWidth}px ${borderStyle} ${borderColor}`
      textArea.classList.add('border-added')
  }
})
//background color change
colorButton.addEventListener('click',()=>{
  colorInput.click()
})
colorInput.addEventListener('input',(e)=>{
  const selectedColor=e.target.value;
  textArea.style.backgroundColor=selectedColor;
})
//font color and highlight button
font_col.addEventListener('click',()=>{
  foreColor.click()
})
highlighter.addEventListener('click',()=>{
  backColor.click()
})
//formatText command
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
//open file btn function
loadDocButton.addEventListener('click',() =>{
    const input=document.createElement('input');
    input.type='file';
    input.accept='.doc';
    input.addEventListener('change',()=>{
      const file=input.files[0];
      const reader= new FileReader();
      reader.addEventListener('load',()=>{
        const text=reader.result;
        textArea.textContent=text;
      });
      reader.readAsText(file);
    });
    input.click();
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
cutBtn.addEventListener('click', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const cutText = selectedText;
      navigator.clipboard.writeText(cutText);
      document.execCommand('delete');
    }
});
//paste button
document.getElementById("pasteButton").addEventListener("click", () => {
    navigator.clipboard.readText().then(text => {
      document.getElementById("textArea").focus();
      document.execCommand("insertText", false, text);
    });
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
function landscape(){
  textArea.style.width="842px"
  textArea.style.minHeight="700px"
  textArea.style.height="auto"
  textArea.style.marginLeft="340px"
}
function portrait(){
  textArea.style.width="595px"
  textArea.style.minHeight="842px"
  textArea.style.height="auto"
  textArea.style.marginLeft="445px"
}
function margin(){
  const top=prompt("Enter Top Margin:")
  const left=prompt("Enter Left Margin:")
  const right=prompt("Enter Right Margin:")
  const bottom=prompt("Enter Bottom Margin:")
  textArea.style.paddingTop=`${top}px`;
  textArea.style.paddingLeft=`${left}px`;
  textArea.style.paddingRight=`${right}px`;
  textArea.style.paddingBottom=`${bottom}px`;
} 
function letter(){
  textArea.style.minHeight="1056px"
  textArea.style.height="auto"
  textArea.style.width="816px"
  textArea.style.marginLeft="340px"
}
function tabloid(){
  textArea.style.minHeight="1224px"
  textArea.style.height="auto"
  textArea.style.width="792px"
  textArea.style.marginLeft="360px"
}
function legal(){
  textArea.style.minHeight="1008px"
  textArea.style.height="auto"
  textArea.style.width="612px"
  textArea.style.marginLeft="410px"
}
function a3(){
  textArea.style.minHeight="1191px"
  textArea.style.height="auto"
  textArea.style.width="842px"
  textArea.style.marginLeft="330px"
}
function a4(){
  textArea.style.minHeight="842px"
  textArea.style.height="auto"
  textArea.style.width="595px"
  textArea.style.marginLeft="420px"
}
function a5(){
  textArea.style.minHeight="595px"
  textArea.style.height="auto"
  textArea.style.width="420px"
  textArea.style.marginLeft="530px"
}
//link insertion
function link(){
  var selection=window.getSelection();
  if(selection.rangeCount>0){
      var range=selection.getRangeAt(0)
      var link=document.createElement('a')
      link.href=prompt("Enter the link:")
      link.textContent=range.toString()
      range.deleteContents()
      range.insertNode(link)
  }
}
functions savePdf(){
  const printWindow = window.open('','','height=auto','width=auto')
printWindow.document.write(textArea.outerHTML)
printWindow.document.close()
print window.print()
}
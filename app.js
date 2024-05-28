function formatText(command, value=null){
    document.execCommand(command,false,value);
}
function undo(){
    document.execCommand('undo');
}

function redo(){
    document.execCommand('redo');
}


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
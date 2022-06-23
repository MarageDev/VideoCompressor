let btnVideoPathBrowse = document.querySelector('#btnBrowseInputFile');
let inputVideoTextBar = document.querySelector('#inputVideoTextBar');
let videoName = document.querySelector('#videoName');
let test = document.querySelector('#test');
let videoSize = document.querySelector('#videoSize');
let videoLength = document.querySelector('#videoLength');
let videoResolution = document.querySelector('#videoResolution');
let btnCompressFile = document.querySelector('#btnCompressFile')

let btnClose = document.querySelector('#close')
let btnMinimize = document.querySelector('#minimize')


const {ipcRenderer} = require('electron')
const ipc = ipcRenderer
const { PythonShell} = require("python-shell")
    

let inputVideoPath   = ""
let outputVideoPath  = ""
let targetVideoSize  = ""







/*
btnVideoPathBrowse.addEventListener('click', () =>{
    // window.open("C:/");
    console.log('opened file explorer');
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp4, .avi, .mkv, .mov, .gif, .wmv, .qt'
    input.onchange = e => { 

       // getting a hold of the file reference
       var file = e.target.files[0]; 

       // setting up the reader
       var reader = new FileReader();
       reader.readAsText(file,'UTF-8');

       // here we tell the reader what to do when it's done reading...
       reader.onload = readerEvent => {
          var content = readerEvent.target.result; // this is the content!
          console.log( content );

          videoName.innerHTML = file.name;
          let displayedSize = Number(file.size/Math.pow(10,6)).toFixed(3);
          videoSize.innerHTML = displayedSize + " Mb";
          inputVideoTextBar.value = file.path;
       }
    }
    input.click();
})*/

btnClose.addEventListener('click', () =>{
   ipc.send('closeApp')
})
btnMinimize.addEventListener('click', () =>{
   ipc.send('minimizeApp')
})
/*    //Not Maximizable
btnMaximize.addEventListener('click', () =>{
   ipc.send('maximizeApp')
})*/
function openInputFileExplorer(){
   let videoSize = document.querySelector('#videoSize');
   let inputVideoTextBar = document.querySelector('#inputVideoTextBar');
   let videoName = document.querySelector('#videoName');

   console.log('opened file explorer');
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp4, .avi, .mkv, .mov, .gif, .wmv, .qt'
    input.onchange = e => { 

       // getting a hold of the file reference
       var file = e.target.files[0]; 

       // setting up the reader
       var reader = new FileReader();
       reader.readAsText(file,'UTF-8');

       // here we tell the reader what to do when it's done reading...
       reader.onload = readerEvent => {
          var content = readerEvent.target.result; // this is the content!
          console.log( content );

          videoName.innerHTML = file.name;
          let displayedSize = Number(file.size/Math.pow(10,6)).toFixed(3);
          videoSize.innerHTML = displayedSize + " Mb";
          inputVideoTextBar.value = file.path;
       }
    }
    input.click();
    console.log('a')
}
function closeWindowFunction(){
   ipc.send('closeApp')
   let test = document.querySelector('#test');
   test.innerHTML = "Test before require";
}
function compress(){
   let test = document.querySelector('#test');
   test.innerHTML = "Test before require";
   
   
   test.innerHTML = "Test after require";
   
   
   let options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python/',
      args: ['value1', 'value2', 'value3']
   };
   
   PythonShell.run('compress.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      
   }) 
}

/*
btnCompressFile.addEventListener('click', () =>{
   test.innerHTML = "Test before require";
   test.innerHTML = "Test after require";
   let options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python/',
      args: ['value1', 'value2', 'value3']
   };
   
   PythonShell.run('compress.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      
   })   
})*/
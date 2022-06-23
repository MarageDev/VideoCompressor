let btnVideoPathBrowse = document.querySelector('#btnBrowseInputFile');
let inputVideoTextBar = document.querySelector('#inputVideoTextBar');
let videoName = document.querySelector('#videoName');
let test = document.querySelector('#test');
let videoSize = document.querySelector('#videoSize');
let videoLength = document.querySelector('#videoLength');
let videoResolution = document.querySelector('#videoResolution');
let btnCompressFile = document.querySelector('#btnCompressFile')
let btnOutputVideoPath = document.querySelector('#btnBrowseOutputfile')

//    PRESETS OPTIONS
let EightMbOptionSelector = document.querySelector('#EightMbOptionSelector')
let FiftyMbOptionSelector = document.querySelector('#FiftyMbOptionSelector')
let HundredMbOptionSelector = document.querySelector('#HundredMbOptionSelector')


//    TOP BAR BUTTONS
let btnClose = document.querySelector('#close')
let btnMinimize = document.querySelector('#minimize')

//    REQUIRES
const {ipcRenderer} = require('electron')
const ipc = ipcRenderer
const { PythonShell} = require("python-shell")


const spawner = require('child_process').spawn;
let python_process = spawner('python', ['./main.py'])
function sendEvent (name, args){
   // Define the array and add the default values
   spawnerArgs = ['./main.py', `${name}`]

   // Check if the event contains arguments
   if(typeof args  !== 'undefined' ){
       // Add every arguments to the array "spawnerArgs"
       args.forEach(element => {
           spawnerArgs.push(element)
       });
   }else{
       // If it doesn't contain any arguments, do nothing
       console.log("Doesn't possess args")
   }

   // Add the event and its arguments from "spawnerArgs" and the receive part
   python_process = spawner('python', spawnerArgs)
   python_process.stdout.on('data', (data) => {
       console.log('Data received from python :', data.toString())
   })
}




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

function openOutputFileExplorer(){
   let outputVideoTextBar = document.querySelector('#outputVideoTextBar');
   test.innerHTML = "opened the output browse"

    var input1 = document.createElement('input');
    input1.type = 'file';
    input1.accept = '' //why not
    input1.onchange = e => { 

       // getting a hold of the file reference
       var file = e.target.files[0]; 

       // setting up the reader
       var reader = new FileReader();
       reader.readAsText(file,'UTF-8');

       // here we tell the reader what to do when it's done reading...
       reader.onload = readerEvent => {
          var content = readerEvent.target.result; // this is the content!
          console.log( content );
          outputVideoTextBar.value = file.path;
       }
    }
    input1.click();
}

function closeWindowFunction(){
   ipc.send('closeApp')
   let test = document.querySelector('#test');
   test.innerHTML = "Test before require";
}
function updateOutputSizeText(value){
   let outputSizeSlider = document.querySelector('#outputSizeSlider');
   let outputSizeText = document.querySelector('#outputSizeText');
   outputSizeText.innerHTML = outputSizeSlider.value.toString()
}

var outputSizeSlider = document.querySelector('#outputSizeSlider');
var outputSizeText = document.querySelector('#outputSizeText');

outputSizeSlider.onchange = function(){
   outputSizeText.value = this.value;
}
outputSizeText.onchange = function(){
   outputSizeSlider.value = outputSizeText.value
}


function compress(){
   let test = document.querySelector('#test');
   test.innerHTML = "Test before require";
   
   let inputVideoTextBar = document.querySelector('#inputVideoTextBar');
   let outputVideoTextBar = document.querySelector('#outputVideoTextBar');
   let outputSizeSlider = document.querySelector('#outputSizeSlider');
   let outputSizeText = document.querySelector('#outputSizeText');
   test.innerHTML = "Test after require";
   inputVideoPath = inputVideoTextBar.value
   outputVideoPath = outputVideoTextBar.value
   outputSize = outputSizeText.value

   
   let options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python/',
      args: [inputVideoPath, outputVideoPath, outputSize]
   };
   
   PythonShell.run('compress.py', options, function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      
   }) 
   // sendEvent('CreateNewCustomFile', ['Magic Note','This is the event named : ','CreateNewCustomFile'])
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
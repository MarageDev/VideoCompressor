let btnVideoPathBrowse = document.querySelector('#btnBrowseInputFile');
let inputVideoTextBar = document.querySelector('#inputVideoTextBar');
let outputVideoTextBar = document.querySelector('#outputVideoTextBar');
let inputVideoPreview = document.querySelector('#inputVideoPreview')
let btnOutputVideoPath = document.querySelector('#btnBrowseOutputfile')

let videoName = document.querySelector('#videoName');

let videoSize = document.querySelector('#videoSize');
let videoLength = document.querySelector('#videoLength');
let videoResolution = document.querySelector('#videoResolution');

//    COMPRESS BUTTON 
let buttonCompressText = document.querySelector('#buttonCompressText');
let btnCompressFile = document.querySelector('#btnCompressFile')

//    PRESETS OPTIONS
let EightMbOptionSelector = document.querySelector('#EightMbOptionSelector')
let FiftyMbOptionSelector = document.querySelector('#FiftyMbOptionSelector')
let HundredMbOptionSelector = document.querySelector('#HundredMbOptionSelector')


let outputSizeSlider = document.querySelector('#outputSizeSlider');
let outputSizeText = document.querySelector('#outputSizeText');

//    TOP BAR BUTTONS
let btnClose = document.querySelector('#close')
let btnMinimize = document.querySelector('#minimize')

//    REQUIRES
const {ipcRenderer} = require('electron')
const ipc = ipcRenderer
const { PythonShell} = require("python-shell")
const fs = require("fs");
const nodeConsole = require('console');
const eConsole = new nodeConsole.Console(process.stdout, process.stderr);
const ffmpeg = require('ffmpeg.js');
const { stdin } = require('process');


/*    ANOTHER VERSION I DID IN JsToPy BUT NOT USED
const spawner = require('child_process').spawn;
let python_process = spawner('python', ['./main.py'])
function sendEvent (name, args){
   // Define the array and add the default values
   spawnerArgs = ['./resolution.py', `${name}`]

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
*/

//    CHECK COMPRESSION POSSIBILITY
function checkCompressionPossibility(){
   let isOutputExisting = fs.existsSync(outputVideoTextBar.value.toString())
   let isInputExisiting =  fs.existsSync(inputVideoTextBar.value.toString())
   
   //    CONDITIONS TO ENABLE THE COMPRESSION BUTTON
   if(isInputExisiting == true && isOutputExisting == true && outputSizeText.value != 0 && outputSizeText.value < videoSize.innerHTML){   
      return btnCompressFile.disabled = false
   }else{
      return btnCompressFile.disabled = true
   }
}

async function tick(){
   checkCompressionPossibility()
}
var interval = setInterval(function(){tick()},1);



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
function getVideoResolution(absolutePath){
   var ffprobe = require('ffprobe')
   var ffprobeStatic = require('ffprobe-static');
 
   ffprobe(absolutePath, { path: ffprobeStatic.path }, (err, info) => {
      if (err) {
         return console.log(err);
      }else{
         let cleanInfo = JSON.stringify(info['streams'])
         let data = JSON.parse(cleanInfo)
         eConsole.log(data[0].width);
         return data[0].width//, data[0].height
      }
   })
}


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



          var ffprobe = require('ffprobe')
          var ffprobeStatic = require('ffprobe-static');
         var videoWidth = 0
          ffprobe(file.path, { path: ffprobeStatic.path }, (err, info) => {
             if (err) {
                return console.log(err);
             }else{
                let cleanInfo = JSON.stringify(info['streams'])
                let data = JSON.parse(cleanInfo)
                eConsole.log(data[0].width+" x "+data[0].height);
                eConsole.log(data[0].duration)
                new Date(data[0].duration * 1000).toISOString().substr(11, 8);
                videoResolution.innerHTML = data[0].width.toString()+" x "+data[0].height.toString()
                videoLength.innerHTML = new Date(data[0].duration * 1000).toISOString().substr(11, 8);
                inputVideoPreview.src=file.path;
                inputVideoPreview.style.maxWidth = '100%'

                /*
                ffmpeg({
                     //mounts: [{type: "NODEFS", opts: {root: "."}, mountpoint: "/data"}],
                     //arguments: ["-i", file.path.toString(), "-vcodec", "mpeg", "-vframes", "1", "-an", "-f", "rawvideo","-s","200x150","D:/Documents/Github/VideoCompressor/Videos/vide.jpg"],
                        //arguments: ["-i", file.path, "-vframes","1","-an","-s","480x360","-ss","D:/Documents/Github/VideoCompressor/Videos/video.mp4"]
                        arguments: ["-i", file.path,"-ss","00:00:01.000","-vframes","1","D:/Documents/Github/VideoCompressor/Videos/vide.png"]
                  })
                //ffmpeg -itsoffset -1 -i /path/to/hello.avi -vcodec mjpeg -vframes 1 -an -f rawvideo -s 200x150 /path/to/hello.jpg*/
             }
          })
       }
    }
    input.click();
    checkCompressionPossibility()
    console.log('a')
}

function openOutputFileExplorer(){
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
    checkCompressionPossibility()
}

inputVideoTextBar.onchange = function(){
   // let options = {
   //    mode: 'text',
   //    pythonOptions: ['-u'],
   //    scriptPath: './python/',
   //    args: [inputVideoPath]
   // };
   // pyshell.run('res.py', options, function (err, results) {
   //    if (err) throw err;
   //    eConsole.log('results: %j', results);
      
   // }) D:\Documents\Github\VideoCompressor\2022-05-10 19-45-21.mp4
   
}




function closeWindowFunction(){
   ipc.send('closeApp')
}


outputSizeSlider.oninput = function(){
   outputSizeText.value = this.value;
   EightMbOptionSelector.checked = false
   FiftyMbOptionSelector.checked = false
   HundredMbOptionSelector.checked = false
}
outputSizeText.onchange = function(){
   outputSizeSlider.value = outputSizeText.value;
   EightMbOptionSelector.checked = false;
   FiftyMbOptionSelector.checked = false;
   HundredMbOptionSelector.checked = false;
}

//    PRESETS RADIO BUTTONS
EightMbOptionSelector.onchange = function(){
   outputSizeSlider.value = '8'
   outputSizeText.value = outputSizeSlider.value;
   FiftyMbOptionSelector.checked = false
   HundredMbOptionSelector.checked = false
}
FiftyMbOptionSelector.onchange = function(){
   outputSizeSlider.value = '50'
   outputSizeText.value = outputSizeSlider.value;
   EightMbOptionSelector.checked = false
   HundredMbOptionSelector.checked = false
}
HundredMbOptionSelector.onchange = function(){
   outputSizeSlider.value = '100'
   outputSizeText.value = outputSizeSlider.value;
   EightMbOptionSelector.checked = false
   FiftyMbOptionSelector.checked = false
}


function compress(){
   
   let inputVideoTextBar = document.querySelector('#inputVideoTextBar');
   let outputVideoTextBar = document.querySelector('#outputVideoTextBar');
   //let outputSizeSlider = document.querySelector('#outputSizeSlider');
   let outputSizeText = document.querySelector('#outputSizeText');
   inputVideoPath = inputVideoTextBar.value
   outputVideoPath = outputVideoTextBar.value
   outputSize = outputSizeText.value

   let outputDirectory = outputVideoPath.toString()//.substring(0, outputVideoPath.toString().length-videoName.innerHTML.toString().length+1)
   let compressedVideoOutputDirectory = outputDirectory+"Compressed_"+videoName.innerHTML.toString()
   eConsole.log(compressedVideoOutputDirectory)
   let options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python/',
      args: [inputVideoPath, outputVideoPath, outputSize, compressedVideoOutputDirectory]
   };

   //eConsole.log(args[1]+"Compressed_"+args[3].toString());
   eConsole.log()
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
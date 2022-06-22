



/**
const spawner = require('child_process').spawn;
let python_process = spawner('python', ['./python/main.py', 'CreateNewCustomFile' ,'Magic Note','This is the event named : ','CreateNewCustomFile'])
python_process.stdout.on('data', (data) => {
   console.log('Data received from python :', data.toString())
   
   
}) */

//PROBLEM HERE
/*
const spawner = require('child_process').spawn;
console.log('a')
let python_process = spawner('python', ['./python/main.py', 'CreateNewCustomFile' ,'Magic Note','This is the event named : ','CreateNewCustomFile'])
console.log('b')
*/
//import {PythonShell} from 'python-shell';



/*
onmessage = function(message){    
   //  python_process.stdout.on('data', (data) => {
   //     console.log('Data received from python :', data.toString())
   //  })
    PythonShell.run(
       'a = "abracadabra'
    )
   postMessage('a')
}*/


const {PythonShell} = require('python-shell')
//node ./js/CompressEvent.js
onmessage = function(message){   
   

   postMessage('a')
   let options = {
   mode: 'text',
   pythonOptions: ['-u'], // get print results in real-time
   scriptPath: './python/',
   args: ['value1', 'value2', 'value3']
   };

   PythonShell.run('compress.py', options, function (err, results) {
   if (err) throw err;
   // results is an array consisting of messages collected during execution
   console.log('results: %j', results);
   postMessage(results)
   });
}
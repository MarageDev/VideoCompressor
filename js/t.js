var ffprobe = require('ffprobe')
var ffprobeStatic = require('ffprobe-static');
 
ffprobe('D:/Documents/Github/VideoCompressor/Videos/video.mp4', { path: ffprobeStatic.path }, (err, info) => {
  if (err) {
    return console.log(err);
  }else{
    let cleanInfo = JSON.stringify(info['streams'])
    let data = JSON.parse(cleanInfo)
  console.log(data[0].width);
  }
})
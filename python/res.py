import os, ffmpeg
import python_shell as pys
import sys

probe = ffmpeg.probe(r'D:\Documents\Github\VideoCompressor\2022-05-10 19-45-21.mp4')
video_streams = [stream for stream in probe["streams"] if stream["codec_type"] == "video"]
f = open('resolution.txt', 'w+')

#   WIDTH
print(f'{video_streams[0]["coded_width"]}')
#   HEIGHT
print(f'{video_streams[0]["coded_height"]}')
resolution = f'{video_streams[0]["coded_width"]} x {video_streams[0]["coded_height"]}'

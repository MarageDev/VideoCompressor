import os, ffmpeg


# Import sys
import sys

# Optional import, it is just present for the demonstration
import random

# Define the name of the event, it's the second argument
event = sys.argv[1]
# Define every arguments after the name of the event in an array
args = sys.argv[2:]

# Add the functions
def CreateFile(fileName, stSentece, ndSentence):
    with open(f'{fileName}.txt', 'w') as f:
        f.write(f'{stSentece} {ndSentence}')
    return print('aa')

# Receive the events sent from the javascript file and assign them an action
if event == 'CreateNewCustomFile':
    output = CreateFile('magic nots','args[1]','args[2]')




def compress_video(video_full_path, output_file_name, target_size):

    min_audio_bitrate = 32000
    max_audio_bitrate = 256000

    probe = ffmpeg.probe(video_full_path)
    # Video duration, in s.
    duration = float(probe['format']['duration'])
    # Audio bitrate, in bps.
    audio_bitrate = float(next((s for s in probe['streams'] if s['codec_type'] == 'audio'), None)['bit_rate'])
    # Target total bitrate, in bps.
    target_total_bitrate = (target_size * 1024 * 8) / (1.073741824 * duration)

    # Target audio bitrate, in bps
    if 10 * audio_bitrate > target_total_bitrate:
        audio_bitrate = target_total_bitrate / 10
        if audio_bitrate < min_audio_bitrate < target_total_bitrate:
            audio_bitrate = min_audio_bitrate
        elif audio_bitrate > max_audio_bitrate:
            audio_bitrate = max_audio_bitrate
    # Target video bitrate, in bps.
    video_bitrate = target_total_bitrate - audio_bitrate

    i = ffmpeg.input(video_full_path)
    
    ffmpeg.output(i, os.devnull,**{'c:v': 'libx264', 'b:v': video_bitrate, 'pass': 1, 'f': 'mp4'}).overwrite_output().run()
    ffmpeg.output(i, output_file_name,**{'c:v': 'libx264', 'b:v': video_bitrate, 'pass': 2, 'c:a': 'aac', 'b:a': audio_bitrate}).overwrite_output().run()
def format_seconds_to_hhmmss(seconds):
    hours = seconds // (60*60)
    seconds %= (60*60)
    minutes = seconds // 60
    seconds %= 60
    time = {
        "h":hours,
        "m":minutes,
        "s":seconds
    }
    return "%02i:%02i:%02i" % (hours, minutes, seconds), time

input_video = input("Input video path :\n")

import ffmpeg
probe = ffmpeg.probe(input_video)
video_streams = [stream for stream in probe["streams"] if stream["codec_type"] == "video"]
print(f'{video_streams[0]["coded_width"]} x {video_streams[0]["coded_height"]}')
print(f'duration : {format_seconds_to_hhmmss(float(video_streams[0]["duration"]))}')


output_video_name = input("Output video name :\n")
output_target_file_size = input("Output video file size in Megabytes :\n")
compress_video(input_video, output_video_name, float(output_target_file_size)*1000)

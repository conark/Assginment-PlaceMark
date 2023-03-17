# Assginment-PlaceMark
Plant Factory Environment Management
greenhouse-g005435a15_1920

Plant Factory - Environment Management
New Agriculture Style
Smart & Sustanable

Due to the population increasing, it is said that a food crisis will occur throughout the world within the near future. In Ireland, a country which relies on importing most of its food, vegetable and fruit farming is not the thriving industry that it is in other countries due to problems with weather and soil. food can be grown anywhere by hydroponics or film cultivation. Plant factories are easier to manage using technology, so we can counter any atypical growing environment to cultivate efficient and clean farming.

Environmental Management with IoT
The environmental control system requires using cameras to monitor and record multiple growth factors such as temperature, humidity, light. Timers indicate when to open and close pipe valves.

Project Diagram
Project Diagram 1 (2)

🧚 Programming languages

Python
Javascript
🧚 Proposed tech – Software

Firebase (Storage, Web hosting)
Blynk (temp, humidity, notification/alarm)
Youtube (Live streaming)
🧚 Proposed tech - Hardware

Raspberry Pi 4B
Sense hat
Raspberry Pi Camera module
USB connect Web camera (Logicool HD720p)
A Box as Factory
Functions
Shine the LED light on the plant - set it to alternate between red and green light every 12 seconds. (Originally every 12 hours)
Measure and display temperature/humidity on Blynk
Feed timing alarm every 12 seconds on Blynk (originally every 12 hours).
Real-time monitoring with Web camera on youtube.
Send a notification/message to the phone if the temp/humidity is outside of expected range.
Schedule for taking photo for Recognition of harvest time
Recognition of harvest time (e.g. if tomato became red)
Web hosting for latest updated photo
Prepareraion
🧚 Rasberry pi

Attach the sense hat, camera module, and webcam (USB port) to the raspberry pi.


Configure the Raspberry Pi to use VS Code with SSH connection.

Raspberry Pi config setting - Camera enable on

🧚 Blynk

Install Blynk Library

Create template



Datastreams setting - Virtual Pin




Create Events






Web dashboad set up (Youtube URL added on Video widget, Datastream setting on Gauge and chart)








download mobile app and set up widget




🧚 Youtube (Live streaming)

Request access to live stream on Youtube Studio
Create Live schedule and get stream key
install FFmpeg on Raspberry pi
🧚 Firebase

install firebase tool to Raspberry pi
Create project on Firebase console


Overview
🌱 temp_humid.py:

To Run type in the command: python3 temp_humid.py

(1) Get temperature and humidity with Sense Hat and communicate with Blynk.

(2) If the temperature is above or below the set temperature, send a logEvent request with a code of either temp_too_high or temp_too_low to the Blynk server. Similarly, if the humidity is above or below the configured humidity, it will send a logEvent request with either the code humidity_too_high or humidity_too_low to the Blynk server. This will notify you via popup and email in the Blynk application.

🌱 schedule_pi.py:

To Run type in the command: python3 schedule_pi.py

It schedules light lighting and light color switch schedule, feeding time alarm, and image capture.

(1) The LED light of the sense hat is set with the python schedule library that it lights up in red or green at a set time.

(2) Capture an image at a set time and automatically save it to Firebase storage using the storeFileFB.py function. During image capture, turn off the lights (there is a white setting if it's dark) and save a color correct photo for color recognition.

(3) Send an HTTP GET request to the URL and send a log event to the API endpoint using Python's requests library to notify the feeding time of water etc. Blynk's Event settings will send push notifications and emails.

🌱 storeFileFB.py

Upload files to Google Cloud Storage and push filenames to Realtime Database

🌱 streaming.py

To Run type in the command: python3 streaming.py

Using Python's subprocess module to run the streaming.sh script

🌱 streaming.sh

A script that uses ffmpeg commands to start YouTube Live streaming. If don't use streaming.py, able to run with ./streaming.sh

🌱 colour_detect.py

To Run type in the command: python3 colour_detect.py

Recognition of harvest time (e.g. if tomato became red)

Send a notification to Blynk if a red color in the latest image.

🌱 Web hosting

👉 firebase-hosting: https://plant-factory-d18f0.web.app/

👉 glitch: https://plant-factory-project.glitch.me/

Use Firebase's Realtime Database and Cloud Storage to get the URL of the latest image and display it

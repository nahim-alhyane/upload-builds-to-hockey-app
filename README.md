# upload build to Hockey App
Upload your apk or ipa file to Hockey APP

# Installation
npm install -g upload-builds-to-hockey-app


## Usage:

You can import this script inside your NodeJS application:

First you need it installed locally:
`npm install upload-builds-to-hockey-app --save-dev`

Once you've done this you can use it in code:

```
var upload = require('upload-builds-to-hockey-app');

upload.uploadToHockey(hockeyAppId, hockeyAppAuthToken, notes, inputFile, callback);

```

"use strict"

const uploadToHockey = require('../lib/upload-builds-to-hockey')

return uploadToHockey.uploadToHockey(hockeyAppId, hockeyAppAuthToken, notes, inputFile, callback)
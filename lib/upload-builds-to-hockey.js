"use strict"

const request = require('request');
const colors = require('colors');
const fs = require('fs');

exports.uploadToHockey = function uploadToHockey(hockeyAppId, hockeyAppAuthToken, notes, inputFile, callback) {

    var uploadToHocker = function (hockeyAppId, hockeyAppAuthToken, notes, inputFile) {

        var options = {
            hockeyAppId: hockeyAppId,
            hockeyAppAuthToken: hockeyAppAuthToken,
            teamList: null,
            notify: true,
            status: 2,
            notes: notes,
            notes_type: 0,
            inputFile: inputFile
        }

        return new Promise(function (resolve, reject) {

            var postOpts = {
                url: 'https://rink.hockeyapp.net/api/2/apps/' + options.hockeyAppId + '/app_versions/upload',
                headers: {
                    'X-HockeyAppToken': options.hockeyAppAuthToken
                },
                formData: {
                    ipa: fs.createReadStream(options.inputFile),
                    notify: 0,
                    status: 2,
                    version: "2",
                    shortversion: "0.2"
                }
            };

            // // Optional team list
            // if (options.teamList && options.teamList.length) {
            //   postOpts.formData.teams = options.teamList.join(',');
            // }

            // // Optional notify
            // if (options.notify) {
            //   postOpts.formData.notify = options.notify;
            // }

            // // Optional status
            // if (options.status) {
            //   postOpts.formData.status = options.status;
            // }

            // // Optional notes
            // if (options.notes) {
            //   postOpts.formData.notes = options.notes;
            // }

            // // Optional notes_type
            // if (options.notes_type) {
            //   postOpts.formData.notes_type = options.notes_type;
            // }

            request.post(postOpts, function (err, response) {
                if (err) {
                    return reject(err);
                }

                else if (response.statusCode != 201) {
                    return reject({
                        status: response.statusCode,
                        body: response.body
                    });
                }

                return resolve(response);
            });

        });
    };

    console.log(`Start sending ${inputFile} to Hockey App...`.gray)

    uploadToHocker(hockeyAppId, hockeyAppAuthToken, notes, inputFile).then(() => {
        console.log(`Finished uploading ${inputFile} to Hockey App`.green)
        if (callback) {
            callback();
        }
    }, (err) => {
        console.log(`An error occurred sending ${inputFile} to Hockey App`.red);
        console.log(err);
    });



}





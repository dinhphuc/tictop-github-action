'use strict';

const axios = require('axios')
const API_URL = process.env.API_URL;
const SENDER_ID = process.env.SENDER_ID;
const COLOR = process.env.COLOR;


if (!process.env.API_KEY) {
    return console.error('API KEY is missing')
}

const pushNotificationToTictop = async () => {

    const commitMessage = process.env.COMMIT_MESSAGE || "";

    if (commitMessage.endsWith("--no-ntf")) {
        console.log("--no-ntf");
        return;
    }
    const title = process.env.TITLE || `GitHub Notification from ${process.env.GITHUB_REPOSITORY}`;

    let textMessage = process.env.MESSAGE || 'No message specified';

    if (commitMessage.endsWith("--msg")) {
        textMessage = `${textMessage} - ${commitMessage.replace('--msg', '')}`
    }


    const notificationData = {
        linkObjects: [
            {
                link: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
                title: title,
                previewData: {
                    description: process.env.DESCRIPTION,
                    domain: process.env.GITHUB_SERVER_URL,
                    imageUrl: `https://github.com/${process.env.GITHUB_ACTOR}.png`,
                    isPreview: true,
                    title: title
                }
            }
        ],
        status: 0,
        text: textMessage || 'No message specified',
    }
    console.log('File: notify.js - L: 47 - COLOR', COLOR);
    console.log('File: notify.js - L: 47 - SENDER_ID', SENDER_ID);

    if (COLOR && SENDER_ID) {
        notificationData['customizes'] = {
            backgroundColor: {
                [SENDER_ID]: {
                    hex: COLOR,
                    isShowAll: process.env.COLOR_IS_SHOW_ALL ?? "true"
                }
            }
        }
    }

    console.log('File: notify.js - L: 61 - notificationData', JSON.stringify(notificationData));
    try {
        await axios.post(`${API_URL}?apiKey=${process.env.API_KEY}`, notificationData, {
            headers: {
                'content-type': 'application/json'
            }
        });
    } catch (err) {
        console.error(err.message);
        return {};
    }
};


pushNotificationToTictop();

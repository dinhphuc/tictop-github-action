'use strict';

const axios = require('axios')
const API_URL = process.env.API_URL;


if (!process.env.API_KEY) {
    return console.error('API KEY is missing')
}

const pushNotificationToTictop = async () => {

    const title = process.env.TITLE || `GitHub Notification from ${process.env.GITHUB_REPOSITORY}`
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
        text: process.env.MESSAGE || 'No message specified',
    }
    console.log('File: notify.js - L: 31 - notificationData ', notificationData);

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

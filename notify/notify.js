'use strict';

const axios = require('axios')
const API_URL = process.env.API_URL;
const SENDER_ID = process.env.SENDER_ID;


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

    if (process.env.COLOR && SENDER_ID) {

        const hex = process.env.COLOR;

        notificationData['customizes'] = {
            [SENDER_ID]: {
                hex: hex,
                isShowAll: process.env.COLOR_IS_SHOW_ALL ?? "true"
            }
        }
    }
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

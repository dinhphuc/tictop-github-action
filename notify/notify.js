'use strict';

const request = require('request')
const API_URL = process.env.API_URL;

const message = {
    body: process.env.MESSAGE || 'No message specified',
    title: process.env.TITLE || `GitHub Notification from ${process.env.GITHUB_REPOSITORY}`
}

if (process.env.LINK) {
    message.link = process.env.LINK;
}

if (!process.env.API_KEY) {
    return console.error('API KEY is missing')
}

console.log("Sending message", JSON.stringify(message))
console.log("Sending message", JSON.stringify(process.env))

request({
    url: `${API_URL}?apiKey=${process.env.API_KEY}`,
    method: 'POST',
    body: message,
    json: true
}, (err, response) => {
    if (err) {
        return console.error(err.toString())
    }
    console.log("Notification sent!", response.body)
})

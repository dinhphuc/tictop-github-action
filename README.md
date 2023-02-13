<img width="200" src="https://www.tictop.vn/wp-content/uploads/2021/08/prod_brand.svg"/>

# Github Action for Push Notification

Receive push notification to your devices using Github Actions

## Pre-requisites

To run this action you'll need:

- An API key from Push (https://www.tictop.app/)

## Setup

1. Create the workflow and choose any event of your choice.
2. Copy and paste the following snippet into your .yml file.

```
- name: Send Push Notification
  uses: dinhphuc/tictop-github-action@main
```
3. Prepare API KEY
 - Request API Key from admin tictop
 - Generate api key include the bellow data
```json
{
  "organizationCode": "ITEAL_VN",
  "organizationId": "1235",
  "userId": "123",
  "groupId": "121",
}
```
4. Add a new secret to environment variable
```json
{
  "API_URL": "API_URL (get from admin tictop)",
  "API_KEY": "API_KEY (get from step 3)",
}
```
4. Commit your changes!

## Sample Workflows

### Send notification on every commit

```yaml
name: Push on commit

on: [ push ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: 🔔 Send Push Notification
        uses: dinhphuc/tictop-github-action@main
        env:
            API_URL: ${{ secrets.API_URL }}
            API_KEY: ${{ secrets.API_KEY }}
            MESSAGE: Deploy to Alpha by @${{ github.actor }} - ${{ steps.ready_site.outputs.result }}
            TITLE: Deploy to Alpha by @${{ github.actor }}
            DESCRIPTION: Deploy to Alpha by @${{ github.actor }}
```

## Support

Feature Request, Bugs and Ideas can be added [here.](https://github.com/dinhphuc/tictop-github-action/issues)

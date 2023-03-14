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
  "groupId": "121"
}
```

4. Add a new secret to environment variable

```json
{
  "API_URL": "API_URL (get from admin tictop)",
  "API_KEY": "API_KEY (get from step 3)"
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
      - name: 🚀 Out put ready site
        id: ready_site
        run: echo "result=Success" >> $GITHUB_OUTPUT

  notification:
    needs: build

    runs-on: ubuntu-latest
    if: always() # set "always"

    steps:
      - name: 🔔 Send Push Notification
        uses: dinhphuc/tictop-github-action@main
        env:
          API_URL: ${{ secrets.API_URL }}
          API_KEY: ${{ secrets.API_KEY }}
          MESSAGE: Deploy to Alpha by @${{ github.actor }} - ${{ (needs.build.result == 'success') && 'Success' || 'Failure' }}
          TITLE: Deploy to Alpha by @${{ github.actor }}
          DESCRIPTION: Deploy to Alpha by @${{ github.actor }}
          COMMIT_MESSAGE: ${{ github.event.head_commit.message }}
          COLOR: "#4cb273"
          SENDER_ID: 123

```

5. Option

Add param to commit message for apply option.

| Option   | Result                                         |
|----------|------------------------------------------------|
| --no-ntf | Skip push notification                         |
| --msg    | Include commit message to content notification |

Add color:

| Value   | Show                                                            |
|---------|-----------------------------------------------------------------|
| #baea9e | ![#baea9e](https://via.placeholder.com/15/baea9e/000000?text=+) |
| #22c55e | ![#22c55e](https://via.placeholder.com/15/22c55e/000000?text=+) |                                            
| #4cb273 | ![#4cb273](https://via.placeholder.com/15/4cb273/000000?text=+) |                                            
| #20cef5 | ![#20cef5](https://via.placeholder.com/15/20cef5/000000?text=+) |                                            
| #0183ff | ![#0183ff](https://via.placeholder.com/15/0183ff/000000?text=+) |                                            
| #7746ff | ![#7746ff](https://via.placeholder.com/15/7746ff/000000?text=+) |                                            
| #ffc400 | ![#ffc400](https://via.placeholder.com/15/ffc400/000000?text=+) |                                            
| #ff7e2a | ![#ff7e2a](https://via.placeholder.com/15/ff7e2a/000000?text=+) |                                            
| #fb3c4c | ![#fb3c4c](https://via.placeholder.com/15/fb3c4c/000000?text=+) |                               

## Support

Feature Request, Bugs and Ideas can be added [here.](https://github.com/dinhphuc/tictop-github-action/issues)

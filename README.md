<img width="200" src="https://www.tictop.vn/wp-content/uploads/2021/08/prod_brand.svg"/>

# Github Action for Push Notification

Receive push notification to your devices using Github Actions

## Pre-requisites

To run this action you'll need:

- An API key from Push (https://www.tictop.vn/)

## Setup

1. Create the workflow and choose any event of your choice.
2. Copy and paste the following snippet into your .yml file.

```
- name: Send Push Notification
  uses: dinhphuc/tictop-github-action@1.0.0
```

3. Add a new secret `API_KEY` (your API key) and an environment variable `MESSAGE` (notification message)
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
      - name: Send Push Notification
        uses: dinhphuc/tictop-github-action@1.0.0
        env:
          API_KEY: ${{ secrets.API_KEY }}
          MESSAGE: "There is a new commit!"
```

## Support

Feature Request, Bugs and Ideas can be added [here.](https://github.com/dinhphuc/tictop-github-action/issues)

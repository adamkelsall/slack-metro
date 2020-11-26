***Note:** This repository's commit history has been rewritten for personal reasons.*  
*The last real commit was on 2017-07-28.*

# Metro disruptions Slack integration

## Introduction

The code behind a Slack integration designed to post messages on Slack whenever there is a disruption to Nexus Metro (Newcastle) service.

## Setup

### Environment Variables

Create a `.env` file in the root directory. This holds configuration for the script and without it you'll get an error.  
Here's what your `.env` file should include:

Varaible | Required? | Description
---|---|---
`DEBUG` | No | Whether to show stacktraces in error messages. Defaults to false.
`SLACK_WEBHOOK_URL` | Yes | Your Slack team's custom integration incoming webhook URL.

### npm

- `npm install`
- `npm run build`

## Running

- `npm start`
- Ideally this script should run through `crontab -e` as often as you'd like it to check for updates. The more often it checks, the more timely the messages it posts will be.

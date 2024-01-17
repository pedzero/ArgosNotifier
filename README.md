# Argos Notifier

A bot that notifies you when a specified Twitch channel updates its store in StreamElements.

## Prerequisites

- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/pedzero/ArgosNotifier
  ```
   
2. Install dependencies:
  ```bash
  cd ArgosNotifier
  npm install
  ```

## Usage

1. Create a .env file with the following environment variables:
  ```text
  EMAIL_SERVICE=email_service
  SENDER_EMAIL=sender@example.com
  SENDER_PASSWORD=password
  ```

2. Update the config.json file with your desired settings:
  ```json
  {
    "updateInterval": "*/10 * * * *",
      "watchedChannels": [
        "id_of_the_channel_in_streamelements"
      ],
      "emailRecipients": [
        "john.doe@example.com",
        "jane.doe@example.com"
      ]
  }
  ```

3. Run the bot:
  ```bash
  npm start
  ```

## Preview

![An example taken from a notification from Gaules' StreamElements store](https://github.com/pedzero/ArgosNotifier/assets/108827951/ee23e997-ecb5-48a4-84e0-1eb63261ef7a)





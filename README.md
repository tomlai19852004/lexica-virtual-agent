<img src="https://lexica.io/assets/images/Lexica_Logo.svg" alt="Lexica" />

## Introduction
This repository contains docker image for **Lexica virtual dialogue system facebook messenger**. 

## Prequisites
* Amazon Web Service
* MongoDB >= 3.6
* Node.js >= 10
* Typescript >= 3.5.1
* Docker >= 17.09
* docker-compose >= 1.17.1

## Getting Started
To setup the docker container, you will need the following environment variables.

```
PORT=8000
MONGO_URL=
REDIS_URL=
REDIS_HOST=
REDIS_PORT=
NLP_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_API_VERSION=
AWS_S3_BUCKET=
AWS_TRANSCODER_API_VERSION=
AWS_TRANSCODER_DELAY=
AWS_TRANSCODER_MAX_ATTEMPTS=
AWS_TRANSCODER_AUDIO_PIPELINE_ID=
AWS_TRANSCODER_AUDIO_PRESET_ID=
AWS_TRANSCODER_AUDIO_SUFFIX=
AWS_TRANSCODER_AUDIO_CONTENT_TYPE=
AWS_TRANSCODER_VIDEO_PIPELINE_ID=
AWS_TRANSCODER_VIDEO_PRESET_ID=
AWS_TRANSCODER_VIDEO_SUFFIX=
AWS_TRANSCODER_VIDEO_CONTENT_TYPE=
```

Once you have all the environment variable setup. You will need to comply the typescript code.

```
npm install
npm run build
```

Afterwards, Simply run the following command to start.

```
docker-compose up --build
```

## Licence
[MIT License](https://github.com/tomlai19852004/lexica-virtual-agent/blob/master/LICENSE.md)

## Contributing
Contributions are welcome!
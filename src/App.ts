import * as dotenv from 'dotenv';
import { Map, List } from 'immutable';
import * as request from 'request-promise-native';
import { isNil } from 'lodash';
import { 
	createBotServer
} from 'lexica-dialog-core/dist/';
import {
  BotServerConfig,
  NlpService,
  BotCommand,
  Messenger,
  Middleware,
  PreProcessor,
  PostProcessor,
  Executor,
} from 'lexica-dialog-core/dist/Api';
import {
  FacebookMessenger,
  facebookMiddleware,
  facebookSenderInfoMiddleware,
  facebookSenderActionMiddleware,
} from 'lexica-dialog-facebook-messenger/dist';
import { Config } from 'lexica-dialog-model/dist/Config';

dotenv.config();

const env = process.env;

const ENV_CONFIGS = {
  PORT: env.PORT as string,
  MONGO_URL: env.MONGO_URL as string,
  REDIS_URL: env.REDIS_URL as string,
  NLP_URL: env.NLP_URL as string,
  AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY as string,
  AWS_REGION: env.AWS_REGION as string,
  AWS_S3_API_VERSION: env.AWS_S3_API_VERSION as string,
  AWS_S3_BUCKET: env.AWS_S3_BUCKET as string,
  AWS_TRANSCODER_API_VERSION: env.AWS_TRANSCODER_API_VERSION as string,
  AWS_TRANSCODER_DELAY: env.AWS_TRANSCODER_DELAY as string,
  AWS_TRANSCODER_MAX_ATTEMPTS: env.AWS_TRANSCODER_MAX_ATTEMPTS as string,
  AWS_TRANSCODER_AUDIO_PIPELINE_ID: env.AWS_TRANSCODER_AUDIO_PIPELINE_ID as string,
  AWS_TRANSCODER_AUDIO_PRESET_ID: env.AWS_TRANSCODER_AUDIO_PRESET_ID as string,
  AWS_TRANSCODER_AUDIO_SUFFIX: env.AWS_TRANSCODER_AUDIO_SUFFIX as string,
  AWS_TRANSCODER_AUDIO_CONTENT_TYPE: env.AWS_TRANSCODER_AUDIO_CONTENT_TYPE as string,
  AWS_TRANSCODER_VIDEO_PIPELINE_ID: env.AWS_TRANSCODER_VIDEO_PIPELINE_ID as string,
  AWS_TRANSCODER_VIDEO_PRESET_ID: env.AWS_TRANSCODER_VIDEO_PRESET_ID as string,
  AWS_TRANSCODER_VIDEO_SUFFIX: env.AWS_TRANSCODER_VIDEO_SUFFIX as string,
  AWS_TRANSCODER_VIDEO_CONTENT_TYPE: env.AWS_TRANSCODER_VIDEO_CONTENT_TYPE as string,
};

Object.keys(ENV_CONFIGS).forEach((variable) => {
  if (isNil(env[variable])) {
	throw new Error(`Missing environment variable: ${variable}`);
  }
});

const config: BotServerConfig = {
  executors: Map<string, Executor>({}),
  preProcessors: Map<string, PreProcessor>({}),
  postProcessors: Map<string, PostProcessor>({}),
  port: parseInt(ENV_CONFIGS.PORT, 10),
  mongo: {
	url: ENV_CONFIGS.MONGO_URL,
  },
  redis: {
	url: ENV_CONFIGS.REDIS_URL,
  },
  nlp: {
	url: ENV_CONFIGS.NLP_URL,
  },
  aws: {
	accessKeyId: ENV_CONFIGS.AWS_ACCESS_KEY_ID,
	secretAccessKey: ENV_CONFIGS.AWS_SECRET_ACCESS_KEY,
	region: ENV_CONFIGS.AWS_REGION,
	s3: {
	  apiVersion: ENV_CONFIGS.AWS_S3_API_VERSION,
	  bucket: ENV_CONFIGS.AWS_S3_BUCKET,
	},
	transcoder: {
	  apiVersion: ENV_CONFIGS.AWS_TRANSCODER_API_VERSION,
	  delay: parseInt(ENV_CONFIGS.AWS_TRANSCODER_DELAY, 10),
	  maxAttempts: parseInt(ENV_CONFIGS.AWS_TRANSCODER_MAX_ATTEMPTS, 10),
	  audio: {
		pipelineId: ENV_CONFIGS.AWS_TRANSCODER_AUDIO_PIPELINE_ID,
		preset: {
		  id: ENV_CONFIGS.AWS_TRANSCODER_AUDIO_PRESET_ID,
		  suffix: ENV_CONFIGS.AWS_TRANSCODER_AUDIO_SUFFIX,
		  contentType: ENV_CONFIGS.AWS_TRANSCODER_AUDIO_CONTENT_TYPE,
		},
	  },
	  video: {
		pipelineId: ENV_CONFIGS.AWS_TRANSCODER_VIDEO_PIPELINE_ID,
		preset: {
		  id: ENV_CONFIGS.AWS_TRANSCODER_VIDEO_PRESET_ID,
		  suffix: ENV_CONFIGS.AWS_TRANSCODER_VIDEO_SUFFIX,
		  contentType: ENV_CONFIGS.AWS_TRANSCODER_VIDEO_CONTENT_TYPE,
		},
	  },
	},
  },
  messengers: Map<string, Messenger<any, any>>({
	'/en-GB/facebook': new FacebookMessenger('en-GB'),
  }),
  middlewares: Map<number, Middleware>({
	250: facebookMiddleware,
	550: facebookSenderActionMiddleware,
	650: facebookSenderInfoMiddleware,
  }),
};

const botServer = createBotServer(config);
botServer.init();

export default botServer;

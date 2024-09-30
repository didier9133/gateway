import 'dotenv/config';
import * as joi from 'joi';

interface IEnv {
  // PRODUCTS_HOST: string;
  // PRODUCTS_PORT: number;
  // ORDERS_HOST: string;
  // ORDERS_PORT: number;
  PORT: number;
  SERVERS_NATS: string[];
}

const envSchema = joi
  .object<IEnv>({
    // PRODUCTS_HOST: joi.string().required(),
    // PRODUCTS_PORT: joi.number().port().required(),
    // ORDERS_HOST: joi.string().required(),
    // ORDERS_PORT: joi.number().port().required(),
    PORT: joi.number().port().required(),
    SERVERS_NATS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  SERVERS_NATS: process.env.SERVERS_NATS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnv = value;

export const envs: IEnv = {
  // PRODUCTS_HOST: envVars.PRODUCTS_HOST,
  // PRODUCTS_PORT: envVars.PRODUCTS_PORT,
  // ORDERS_PORT: envVars.ORDERS_PORT,
  // ORDERS_HOST: envVars.ORDERS_HOST,
  PORT: envVars.PORT,
  SERVERS_NATS: envVars.SERVERS_NATS,
};

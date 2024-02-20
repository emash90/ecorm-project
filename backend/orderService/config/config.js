const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'emash90';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '123456';
const MONGO_ORDER_DB = process.env.MONGO_ORDER_DB || 'test';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';


module.exports = {
    MONGO_HOST,
    MONGODB_PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_ORDER_DB,
    REDIS_PORT,
    REDIS_HOST
};

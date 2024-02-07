const MONGO_USERNAME = process.env.MONGO_USERNAME || 'emash90';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '123456';
const MONGO_DB = process.env.MONGO_DB || 'auth';
const MONGODB_PORT = process.env.MONGO_PORT || 27017;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const PORT = process.env.PORT || 3000;



module.exports = {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DB,
    MONGO_HOST,
    REDIS_HOST,
    REDIS_PORT,
    MONGODB_PORT,
    PORT
};
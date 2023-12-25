const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'emash90';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '123456';
const MONGO_DB = process.env.MONGO_DB || 'test';


module.exports = {
    MONGO_HOST,
    MONGODB_PORT,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DB
};

const Redis = require('ioredis');
const { REDIS_PORT, REDIS_HOST } = require('../config/config.js');


const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST
})


//////////////////get session from redis instance

const get_session = async (req, res, next) => {
    const { session_id } = req.body;
    console.log("session_id", session_id)
    try {
        const session = await redis.get(`sess:${session_id}`)
        console.log("session", session)
        if (session) {
            req.session = JSON.parse(session);
            next();
        } else {
            res.status(401).send("Session not found");
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    get_session
}

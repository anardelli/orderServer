require ('dotenv/config');

const config = {
    mongoUrl: process.env.MONGODB_URL,
    secret: process.env.SECRET_KEY,
    port: process.env.PORT
}

module.exports = config;
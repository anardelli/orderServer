require ('dotenv/config');

const config = {
    mongoUrl: process.env.MONGODB_URL,
    secret: process.env.SECRET_KEY,
    port: 5000
}

module.exports = config;
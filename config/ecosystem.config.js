module.exports = {
    "apps": [
        {
            "name": "restaurant-order-service",
            "script": "./index.js",
            "watch": true,
            "env": {
                "PORT": 5000
            }
        },
        {
            "name": "restaurant-order-service-2",
            "script": "./index.js",
            "watch": true,
            "env": {
                "PORT": 5001
            }
        }
    ]
}
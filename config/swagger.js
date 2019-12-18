/**
 * Swagger Config
 */
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocumentation = require('./swagger.json');

/**
 * Another way of using swagger documentation.
 */
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: "Restaurant Order API",
//             description: "Restaurant Order API Information",
//             contact: {
//                 name: "Deepanshu Gupta"
//             }
//         },
//         host: 'localhost:5000',
//         basePath: '/order'
//     },
//     apis: ["index.js", "./src/routes/order.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * Above code is optional
 */

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
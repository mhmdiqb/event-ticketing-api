const swaggerJsdoc = require("swagger-jsdoc")

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Event Ticketing API",
            version: "1.0.0",
            description: "REST API untuk manajemen event dan ticketing"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec
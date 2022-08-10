const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Node_instagram",
      description:
        "프로젝트 설명 Instagram 클로닝",
    },
    servers: [
      {
        url: "https://node-all-in-one-fgigx.run.goorm.io", // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
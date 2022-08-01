const swaggerUi = require('swagger-ui-express'); //swagger-ui와 express를 연결하기 위해
const swaggereJsdoc = require('swagger-jsdoc'); //jscod 주석으로 swagger API 문서를 표현하기 위해

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "개발이 취미인 남자",
			description:
			"Instagram 클론닝(프론트 빼고)"
		},
		server: [
			{
				url: "https://node-all-in-one-fgigx.run.goorm.io", // 요청 URL
			},
		],
	},
	apis: ["./routers/*.js", "./routers/user/*.js"], //Swagger 파일 연동
}

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs }
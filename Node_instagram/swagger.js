const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "https://node-all-in-one-fgigx.run.goorm.io",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/auth.js",
  "./routes/page.js",
  "./routes/post.js",
  "./routes/profile.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
const Joi = require("joi");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
    client_id: '00d4d68cef3af940c8ef',
    redirect_uri: 'http://localhost:3000/login',
    client_secret: '813fc7970d57f825ac7de572d55bd4c0108d8a3d',
    proxy_url: 'http://localhost:5000/authenticate'
};

const envVarsSchema = Joi.object({
    client_id: Joi.string().required(),
    redirect_uri: Joi.string().required(),
    client_secret: Joi.string().required(),
    proxy_url: Joi.string().required()
});

const { error } = envVarsSchema.validate(config);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = config;
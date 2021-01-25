const Joi = require("joi");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
    client_id: '836f35dd5231a7d99587',
    redirect_uri: 'https://bartuatabek.github.io/git-dash/login',
    client_secret: 'c27aca8e0c3000720c6e7f4514e1b05a846564fd',
    proxy_url: 'https://bartuatabek.github.io/git-dash:5000/authenticate'
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

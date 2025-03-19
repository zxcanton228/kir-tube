"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleRecaptchaConfig = void 0;
const is_dev_util_1 = require("../utils/is-dev.util");
const getGoogleRecaptchaConfig = async (configService) => ({
    secretKey: configService.get('RECAPTCHA_SECRET_KEY'),
    response: req => req.headers.recaptcha,
    skipIf: () => (0, is_dev_util_1.isDev)(configService)
});
exports.getGoogleRecaptchaConfig = getGoogleRecaptchaConfig;
//# sourceMappingURL=google-recaptcha.config.js.map
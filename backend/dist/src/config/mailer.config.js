"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailerConfig = void 0;
const is_dev_util_1 = require("../utils/is-dev.util");
const getMailerConfig = async (configService) => ({
    transport: {
        host: configService.get('SMTP_SERVER'),
        port: (0, is_dev_util_1.isDev)(configService) ? 587 : 465,
        secure: !(0, is_dev_util_1.isDev)(configService),
        auth: {
            user: configService.get('SMTP_LOGIN'),
            pass: configService.get('SMTP_PASSWORD')
        }
    },
    defaults: {
        from: '"htmllessons" <no-reply@htmllessons.ru>'
    }
});
exports.getMailerConfig = getMailerConfig;
//# sourceMappingURL=mailer.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma.service");
const is_dev_util_1 = require("./utils/is-dev.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.setGlobalPrefix('api', {
        exclude: [{ path: 'verify-email', method: common_1.RequestMethod.GET }]
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use((0, helmet_1.default)({ contentSecurityPolicy: is_dev_util_1.IS_DEV_ENV ? false : undefined }));
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true
    });
    app.disable('x-powered-by');
    const port = process.env.PORT;
    await app.listen(port || 4200, () => console.log(`🚀Server started on ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map
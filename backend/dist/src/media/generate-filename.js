"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilename = generateFilename;
const path = require("path");
const uuid_1 = require("uuid");
function generateFilename(fileName) {
    const decodedFileName = Buffer.from(fileName, 'latin1').toString('utf8');
    const fileExtension = path.extname(decodedFileName);
    const ids = (0, uuid_1.v4)().split('-');
    const uniqueFileName = ids[0] + ids[1] + fileExtension;
    return uniqueFileName;
}
//# sourceMappingURL=generate-filename.js.map
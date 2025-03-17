"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodErrors = formatZodErrors;
function formatZodErrors(error) {
    return error.issues[0].message;
}

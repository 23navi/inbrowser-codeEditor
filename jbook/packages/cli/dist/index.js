"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const local_api_1 = __importDefault(require("local-api"));
const commander_1 = require("commander");
const serve_1 = require("./commands/serve");
(0, local_api_1.default)();
commander_1.program.addCommand(serve_1.serveCommand);
commander_1.program.parse(process.argv);
console.log("Running from CLI");

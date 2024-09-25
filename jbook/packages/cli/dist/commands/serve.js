"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Serve a notebook")
    .option("-p, --port <number>", "Port number", "3000")
    .option("-s, --silent", "Disable logging", false)
    .option("-d, --debug", "Enable debug mode", false)
    .action((...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filename = "default.js", options) {
    console.log(process.cwd());
    console.log(path_1.default.dirname(filename));
    console.log(path_1.default.join(process.cwd(), path_1.default.dirname(filename)));
}));

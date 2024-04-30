import { Firebot, ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { registerEvents } from "./events";
import websocket from "./websocket";

interface Params {
  apiKey: string;
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "Pally.gg",
      description: "Pally.gg integration for Firebot",
      author: "DennisOnTheInternet",
      version: "1.0",
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => {
    return {
      apiKey: {
        type: "string",
        default: "",
        description: "API Key",
        secondaryDescription: "Enter your pally.gg API key here",
      },
    };
  },
  run: (runRequest) => {
    const { logger } = runRequest.modules;
    logger.info(runRequest.parameters.message);
    modules = runRequest.modules;
    registerEvents();
    websocket.connect(runRequest.parameters.apiKey);
  },
  parametersUpdated: (parameters: Params) => {
    websocket.disconnect();
    websocket.connect(parameters.apiKey);
  },
  stop: () => {
    websocket.disconnect();
  }
};

export let modules: ScriptModules;

export default script;

import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationMessage",
        description: "The message sent with a donation on pally.gg",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger: Effects.Trigger): string {
        return (trigger.metadata.eventData as PallyDonationEventData).message ?? "";
    }
}

export default model;
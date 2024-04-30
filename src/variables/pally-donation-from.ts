import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationFrom",
        description: "The username of the donator",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger: Effects.Trigger): string {
        return (trigger.metadata.eventData as PallyDonationEventData).username ?? "Anonymous";
    }
}

export default model;
import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationAmount",
        description: "The donation amount as a raw number, eg. 10.2",
        triggers: triggers,
        possibleDataOutput: [ "number" ]
    },
    evaluator(trigger: Effects.Trigger): number {
        return (trigger.metadata.eventData as PallyDonationEventData).donation ?? 0;
    }
}

export default model;
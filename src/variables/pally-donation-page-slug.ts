import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationPageSlug",
        description: "The slug of the page this donation was sent to",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger: Effects.Trigger): string {
        return (trigger.metadata.eventData as PallyDonationEventData).pageSlug ?? "";
    }
}

export default model;
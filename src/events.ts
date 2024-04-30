import { modules } from "./main";
import { PallyDonationEventData } from "./pally";

const eventSource = {
    id: "dennisontheinternet:pally",
    name: "Pally.gg",
    description: "Donation events for pally.gg",
    events: [
        {
            id: "donation",
            name: "Donation",
            description: "When a donation is sent through pally.gg",
            manualMetadata: {
                username: "Firebot",
                donation: 5.10
            },
            activityFeed: {
                icon: "fad fa-hand-holding-usd",
                getMessage: (eventData: PallyDonationEventData) => {
                    return `**${eventData.username}** donated **$${eventData.donation.toFixed(2)}** to page **${eventData.pageSlug}**`
                }
            }
        }
    ]
}

export function registerEvents() {
    modules.eventManager.registerEventSource(eventSource);
}

export function triggerPallyDonation(username: string, donation: number, message: string, pageSlug: string) {
    modules.eventManager.triggerEvent(eventSource.id, "donation", {
        username,
        donation,
        message,
        pageSlug
    });
}
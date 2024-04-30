export type PallyMessageType = "campaigntip.notify";

export type PallyMessage = {
    type: PallyMessageType;
    payload: {
        page: {
            id: string;
            slug: string;
            title: string;
            url: string;
        }
    }
};

export type PallyCampaignTipEventData = {
    createdAt: string;
    displayName: string;
    grossAmountInCents: number;
    netAmountInCents: number;
    processingFeeInCents: number;
    id: string;
    message: string;
    updatedAt: string;
};

export type PallyDonationEventData = {
    username: string;
    donation: number;
    message: string;
    pageSlug: string;
}

export type PallyCampaignTipNotify = {
    type: "campaigntip.notify";
    payload: {
        campaignTip: PallyCampaignTipEventData;
    } & PallyMessage["payload"];
};
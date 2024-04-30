import { EventEmitter } from "node:events";
import { WebSocket } from "ws";
import { PallyCampaignTipNotify, PallyMessage } from "./pally";
import { triggerPallyDonation } from "./events";
import { modules } from "./main";

class PallyWebsocket extends EventEmitter {
    private _ws: WebSocket
    private _ping: ReturnType<typeof setTimeout>;
    private _pong: ReturnType<typeof setTimeout>;

    constructor() {
        super();
    }

    sendPing() {
        if (this._ws != null) {
            this._ws.send("ping");
        }
        setTimeout(() => this.sendPing(), 6e4);
    }

    updatePong() {
        clearTimeout(this._pong);
        this._pong = setTimeout(() => {
            if (this._ws != null) {
                this._ws.close();
            }
        }, 9e4);
    }

    connect(apiKey: string) {
        this.disconnect();

        clearTimeout(this._ping);
        clearTimeout(this._pong);

        this._ws = new WebSocket(`wss://events.pally.gg?auth=${apiKey}&channel=firehose`);

        this._ws.on('open', () => {
            modules.logger.debug("Pally.gg: Connected");
            this.updatePong();
            this.sendPing();
        });

        this._ws.on('message', (data) => {
            this.updatePong();
            const message: string = data.toString();
            if (message === "pong") {
                return;
            }

            const messageObject: PallyMessage = JSON.parse(message);

            if (messageObject.type === "campaigntip.notify") {
                const donation = messageObject as PallyCampaignTipNotify;
                triggerPallyDonation(
                    donation.payload.campaignTip.displayName,
                    donation.payload.campaignTip.grossAmountInCents / 100,
                    donation.payload.campaignTip.message,
                    donation.payload.page.slug
                );
            }
        });

        this._ws.on('close', (code) => {
            modules.logger.debug(`Pally.gg: Disconnected with code ${code}`);
            if (code !== 4000) {
                this.connect(apiKey);
            }
        });
    }

    disconnect() {
        if (this._ws != null) {
            this._ws.close(4000);
        }
    }
}

export default new PallyWebsocket();
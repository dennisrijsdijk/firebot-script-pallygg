# Firebot Pally

## Installation

Before continuing, generate an API key on [Pally's Website](https://pally.gg/dashboard/settings/api-keys)

Download `firebot-pally.js` from the [latest release](https://github.com/dennisrijsdijk/firebot-script-pallygg/releases/latest)

In Firebot, go to Settings > Scripts. If Custom Scripts are Disabled, Enable them.

Click on "Manage Startup Scripts", then on "Add New Script".

Click the blue underline text that says "scripts folder"

Drag the `firebot-pally.js` script into this folder, then press the blue refresh button in Firebot.

Select the `firebot-pally.js` script in the dropdown, paste your API key in the field and save.

## Activity Feed

To see donations in the activity feed, go back to the main Dashboard page.

Click on the three dots in the activity feed, then on "Edit events"

Find "Donation (Pally.gg)", enable it and press save.

## Usage

The Pally script provides a Donation event, as well as a few variables:
- $pallyDonationAmount - Donation amount as a number (e.g. 10.5)
- $pallyDonationAmountFormatted - Donation amount formatted as a string (e.g. $10.50)
- $pallyDonationFrom - The donator's name, entered on the donation page. 'Someone' when no name is entered
- $pallyDonationMessage - The message left by the donator
- $pallyDonationPageSlug - The slug (URL segment) for the page where the donation took place. e.g. for https://pally.gg/p/dennis, the slug is "dennis"

Using the event and these variables, you can set up simple, or complex donation alerts.

Using the page slug you can differentiate between different pages you own using a conditional effect.

## Development

### Setup
1. Create a new repo based off this template (Click "Use this Template" above) or simply fork it
2. `npm install`

### Building
Dev:
1. `npm run build:dev`
- Automatically copies the compiled .js to Firebot's scripts folder.

Release:
1. `npm run build`
- Copy .js from `/dist`
# Salesrobot LinkedIn Autoconnect

### Architechture

- I have used React and Typescript for this project.
- For UI, used library `@chakra-ui/react`.
- Interacting with chrome browser, used library `@types/chrome`.
- For the click event, used library `jquery`.
- React hooks for changing the values.

### Code

- `storage` permission for getting the totalCount of the connect available options.
- `activeTab` permission for interacting with the current tab.
- `chrome.runtime` for listening to the messages.
- `chrome.storage` for getting the count.

## For starters

1. Clone the github repo.
2. Run `npm i` from the root.
3. Build the project using `npm run build`.

### On the chrome/brave browser

1. Go to extensions settings or `brave://extensions/`
2. Switch on the Developer mode.
3. Click on `Load Unpacked` and select the build folder of the extension.
4. The extension is added for use.

## Usage

1. Go to [linkedIn search page](https://www.linkedin.com/search/results/people/).
2. Click on the extension and select `start connecting`.

#### THATS ALL!!!

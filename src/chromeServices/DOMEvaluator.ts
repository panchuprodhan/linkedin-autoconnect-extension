import { DOMMessage, DOMMessageResponse } from '../types';
import $ from 'jquery';
 
// Function called when a new message is received
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(({status}, sender, sendResponse) => {
    switch(status) {
        case 'START':
            sendConnectionRequest();
        }
    });

const sendConnectionRequest = async() => {
    console.log('commming nowwwwwwwwwwwwwwwwwww')
    const buttonSelect = document.querySelectorAll('div.entity-result__actions button');
    const connectButtonArray = Array
                                .from(buttonSelect)
                                .filter((button) => (button.textContent === '\n\n    Connect\n'));
    
    let j = 0;
    console.log(connectButtonArray.length)
    await chrome.storage.sync.set({ totalCount: connectButtonArray.length })
    
    for(let i =0; i < connectButtonArray.length; i++) {
        let currentButton = connectButtonArray[i];
        if(currentButton.textContent === '\n\n    Connect\n') {
            await new Promise<void>(resolve => {
                setTimeout(() => {
                    console.log('timeout');
                    resolve();
                    return;
                }, 5000);
            });
            $(currentButton).click();
            $(currentButton).prop('disabled', true);
            
            await chrome.runtime.sendMessage({ request: {count: j + 1}});                        
            // sendResponse({count: j + 1});
            requestCount(j + 1);
            j++;
            
        }
    }
    await chrome.runtime.sendMessage({ status: 'STOP' });

}


function requestCount(counter: number) {
    console.log(counter, "all counting done here");
    chrome.storage.sync.set({ reqCount: counter }).then(() => {
        console.log("value is set to " + (counter));
        return;
    });
}

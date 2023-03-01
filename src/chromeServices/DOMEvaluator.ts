import { DOMMessage, DOMMessageResponse } from '../types';
import $ from 'jquery';
import { resolve } from 'path';
 
// Function called when a new message is received
const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {
  
//    console.log('[content.js]. Message received', msg);
 
   const headlines = Array.from(document.getElementsByTagName<"h1">("h1"))
                       .map(h1 => h1.innerText);

    // Prepare the response object with information about the site
   const response: DOMMessageResponse = {
       title: document.title,
       headlines
   };
 
   sendResponse(response);
}
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(({status}, sender, sendResponse) => {
    switch(status) {
        case 'START':
            sendConnectionRequest();
        }
    });
    // Good place to implement the autoconnect option ;-)
// chrome.runtime.onConnect.addListener(() => {
//     console.log('this is haaaaaaaaaaaaaaaaaaaaaaare')
    
//     const buttonSelect = document.querySelectorAll('div.entity-result__actions button');
//     console.log(buttonSelect);
    
//     const connectButtonArray = Array
//     .from(buttonSelect)
//     .filter((button) => (button.textContent === '\n\n    Connect\n'));
    
//     // let clickConnect = $(connectButtonArray[0]).click();
//     // let disableConnect = $(connectButtonArray[0]).prop('disabled', true);
// })

const sendConnectionRequest = async() => {
    console.log('commming nowwwwwwwwwwwwwwwwwww')
    const buttonSelect = document.querySelectorAll('div.entity-result__actions button');
    const connectButtonArray = Array
                                .from(buttonSelect)
                                .filter((button) => (button.textContent === '\n\n    Connect\n'));
    
    let j = 0;
    
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
            
            await sleep(2000);
        }
    }
    await chrome.runtime.sendMessage({ status: 'STOP' });

}

function sleep(ms: number | undefined) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

function requestCount(counter: number) {
    console.log(counter, "all counting done here");
    chrome.storage.sync.set({ reqCount: counter + 1 });
}
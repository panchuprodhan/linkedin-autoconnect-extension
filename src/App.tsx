import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Button, ChakraProvider, CircularProgress, CircularProgressLabel, extendTheme } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

const darkChakraTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

function App() {
  const [title, setTitle] = React.useState<number>();
  const [buttonText, setButtonText] = React.useState('Start COnnecting!!');
  const [disableButton, setDisableButton] = React.useState(false);
  const [headlines, setHeadlines] = React.useState<string[]>([]);

  console.log("weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee rockkkkkkkkkkkkkkkkk")

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      // chrome.tabs.sendMessage(
      //   tabs[0].id || 0,
      //   { type: 'GET_DOM' } as DOMMessage,
      //   (response: DOMMessageResponse) => {
      //     setTitle(response.title);
      //     setHeadlines(response.headlines);
      //   });

    });
    chrome.runtime.onConnect.addListener((port) => {
      console.log(port, 'this port');
    })
    
  });
  let reqCount: any = document.getElementById('context');

  let count = 0;
  function buttonClk() {
    setButtonText('Connecting');
    setDisableButton(true);
    count= 2;
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      console.log('tabs', tabs)
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {status: 'START'}
      ).then(console.log);
      // chrome.tabs.connect(
      //   tabs[0].id || 0,
      //   {name: 'reqCount'}
      // );

    });
    chrome.storage.sync.get(['reqCount']).then(res=> {console.log(res)});
    // countIncrement();
  }
  
  function countIncrement() {
    while (count < 10) {
      setTimeout(() => {
        count++;
        setTitle(count);
      }, 5000);
      if(count === 10){
        break;
      }
    }

  }
  

  return (
    <ChakraProvider theme={darkChakraTheme}>
      <Flex paddingX={5} paddingY={2} backgroundColor="gray.700" align='center' width='260px'>
        <Box>
          <Heading size='sm'>LinkedIn AutoConnect</Heading>
        </Box>
      </Flex>
      <Container padding='5'>
        <VStack spacing='3'>
          <Box>
            <Text fontSize='18px'>Invitaions Sent</Text>
          </Box>
          <Box>
            <CircularProgress value={(count / 10)} color="green.400" size='100px'>
              <CircularProgressLabel>{count}</CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Box>
            <Button colorScheme={'green'} onClick={buttonClk} isFullWidth>
              START CONNECTING
            </Button>
          </Box>
        </VStack>
      </Container>

    </ChakraProvider>

      // {/* <ul className="SEOForm">
      //   <li className="SEOValidation">
      //     <div className="SEOValidationField">
      //       <span className="SEOValidationFieldTitle">Title</span>
      //       <span className={`SEOValidationFieldStatus`}>
      //         {title} Characters
      //       </span>
      //     </div>
      //     <div className="SEOVAlidationFieldValue">
      //       {title}
      //     </div>
      //   </li>

      //   <li className="SEOValidation">
      //     <div className="SEOValidationField">
      //       <span className="SEOValidationFieldTitle">Main Heading</span>
      //       <span className={`SEOValidationFieldStatus ${headlines.length !== 1 ? 'Error' : 'Ok'}`}>
      //         {headlines.length}
      //       </span>
      //     </div>
      //     <div className="SEOVAlidationFieldValue">
      //       <ul>
      //         {headlines.map((headline, index) => (<li key={index}>{headline}</li>))}
      //       </ul>
      //     </div>
      //   </li>
      // </ul> */}

      // <button onClick={buttonClk} disabled={disableButton}>{buttonText}</button>
      // <span id='context'>{title}</span>
  );
}

export default App;
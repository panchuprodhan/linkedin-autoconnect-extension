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
  const [count, setCount] = React.useState<number>(0);
  const [buttonText, setButtonText] = React.useState('START CONNECTING');
  const [disableButton, setDisableButton] = React.useState(false);

  console.log("weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee rockkkkkkkkkkkkkkkkk")

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.storage.sync.get(['reqCount']).then(res=> {console.log(res)});
    
  });
  let reqCount: any = document.getElementById('context');

  function buttonClk() {
    setButtonText('CONNECTING');
    setDisableButton(true);
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      console.log('tabs', tabs)
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {status: 'START'}
      ).then(console.log);
      chrome.tabs.connect(
        tabs[0].id || 0
      );

    });
    // countIncrement();
  }
  
  function countIncrement() {
    while (count < 10) {
      let num = count;
      setCount(num++);
      setTimeout(() => {
        setCount(num);
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
            <Button colorScheme={'green'} onClick={buttonClk} isFullWidth disabled={disableButton}>
              {buttonText}
            </Button>
          </Box>
        </VStack>
      </Container>

    </ChakraProvider>


      // <button onClick={buttonClk} disabled={disableButton}>{buttonText}</button>
      // <span id='context'>{title}</span>
  );
}

export default App;
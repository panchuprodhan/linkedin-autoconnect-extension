import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Button, ChakraProvider, CircularProgress, CircularProgressLabel, extendTheme } from '@chakra-ui/react';
import React from 'react';

const darkChakraTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

function App() {
  const [count, setCount] = React.useState<number>(0);
  const [totalCount, setTotalCount] = React.useState<number>();
  const [buttonText, setButtonText] = React.useState('START CONNECTING');
  const [disableButton, setDisableButton] = React.useState(false);

  console.log("weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee rockkkkkkkkkkkkkkkkk")

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.storage.sync.get(['totalCount']).then(res=> {
      console.log("Value is "+res.reqCount);
      setTotalCount(res.totalCount);
    });
    
  });

  function buttonClk() {
    setButtonText('CONNECTING');
    setDisableButton(true);
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      console.log('tabs', tabs)
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {status: 'START'}
      ).then(console.log);
      
    });
  }
  chrome.runtime.onMessage.addListener(({request}, sender, sendResponse) => {
    setCount(request.count)
  })
  chrome.runtime.onMessage.addListener(({status}, sender, sendResponse) => {
    if(status === 'STOP') {
      setButtonText('ALL CONNECTED')
    }
  })
    

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
            <CircularProgress value={(count / Number(totalCount)) * 100} color="green.400" size='100px'>
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
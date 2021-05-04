import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import { OnlineStatusProvider } from '../lib/hooks/useOnlineStatus';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <OnlineStatusProvider>
        <Component {...pageProps} />
      </OnlineStatusProvider>
    </ChakraProvider>
  );
}

export default App;

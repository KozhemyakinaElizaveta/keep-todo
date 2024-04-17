import { ChakraProvider as ChakraCoreProvider } from '@chakra-ui/react';
import theme from '../shared/config/chakraTheme/globalStyles';
import RoutesContainer from '../shared/config/routes-container/RoutesContainer';
import { AppHeader } from '../widgets/AppHeader';
//import { useEffect, useState } from 'react';

function App() {

  return (
    <ChakraCoreProvider theme={theme}>
      <AppHeader />
      <RoutesContainer />
    </ChakraCoreProvider>
  );
}

export default App;


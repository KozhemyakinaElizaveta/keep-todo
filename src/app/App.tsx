import { ChakraProvider as ChakraCoreProvider } from '@chakra-ui/react'
import theme from '../shared/config/chakraTheme/globalStyles';
import RoutesContainer from '../shared/config/routes-container/RoutesContainer';
//import { useEffect } from "react";

function App() {

  // const dispatch = useAppDispatch();
  //   useEffect(() => {
  //       dispatch(getIngredients());
  //       if (getItem('burgerAccessToken'))
  //         dispatch(getUserThunk())
  //   }, [dispatch]);

  return (
    <ChakraCoreProvider theme={theme}>
      {/* <AppHeader /> */}
      <RoutesContainer />
    </ChakraCoreProvider>
  );
}

export default App;

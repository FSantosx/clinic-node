//import Navbar from "./components/Navbar/Navbar";
import { ChakraProvider } from '@chakra-ui/react'
import TemplateCollumns from "./components/templateCollumns";


function App() {
  return (
    <ChakraProvider>
      <TemplateCollumns />
    </ChakraProvider>
  )
};

export default App;

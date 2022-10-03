import React  from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
// import Login from './components/Forms/Login.tsx'
import Navbar from './components/Home/Navbar/Navbar.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        {/* <Login /> */}
        <Navbar href='/Dashboard'/>
    </ChakraProvider>
);
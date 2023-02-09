import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoPage from "./pages/ToDoPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import {ChakraProvider, extendTheme, useColorMode} from "@chakra-ui/react";


const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({config});

function App() {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route index element={<SignInPage/>}/>
                    <Route path="/todo" element={<TodoPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;

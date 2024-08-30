import './App.css'
import {Todos} from "./components/Todos.tsx";
import {useContext, useEffect} from "react";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";
import {AuthContext} from "./contexts/AuthContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, Routes} from "react-router-dom";

const queryClient = new QueryClient()

function App() {
    const {checkForToken} = useContext(AuthContext)

    useEffect(() => {
        checkForToken()
    }, [checkForToken])

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="todos" element={<Todos/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="*" element={<>hi</>}/>
            </Routes>
        </QueryClientProvider>
    )
}

export default App

import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyNavbar from "./components/nav"
import Dashboard from "./pages/dashboard"
import MyBook from "./pages/books"


const RoutesAPP = () => {
    return (
        <>
            <BrowserRouter>
                <MyNavbar />
                <Routes>
                    <Route path='/' element={<Dashboard/>} />
                    <Route path='/book' element={<MyBook/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default RoutesAPP
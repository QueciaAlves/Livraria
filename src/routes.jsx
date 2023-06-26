import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyNavbar from "./components/nav"
import Dashboard from "./pages/dashboard"
import MyBook from "./pages/books"
import EditBook from './pages/books/edit'



const RoutesAPP = () => {
    return (
        <>
            <BrowserRouter>
                <MyNavbar />
                <Routes>
                    <Route path='/' element={<Dashboard/>} />
                    <Route path='/book' element={<MyBook/>} />
                    <Route path='/editBook' element={<EditBook/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default RoutesAPP
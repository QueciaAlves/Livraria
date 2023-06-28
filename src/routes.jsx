import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MyNavbar from "./components/nav"
import MyBook from "./pages/books"
import EditBook from "./pages/books/edit"
import EditAuthor from "./pages/author/edit"
import Dashboard from './pages/Dashboard'
import MyAuthor from './pages/author'




const RoutesAPP = () => {
    return (
        <>
            <BrowserRouter>
                <MyNavbar />
                <Routes>
                    <Route path='/' element={<Dashboard/>} />
                    <Route path='/book' element={<MyBook/>} />
                    <Route path='/editBook' element={<EditBook/>} />
                    <Route path='/editAuthor' element={<EditAuthor/>} />
                    <Route path='/author' element={<MyAuthor/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default RoutesAPP
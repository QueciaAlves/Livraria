import React, { useEffect, useState } from "react"
import { Form, Button, Row, Col } from 'bootstrap-4-react'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const MyBook = () => {

    const [titulo, setTitulo] = useState()
    const [escritor, setEscritor] = useState()
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    async function findAllBooks() {
        const booksRef = collection(db, 'bookstore')
        await getDocs(booksRef)
            .then((snapshot) => {
                let lista = []
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        escritor: doc.data().escritor
                    })
                })
                setBooks(lista)
            })
    }

    useEffect(() => {
        findAllBooks()
    }, [books])


    async function registerBook(e) {
        e.preventDefault()
        try {
            const docRef = await addDoc(collection(db, "bookstore"), {
                titulo: titulo,
                escritor: escritor
            })
            setTitulo('')
            setEscritor('')
            alert('Gravou!')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete(id) {
        const docRef = doc(db, 'bookstore', id)
        await deleteDoc(docRef)
            .then(() => {
                alert('Livro excluído!')
            })
            .catch(() => {
                alert('Erro ao apagar!')
            })
    }

  function handleEdit(idBook){
        navigate('/editBook',{state: {id:idBook}})
    }

    return (
        <div className="container">
            <form onSubmit={registerBook}>
                <Form.Group>
                    <Row>
                        <Col col="sm-6">
                            <label>Título</label>
                            <Form.Input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col col="sm-6">
                            <label>Escritor</label>
                            <Form.Input type="text" value={escritor} onChange={(e) => setEscritor(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>

                <Button primary type="submit">Submit</Button>
            </form>

            <div className="container-table">
                <br />
                <h3>Lista de livros registrados:</h3>
                <ol>
                    {
                        books.map((item) => (
                            <li className='lista'
                                key={item.id}>
                                <b>Título:</b> {item.titulo}               ---               <b>Escritor:</b> {item.escritor}               ---               <button onClick={() => handleDelete(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>                             <button onClick={() => handleEdit(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                            </li>
                        ))
                    }
                </ol>
            </div>

        </div>
    )
}
export default MyBook
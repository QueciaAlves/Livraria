import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'bootstrap-4-react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import {useNavigate} from 'react-router-dom'

const EditBook = () => {

    const [titulo, setTitulo] = useState('')
    const [escritor, setEscritor] = useState('')
    const [editora, setEditora] = useState('')
    const [ano, setAno] = useState('')
    const [isbn, setISBN] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const id = location?.state?.id

    async function findOneBook(){
        if(id !== ''){
            const bookRef = doc(db, 'bookstore', id)
            await getDoc(bookRef)
            .then((book) => {
                setTitulo(book.data().titulo),
                setEscritor(book.data().escritor),
                setEditora(book.data().editora),
                setAno(book.data().ano),
                setISBN(book.data().isbn)
            })
            .catch((erro) => {
                alert(`Erro ao buscar ${erro}`)
            })
        }
    }

    useEffect(()=>{
        findOneBook()
    }, [])

    function handleBack(){
        navigate('/book')
    }

    async function handleEditSave(e){
        e.preventDefault()
        try{
            const docRef = doc(db,"bookstore",id)
            await updateDoc(docRef, {
                titulo: titulo,
                escritor: escritor,
                editora: editora,
                ano: ano,
                isbn: isbn
            })
            .then(()=>{
                alert('Dados Atualizados!')
            })
        }catch(error){
            alert('Erro ao editar dados!')
        }
    }

    return (
        <>
            <div className="container" w="90">
                <form>
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
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>Editora</label>
                                <Form.Input type="text" value={editora} onChange={(e) => setEditora(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>Ano</label>
                                <Form.Input type="text" value={ano} onChange={(e) => setAno(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>ISBN</label>
                                <Form.Input type="text" value={isbn} onChange={(e) => setISBN(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Button onClick={(e)=>handleEditSave(e)} primary type="submit">Atualizar</Button>     <Button onClick={()=>handleBack()} primary type="submit">Voltar</Button>
                </form>
            </div>
        </>
    )
}
export default EditBook
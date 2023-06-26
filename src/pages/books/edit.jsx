import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'bootstrap-4-react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

const EditBook = () => {

    const [titulo, setTitulo] = useState('')
    const [escritor, setEscritor] = useState('')
    const location = useLocation()

    const id = location?.state?.id

    async function findOneBook(){
        if(id !== ''){
            const bookRef = doc(db, 'bookstore', id)
            await getDoc(bookRef)
            .then((book) => {
                setTitulo(book.data().titulo),
                setEscritor(book.data().escritor)
            })
            .catch((erro) => {
                alert(`Erro ao buscar ${erro}`)
            })
        }
    }

    useEffect(()=>{
        findOneBook()
    }, [])

    async function handleEditSave(e){
        e.preventDefault()
        try{
            const docRef = doc(db,"bookstore",id)
            await updateDoc(docRef, {
                titulo: titulo,
                escritor: escritor,
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

                    <Button onClick={(e)=>handleEditSave(e)} primary type="submit">Atualizar</Button>
                </form>
            </div>
        </>
    )
}
export default EditBook
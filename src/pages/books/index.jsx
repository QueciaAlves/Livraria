import React, {useState} from "react"
import { Form, Button, Row, Col } from 'bootstrap-4-react'
import {db} from '../../services/firebaseConnection'
import {addDoc,collection,getDocs} from 'firebase/firestore'

const MyBook = () => {

    const [titulo, setTitulo] = useState()
    const [escritor, setEscritor] = useState()

    async function registerBook(e) {
        e.preventDefault()
        try{
            const docRef = await addDoc(collection(db,"bookstore"),{
                titulo:titulo,
                escritor:escritor
            })
            setTitulo('')
            setEscritor('')
            alert('Gravou!')
        }catch(error){
            console.log(error)
        }
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
        </div>
    )
}
export default MyBook
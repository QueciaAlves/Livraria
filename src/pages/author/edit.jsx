import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'bootstrap-4-react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import {useNavigate} from 'react-router-dom'

const EditAuthor = () => {

    const [nome, setNome] = useState('') //nome do autor(a)
    const [pseudonimo, setPseudonimo] = useState('')//nome conhecido
    const [datanasc, setNiver] = useState('')//data de nascimento
    const [cidade, setCidade] = useState('')//cidade de nascimento
    const [pais, setPais] = useState('')//país de nascimento
    const location = useLocation()
    const navigate = useNavigate()

    const id = location?.state?.id

    async function findOneAuthor(){
        if(id !== ''){
            const authorRef = doc(db, 'bookstore', id)
            await getDoc(authorRef)
            .then((author) => {
                setNome(author.data().nome),
                setPseudonimo(author.data().pseudonimo),
                setNiver(author.data().datanasc),
                setCidade(author.data().cidade),
                setPais(author.data().pais)
            })
            .catch((erro) => {
                alert(`Erro ao buscar ${erro}`)
            })
        }
    }

    useEffect(()=>{
        findOneAuthor()
    }, [])

    function handleBack(){
        navigate('/author')
    }

    async function handleEditSave(e){
        e.preventDefault()
        try{
            const docRef = doc(db,"bookstore",id)
            await updateDoc(docRef, {
                nome: nome,
                pseudonimo: pseudonimo,
                datanasc: datanasc, 
                cidade: cidade,
                pais: pais
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
                                <label>Nome</label>
                                <Form.Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>Pseudônimo</label>
                                <Form.Input type="text" value={pseudonimo} onChange={(e) => setPseudonimo(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>Data Nascimento</label>
                                <Form.Input type="text" value={datanasc} onChange={(e) => setNiver(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>Cidade Natal</label>
                                <Form.Input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col col="sm-6">
                                <label>País Natal</label>
                                <Form.Input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Button onClick={(e)=>handleEditSave(e)} primary type="submit">Atualizar</Button>     <Button onClick={()=>handleBack()} primary type="submit">Voltar</Button>
                </form>
            </div>
        </>
    )
}
export default EditAuthor
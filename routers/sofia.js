import express, { Router } from 'express';
import { info } from '../info_fotos_familia.js'
const { sofia } = info;
import { validateMomento, validateParcial } from '../schema/momentos.js';

//const crypto = require('node:crypto')


export const routerSofia = Router();
routerSofia.use(express.json())

routerSofia.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.send(sofia)
})

routerSofia.get('/:id', (req, res) => {
    const id = req.params.id
    
    let objeto = sofia.filter(el => el.id == id)
  
    if(objeto.length === 0){
        res.status(404).send(`Sofia no tiene un el elemento ${id}`)
    }else {
        res.send(objeto)
    }
})

routerSofia.post('/', (req, res) => {
    // const nuevoMomento = req.body
    // console.log(nuevoMomento)
    // sofia.push(nuevoMomento)
    // res.send(sofia)
    
    const result = validateMomento(req.body);
    console.log(result)

    if(!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const nuevoMomento = {
        fecha: new Date(req.body.fecha),
       ...result.data
    }
     sofia.push(nuevoMomento)
    res.status(201).send(sofia)

})

routerSofia.patch('/:id', (req, res) => {
    const id = req.params.id
    const indice = sofia.findIndex(el => el.id == id)
    const actualizarMomento = validateParcial(req.body)
// console.log(actualizarMomento)
    if(!actualizarMomento.success) return res.status(400).json({ erro: JSON.parse(actualizarMomento.error.message)})

    if(indice < 0) return res.status(404).json({ message : 'momento en la vida de sofia no encontrado' })
    
    const update = {
        ...sofia[indice],
        ...actualizarMomento.data
    }

    sofia[indice] = update
    res.send(update)
})

routerSofia.delete('/:id', (req, res) => {
    
    res.header('Access-Control-Allow-Origin', '*')
    const id  = req.params.id
    const indice = sofia.findIndex(el => el.id == id)
    
    if(indice === -1){
        return res.status(404).json({ message : 'momento no encontrado'})
    }
    
    sofia.splice(indice, 1)
    
    return res.json({ message : 'momento deleted'})
})

routerSofia.options('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.send(200)
})
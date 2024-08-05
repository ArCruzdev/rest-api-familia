import express, { Router } from 'express';
const app = express();

import { info } from './info_fotos_familia.js';
import { routerSofia } from './routers/sofia.js';

app.disable('x-powered-by') //quitar de nuestra cabecera con que esta ehco mi servidor.

app.use('/api/info/sofia', routerSofia);

const routerSantiago = Router()
app.use('/api/info/santiago', routerSantiago);

const routerAngelica = Router()
app.use('/api/info/angelica', routerAngelica)

const routerAriel = Router()
app.use('/api/info/ariel', routerAriel)

app.get('/', (req, res) => {
    res.send('Mi primer servidor')
})

app.get('/api/info', (req, res) => {
    const { integrante } = req.query

    if(integrante){
        if(info.hasOwnProperty(integrante)){
            res.send(info[integrante])
        }else {
            res.status(404).send(`no hay un integrante ${integrante} en la familia`)
        }
    } else {
        res.send(info)
    }
})


routerSantiago.get('/', (req, res) => {
    res.send(info.santiago)
})
routerAngelica.get('/', (req, res) => {
    res.send(info.angelica)
})
routerAriel.get('/', (req, res) => {
    res.send(info.ariel)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:${PORT}....`)
})
const express = require('express');
const app = express();
const serverName = 'EPA Server'
const PORT = 1960;
const methods = require('./queries')
app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next(); //pass control onto next app handler
})

app.get('/', (req, res, next)=>{
    methods.getDB()
    .then((response) =>{
        res.status(200).send(response)
    }
    )
    .catch((err)=>{
        res.status(500).send(err)
    })
})

app.get('/specific-search/:data', (req, res, next)=>{
    let {params:{data}} = req;
    data = JSON.parse(data);
    console.log(data)
    if(!Object.keys(data).filter((elem)=>data[elem] !== 'none' && data[elem] !== 'Any').length ){
        console.log('I selected everything');
        methods.getDB()
        .then((response) =>{
            res.status(200).send(response)
        }
        )
        .catch((err)=>{
            res.status(500).send(err)
        })
    }
    else{
        console.log(Object.keys(data))
        let query = `select * from ourproducts where`;
        const queryArray = [];
        
    
        let index = 1;
        for (const [selector, argument] of Object.entries(data)){
            if(selector !== 'Min-Price' && selector !== 'Max-Price' && argument !== 'none' && argument !== 'Any'){
                query += `${index === 1 ? '' : ' and'} ${selector} = $${index}`
                queryArray.push(argument)
                index ++
            }
            if(selector === 'Min-Price' || selector === 'Max-Price'){
                if(argument !== null){
    
                }
            }
        } 
        console.log(query, queryArray)
        methods.getSpecific(query, queryArray)
        .then((response)=>{
            res.status(200).send(response)
        })
        .catch((err)=>{
            res.status(500).send(err)
        })

    }
   
})

app.post('/stock', (req, res, next)=>{
    methods.createItem(req.body)
    .then((response)=>{
        res.status(201).send(response);
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
})

app.delete('/', (req, res, next)=>{
    methods.clearDatabase()
    .then((response)=>{
        res.status(204).send(response)
    })
    .catch((error)=>{res.status(500).send(error)})
})

app.delete('/:item_code', (req, res, next)=>{
    methods.deleteItem(req.params.item_code)
    .then((response)=>{
        res.status(204).send(response)
    })
    .catch((err)=>res.status(500).send(err))
})

app.listen(PORT, ()=>{
    console.log(`${serverName} listening on port ${PORT}`)
})
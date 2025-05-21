import express from 'express';

const app=express()
const port=3000

app.use(express.json())

let Data=[]
let nextId=1

app.post('/data',(req,res)=>{
    const {name,price}=req.body
    const newData={id:nextId++,name,price}
    Data.push(newData)
    res.status(201).send(newData)
})

app.get('/data',(req,res)=>{
    res.status(200).send(Data)
})

app.get('/data/:id',(req,res)=>{
    const data=Data.find(t=>t.id===req.params.id)
    if (!data){
        return res.status(404).send('Data Not Found')
    }
    res.status(200).send(data)
})

//updating Data

app.put('/data/:id',(req,res)=>{
    const data=Data.find(t=>t.id===req.params.id)
    if (!data){
        return res.status(404).send('Data Not Found')
    }
    const {name,price}=req.body
    data.name=name
    data.price=price
    res.send(200).send(data)
})

//deleting Data

app.delete('/data/:id',(req,res)=>{
    const index=Data.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send('Data Not Found')
    }
    Data.splice(index,1)
    return res.status(204).send('Deleted')
})

app.listen(port,()=>{
    console.log(`Server is running at port : ${port}...`);
    
})
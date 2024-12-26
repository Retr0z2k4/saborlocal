const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const nodemon = require('nodemon')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/revac2mib', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000  
})


//MODEL PADRÃO
const usuario = new mongoose.Usuario({

    nome : {type : String},
    email : {type :String, required : true },
    endereco : {type : String},
    numero : {type : Number},
    cep : {type : String, required : true},
    nascimento : {type : Date, required : true}

});

app.post("/cadastrousuario", async(req, res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const cep  = req.body.cep;
    const nascimento = req.body.nascimento

    if(nome == null || email == null || endereco == null || numero == null|| cep == null || nascimento == null){
        return res.status(400).json({error : "Todos os campos devem ser preenchidos"});
    }

    const Usuario = new Usuario({
        nome : nome,
        email : email,
        endereco : endereco,
        numero : numero,
        cep  : cep,
        nascimento : nascimento
    })

    try {
        const newUsuario= await Usuario.save();

        res.json({error : null, msg : "Cadastro feito com sucesso", UsuarioId : newUsuario._id});
    }
    catch(error){
        res.status(400).json({error});
    }
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.get("/cadastroUsuario", async(req, res)=>{
    res.sendFile(__dirname + "/cadastroUsuario.html")
})

//MODEL ESPECIFICA

const produtoartesanato = new mongoose.Schema({
   artesao: {type : String},
   descriçao: {type :String, required : true },
   dataCriaçao : {type : String},
   quantidadeEstoque : {type : Number},
   id_produtoartesanato: {type : Number, required : true},
});

app.post("/cadastrousuario", async(req, res)=>{
    const artesao = req.body.artesao;
    const descriçao = req.body.descriçao;
    const dataCriaçao  = req.body.dataCriaçao;
    const quantidadeEstoque = req.body.quantidadeEstoque;
    const id_produtoartesanato = req.body.id_produtoartesanato;
   

    if(artesao == null || descriçao == null || dataCriaçao == null || quantidadeEstoque == null|| id_produtoartesanato == null){
        return res.status(400).json({error : "Todos os campos devem ser preenchidos"});
    }

    const Cadastroespec = new Cadastroespec({
        artesao : artesao,
        descriçao : descriçao,
        dataCriaçao : dataCriaçao,
        quantidadeEstoque : quantidadeEstoque,
        id_produtoartesanato  :  id_produtoartesanato,
    })

    try {
        const Cadastroespe= await produto.save();

        res.json({error : null, msg : "Cadastro feito com sucesso",id_produtoartesanato : id_Newprodutoartesanato});
    }
    catch(error){
        res.status(400).json({error});
    }
});


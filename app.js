var http = require('http');
const {  Pool, CLient } = require('pg')
//var output = document.getElementById('output')

const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express');
const { json } = require('body-parser');
const encoder = bodyParser.urlencoded()
const jwt = require('jsonwebtoken')


const app = express()
app.use("/assets", express.static("assets"))
app.use(express.json())
//app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended : false } ))

app.listen(5000, () =>{
    console.log("Server Lsitening on Port: 5000")
})


const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'postgres',
  
  })

 pool.connect(function(error){

       if(error) throw error
       else console.log("DATABASE CONNECTED") 
 })


//  app.get("/",function(req,res){
//      res.sendFile(__dirname + "/index.html")
//  })

 pool.connect()
 app.post("/create",encoder,function(req,res){
        const user =  {username: "aaa",
                        password: "aaa"
                                }
        const token = jwt.sign({ user }, 'mytoken', {expiresIn: '30s'}) // create TOKEN
        res.json({
            token: token,
        })
        res.send("POST DATA")
 })



 app.get("/getdata", protectData ,function(req,res){
    jwt.verify(req.token, 'mytoken', function(err,data){ // check token
        if(err){
             res.sendStatus(403)
        } else {
            res.json({ 
                text: 'THIS IS TOKEN', 
                data:data
            })
        }
    })
  
 })

  function protectData (req, res, next){
        const bearerHeader = req.headers["authorization"]
      // res.send(bearerHeader)
        if(typeof bearerHeader !== 'undefined')
        {
            const bearer = bearerHeader.split(" ")
            const bearerToken = bearer[1]
            req.token = bearerToken
            next()
        } else {
            res.sendStatus(403)
        }
  } 

     //const newjwt = jwt
    //  const val = await auth(req);
     //   console.log(`MIddleware : ` , val.name)
    //   if (!val.name) return res.sendStatus(403)
    //   if (!val.pass) return res.sendStatus(403)
    // //  console.log(`Val.name : ${val.name}, VAl.pASS = ${val.pass}`)
    // //  console.log(`ENV NAME : ${process.env.ACCESS_NAME}, ENV PASS = ${process.env.ACCESS_PASSWORD}`)
    //   if (val.name.toLowerCase() !== process.env.ACCESS_NAME) return res.sendStatus(403)
    //   if(val.pass !== process.env.ACCESS_PASSWORD) return res.sendStatus(403)



    // const bearerHeader = req.headers["authorization"]
    //const bearerHeader = process.env.ACCESS_TOKEN_KEY
    //console.log(`BEARER HEADED: ${bearerHeader}`)
     // res.send(bearerHeader)
    //    if(typeof bearerHeader !== 'undefined')
    //    {
    //        const bearer = bearerHeader.split(" ")
    //        const bearerToken = bearer[1]
        //   console.log(`BEARER TOKEN: ${bearerToken}`)
        //    req.token = bearerToken
         //  console.log(req.token)
         
    //        jwt.verify(req.token, process.env.SECRET_KEY, function(err,data){ // check token
    //          if(err) res.sendStatus(403)         
    //           else {
    //               next()
    //           } 
                   
    //        })  
    //    } else {
    //        res.sendStatus(403)
    //    }
const express = require("express")
const router = express.Router()
const db = require("./firebase")
var fetch = require("node-fetch");

const {getDocs, collection} = require("firebase/firestore")

router.get("/info", async(req,res,next)=>{
    const allDocData = [];
    const docs = await getDocs(collection(db,"test"))
    docs.forEach((doc)=>allDocData.push(doc.data()))
    res.json({result:allDocData})
})

router.post("/attendance", async(req,res,next)=>{

    fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : req.body.apiKey
        },
        body: JSON.stringify({
            'query' : req.body.query,
            // 'variables' : JSON.stringify(req.body.vars)
        })
        })
        .then((res) => res.json())
        .then((result) => res.status(200).send(result));
        // .then(res => console.log(JSON.stringify(res, null, 2)));
       
})


router.post("/siteinfo", async(req,res,next)=>{

    fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ"
        },
        body: JSON.stringify({
            'query' : req.body.query,
            'variables' : JSON.stringify(req.body.vars)
        })
        })
        .then((res) => res.json())
        .then((result) => res.status(200).send(result))
        // .then(res => console.log(JSON.stringify(res, null, 2)));
       
})


module.exports = router
import React, {useEffect, useState, useContext} from 'react'
import {AccessTokenContext} from "../contexts/accessTokenContext"
import axios from "axios"


function Home() {
    const[info, setInfo] = useState([])
    const{accessToken, setAccessToken} = useContext(AccessTokenContext)
    let query = '{ boards (ids:2783211671) {name id  items {name column_values {value text type} } } }';

    useEffect(() =>{
        fetch("http://localhost:9000/demo/info?myParam=10")
        .then((res)=>res.json())
        .then((res)=>console.log(res))
        .then((text)=>setInfo(text.result))
        .catch((err)=>console.log(err))

        setAccessToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NTYwODI0MSwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMi0wNi0xNFQyMDoyMTo1Ny4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.BUyi3WsoBlpPvCBms9WUKfOufKFDNz6onxBm8h_jWGo")
        
    },[])

    const getAttendance = () =>{
      
        axios.post("http://localhost:9000/demo/attendance",{
            apiKey: accessToken,
            query: query
        })
        .then((res)=>console.log(res.data))
        .catch((err)=>console.log(err))

    }


    return (
        <div>
            <span>Firebase Test:</span>
           {info && info.map((item)=><p>{item.test}</p>)}
           <span>Monday API data:</span>
           <button onClick={getAttendance}>fetch</button>
        </div>
    )
}

export default Home

import React, {useState, useContext, useEffect} from 'react';
import {AccessTokenContext} from "../contexts/accessTokenContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function FormPage() {
    const[site,setSite] = useState("");
    const[siteCourse,setSiteCourse] = useState([]);
    const{accessToken, setAccessToken} = useContext(AccessTokenContext)
    let query = ' {boards (ids:1512429056) {name id  groups {title items {name} } } }';

    useEffect(()=>{
        setAccessToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NTYwODI0MSwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMi0wNi0xNFQyMDoyMTo1Ny4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.BUyi3WsoBlpPvCBms9WUKfOufKFDNz6onxBm8h_jWGo");
        getSite();
        console.log(accessToken)
    },[])
    const handleSiteChange=(e)=>{
        console.log(e.target.value);
        setSite(e.target.value)
    }

    const getSite = () =>{
      
        axios.post("http://localhost:9000/demo/siteinfo",{
            apiKey: accessToken,
            query: query
        })
        .then((res)=>res.data.data.boards[0])
        .then((data)=>data.groups.map((val,index)=> setSiteCourse(siteCourse=>[...siteCourse,{siteTitle:val.title,siteClasses:[...val.items]}])))
        .catch((err)=>console.log(err))

    }

    console.log(siteCourse)
    console.log(siteCourse.filter(s => site === s.siteTitle))


    return (
        <>
        <h1>Test Form</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="email" placeholder="Enter your last name and first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSite">
                <Form.Label>Site:</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleSiteChange}>
                <option>Select the site that you are in</option>
                    {siteCourse.map((val,index)=>(
                        <option value={val.siteTitle} >{val.siteTitle}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>Courses:</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Select the course that you are in</option>
                    {site && siteCourse.filter(s => site === s.siteTitle)[0].siteClasses
                    .map((val,index)=>(
                        <option value={val.name} >{val.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    )
}

export default FormPage

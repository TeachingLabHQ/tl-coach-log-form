import React, {useState, useContext, useEffect} from 'react';
import {AccessTokenContext} from "../contexts/accessTokenContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Col from 'react-bootstrap/esm/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormPage() {
    const[team,setTeam] = useState([]);
    const[projects,setProjects] = useState([{projectName:"",projectRole:"",projectHours:""}]);
    const[options,setOptions] = useState(["Shared Ops", "Program"]);
    const{accessToken, setAccessToken} = useContext(AccessTokenContext)
    let query = ' {boards (ids:1512429056) {name id  groups {title items {name} } } }';

    // useEffect(()=>{
    //     setAccessToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NTYwODI0MSwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMi0wNi0xNFQyMDoyMTo1Ny4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.BUyi3WsoBlpPvCBms9WUKfOufKFDNz6onxBm8h_jWGo");
    //     getSite();
    //     console.log(accessToken)
    // },[])
    const handleTeamChange=(e)=>{
        console.log(e.target.value);
        console.log(e.target.name);
        const projectTypes = ["Internal Project","Program-related Project"];
        if(e.target.value == "Shared Ops"){

            setTeam([projectTypes[0]])
        }
        else if(e.target.value == "Program"){

            setTeam([...projectTypes])
        }
    }

    const handleProjectChange=(i,e)=>{
        let newProjectValues = [...projects];
        newProjectValues[i][e.target.name] = e.target.value;
        setProjects(newProjectValues);
        console.log(projects);
    }
    const addProjectFields=()=>{
        setProjects([...projects,{projectName:"",projectRole:"",projectHours:""}])
    }
    const removeProjectFields=(i)=>{
        let currProjectValues = projects;
        currProjectValues.splice(i,1);
        setProjects([...currProjectValues]);
        console.log(projects);
    }
    // const getSite = () =>{
      
    //     axios.post("http://localhost:9000/demo/siteinfo",{
    //         apiKey: accessToken,
    //         query: query
    //     })
    //     .then((res)=>res.data.data.boards[0])
    //     .then((data)=>data.groups.map((val,index)=> setSiteCourse(siteCourse=>[...siteCourse,{siteTitle:val.title,siteClasses:[...val.items]}])))
    //     .catch((err)=>console.log(err))

    // }


    console.log(options)
 


    return (
        <>
        <h1>Test Form</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="email" placeholder="Enter your last name and first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter the date:</Form.Label>
                <Form.Control type="date" placeholder="Enter email" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicSite">
                <Form.Label>Which team are you on?</Form.Label>
                <Form.Select name="team-name" aria-label="Default select example" onChange={handleTeamChange}>
                     <option></option>
                    {options.map((val,idx)=>(
                        <option value={val}>{val}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>What type of projects do you want to log?</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option></option>
                    {team && team.map((val,index)=>(
                        <option value={val} >{val}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group  controlId="formBasicCourse"  >
                <Row className="align-items-center" style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
                    <Col sm={2} className="my-1"><Form.Label>Name of the Project</Form.Label></Col>
                    <Col sm={2} className="my-1"><Form.Label>Role of the Project</Form.Label></Col>
                    <Col sm={2} className="my-1"><Form.Label>Total Working Hours</Form.Label></Col>
                </Row>
                {projects.map((ele,idx)=>(
                    <Row className="align-items-center" style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
                        <Col sm={2} className="my-1">
                            <Form.Label visuallyHidden="true">name</Form.Label>
                            <Form.Select aria-label="Default select example" name="projectName" onChange={e=>handleProjectChange(idx,e)} >
                                <option></option>
                                <option>TL_Internal Program Evaluation</option>
                                <option>TL_LMS Transition to Canvas</option>
                            </Form.Select>
                        </Col>
                        <Col sm={2} className="my-1">
                            <Form.Label visuallyHidden="true">role</Form.Label>
                            <Form.Select aria-label="Default select example" name="projectRole" onChange={e=>handleProjectChange(idx,e)}>
                                <option></option>
                                <option>Project Lead</option>
                                <option>Analyst</option>
                            </Form.Select>
                        </Col>    
                        <Col sm={2} className="my-1">
                            <Form.Label visuallyHidden="true" >hours</Form.Label>
                            <Form.Control type="number" name="projectHours" onChange={e=>handleProjectChange(idx,e)} placeholder="Enter Time" />
                        </Col>
                        {projects.length>1 ? 
                        <Col sm={1} className="my-1">
                             <Button variant="danger" onClick={removeProjectFields}>X</Button>
                        </Col>
                        : null}
                        
                    </Row>
                ))}
                
            </Form.Group>
            <Button variant="secondary" onClick={addProjectFields}>+ Add Row</Button>

            
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    )
}

export default FormPage

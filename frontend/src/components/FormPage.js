import React, {useState, useContext, useEffect} from 'react';
import {AccessTokenContext} from "../contexts/accessTokenContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Col from 'react-bootstrap/esm/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import '../App.css';
import DatePicker from "react-datepicker";

function FormPage() {
    const[team,setTeam] = useState([]);
    const[projects,setProjects] = useState([{projectId: new Date().getTime(), projectName:"",projectRole:"",projectHours:0}]);
    const[options,setOptions] = useState(["Shared Ops", "Program", "Business Development","Finance","Learning & Research","Marketing & Communications","Office of the CEO",,"People & Culture","Technology","Fundraising","Innovation Studio"]);
    const[pjOptions,setPjOptions] = useState([]);
    const[internalPj,setInternalPj] = useState([
        "TL_Internal Program Evaluation",
        "TL_LMS Transition to Canvas",
        "TL_Technology Operations and Support"
    ]);
    const[programPj,setProgramPj] = useState([
        "CA_San Diego AMS Study", 
        "CA_West Contra Costa_Michelle Obama",
        "TL_Client Project Evaluation"
    ]);
    const [pickedDate, setPickedDate] = useState(new Date().setDate(new Date().getDate() - new Date().getDay() + 1));
    const{accessToken, setAccessToken} = useContext(AccessTokenContext);
    const [count,setCount] = useState(0);
 

    const handleTeamChange=(e)=>{
        console.log(e.target.value);
        console.log(3);
        const projectTypes = ["Internal Project","Program-related Project"];
        switch(e.target.value){
            case "Shared Ops": return setTeam([projectTypes[0]]);
            case "Finance": return setTeam([projectTypes[0]]);
            case "Marketing & Communications": return setTeam([projectTypes[0]]);
            case "People & Culture": return setTeam([projectTypes[0]]);
            case "Fundraising": return setTeam([projectTypes[0]]);
            case "Business Development": return setTeam([projectTypes[1]]);
            case "Program": return setTeam([projectTypes[1]]);
            case "Innovation Studio": return setTeam([projectTypes[1]]);
            case "Learning & Research": return setTeam([...projectTypes]);
            case "Office of the CEO": return setTeam([...projectTypes]);
            case "Technology": return setTeam([...projectTypes]);
            case "": return setTeam([]);

        }
    }

    const handleProjectChange=(i,e)=>{
        let newProjectValues = [...projects];
        let sumHours = 0;
        newProjectValues[i][e.target.name] = e.target.value;
        setProjects(newProjectValues);
        console.log(projects);
        if(e.target.name == "projectHours"){
            projects.forEach(e=>{
                if(e.projectHours==""){
                    sumHours += parseInt(0);
                }
                else{
                    sumHours += parseInt(e.projectHours);
                }
            })
            setCount(sumHours);
        }
    }

    const handleTypeChange=(e)=>{
        console.log(e.target.value);
        if(e.target.value == "Internal Project"){
            setPjOptions(internalPj);
        }
        else{
            setPjOptions(programPj);
        }
    }

    const addProjectFields=()=>{
        setProjects([...projects,{projectId:new Date().getTime(),projectName:"",projectRole:"",projectHours:""}])
    }
    const removeProjectFields=(ele)=>{
        if(ele.projectHours != ""){
            setCount(count-parseInt(ele.projectHours));
        }
        console.log(ele.projectId);
        const updatedList = projects.filter((object, i) => object.projectId != ele.projectId);
        setProjects(updatedList);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const personName = e.target.firstName.value+" "+e.target.lastName.value;
        console.log(personName);
        console.log(e.target.date.value);
        const dateValue = e.target.date.value;
        console.log(e.target.teamName.value);
        const teamName = e.target.date.value;
        console.log(e.target.projectType.value);
        const projectGenre = e.target.projectType.value;
        console.log(projects);

        let query = 'mutation ($myItemName: String!, $columnVals: JSON!, $groupName: String! ) { create_item (board_id:3962685859, group_id: $groupName, item_name:$myItemName, column_values:$columnVals) { id } }';
        let vars = {
        "groupName" : "new_group3217",
        "myItemName" : e.target.name.value,
        "columnVals" : JSON.stringify({
            "date8" : {"date" : dateValue},
            //program project 1 name
            "updated_programs_options":{"labels":(projectGenre=="Program-related Project" && 0<projects.length) ? [projects[0].projectName] : ["n/a"]},
            //internal project 1 name
            "dup__of_2__project_name9":{"labels": (projectGenre=="Internal Project" && 0<projects.length) ? [projects[0].projectName] : ["n/a"]} , 
            //project role 1
            "dup__of_2__what_is_your_role_in_the_project_6" : {"label" : (0<projects.length) ? projects[0].projectRole:"n/a"}, 
            //project hours 1
            "dup__of_2__how_many_hours_did_you_spend_this_week_on_the_selected_project_0" : (0<projects.length) ? projects[0].projectHours:"n/a"

        })
        };
        createItem(query,vars);
    }

   
    // useEffect(()=>{
    //     setAccessToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NTYwODI0MSwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMi0wNi0xNFQyMDoyMTo1Ny4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.BUyi3WsoBlpPvCBms9WUKfOufKFDNz6onxBm8h_jWGo");
    //     getSite();
    //     console.log(accessToken)
    // },[])

    const createItem = (query,vars) =>{
      
        axios.post("http://localhost:9000/demo/siteinfo",{
            apiKey: accessToken,
            query: query,
            vars:vars
        })
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))

    }


    console.log(options)
 


    return (
        <div className='formAll'>
        <div className='formSection'>
            <Form className='formBlock' onSubmit={handleSubmit}>
            <h1>Weekly Project Data Log Form</h1>
                <Form.Group className="mb-3" as={Col} controlId="formBasicName">
                    <Form.Label>Name:</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control name="firstName" type="text" placeholder="Enter your first name" />
                        </Col> 
                        <Col>
                            <Form.Control name="lastName" type="text" placeholder="Enter your last name" />
                        </Col>
                    </Row>
                </Form.Group>


                <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
                    <Form.Label>Enter the date:</Form.Label>
                    {/* <Form.Control  name="date" type="date" placeholder="Enter email" as="input"  /> */}
                    <div className='customDatePickerWidth'>
                        <DatePicker 
                        showIcon 
                        selected={pickedDate}
                        onChange={(date) => setPickedDate(date)}
                        filterDate={(date) => date.getDay() === 1}
                        name="date"
                        style={{width: "100%"}} />
                    </div>
                    
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicSite">
                    <Form.Label>Which team are you on?</Form.Label>
                    <Form.Select name="teamName" aria-label="Default select example" onChange={handleTeamChange}>
                        <option></option>
                        {options.map((val,idx)=>(
                            <option value={val}>{val}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCourse">
                    <Form.Label>What type of projects do you want to log?</Form.Label>
                    <Form.Select name="projectType" aria-label="Default select example" onChange={handleTypeChange}>
                        <option></option>
                        {team && team.map((val,index)=>(
                            <option value={val} >{val}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCapacity">
                    <Form.Label>Total Inputted Working Hours: <bold>{count}</bold></Form.Label>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicCourse"  >
                    <Row  >
                        <Col  className="my-1"><Form.Label>Project Name</Form.Label></Col>
                        <Col className="my-1"><Form.Label>Project Role</Form.Label></Col>
                        <Col className="my-1"><Form.Label>Working Hours</Form.Label></Col>
                        {projects.length>1 ? 
                            <Col sm={1} className="my-1">
                            </Col>
                            : null}
                    </Row>
                    {projects.map((ele,idx)=>(
                        <Row key={ele.projectId}>
                            <Col className="my-1" >
                                <Form.Label visuallyHidden="true">name</Form.Label>
                                <Form.Select  aria-label="Default select example" name="projectName" onChange={e=>handleProjectChange(idx,e)} >
                                    <option></option>
                                    {pjOptions.map((val)=>(
                                        <option value={val}>{val}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col className="my-1">
                                <Form.Label visuallyHidden="true">role</Form.Label>
                                <Form.Select aria-label="Default select example" name="projectRole" onChange={e=>handleProjectChange(idx,e)}>
                                    <option></option>
                                    <option>Project Lead</option>
                                    <option>Analyst</option>
                                </Form.Select>
                            </Col>    
                            <Col className="my-1">
                                <Form.Label visuallyHidden="true" >hours</Form.Label>
                                <Form.Control type="number" name="projectHours" min="0" onChange={e=>handleProjectChange(idx,e)} placeholder="Enter Time" />
                            </Col>

                            {projects.length>1 ? 
                                <Col sm={1} className="my-1">
                                    <Button variant="danger" onClick={()=>removeProjectFields(ele)}>X</Button>
                                </Col>
                            : null}
                            
                        </Row>
                    ))}
                </Form.Group>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Button variant="secondary" onClick={()=>addProjectFields()}>+ Add Row</Button> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCapacity">
                    <Form.Label>Do you feel you have the capacity to take on a new project?</Form.Label>
                    <Form.Select name="capacity" aria-label="Default select example" >
                        <option></option>
                        <option>Yes</option>
                        <option>No</option>
                    </Form.Select>
                </Form.Group>


                <div className='submitButton'>
                <Button className='submitButton' variant="primary" type="submit">
                    Submit
                </Button>
                </div>         
                
            </Form>
        </div>
        </div>
    )
}

export default FormPage

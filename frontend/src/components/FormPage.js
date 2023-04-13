import React, {useState, useContext, useEffect, createRef} from 'react';
import {AccessTokenContext} from "../contexts/accessTokenContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Col from 'react-bootstrap/esm/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import '../App.css';
import DatePicker from "react-datepicker";
import Alert from 'react-bootstrap/Alert';



function FormPage() {
    const getQuote = 'quote';
    const [quote,setQuote] = useState({sentence:"",author:""});
    const[team,setTeam] = useState([""]);
    const[projects,setProjects] = useState([{projectId: new Date().getTime(), projectType:"", projectName:"",projectRole:"",projectHours:0}]);
    const[options,setOptions] = useState(["Operations", "Program", "Business Development","Finance","Learning & Research","Marketing & Communications","Office of CEO",,"People & Culture","Technology","Fundraising","Innovation Studio"]);
    const[pjOptions,setPjOptions] = useState([]);
    const[employmentInfo,setEmploymentInfo] = useState([]);
    const[selectedTeam,setSelectedTeam] = useState();
    const [pickedDate, setPickedDate] = useState(new Date().setDate(new Date().getDate() - new Date().getDay() + 1));
    const{accessToken, setAccessToken} = useContext(AccessTokenContext);
    const [count,setCount] = useState(0);
    const pjTypeRef = createRef("");
    const [reminderInfo, setReminderInfo] = useState([]);
    const [popup, setPopup] = useState([]);
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
 
    // to get empolyee info from Monday whe the page loads
    useEffect(()=>{
        getEmployee();
        // getProjectCategorizaton();
        console.log(reminderInfo);
        fetch(`http://localhost:9000/demo/info?myParam=${getQuote}`)
        .then((res)=>res.json())
        .then((text)=>{setQuote({sentence:text.result[0].quotes[0].quoteContent,author:text.result[0].quotes[0].quoteAuthor})})
        .catch((err)=>console.log(err))
    },[])

    //employee information(name,deparment)
    const getEmployee=(e)=>{
        setEmploymentInfo([]);
        setReminderInfo([]);
        let query = "{boards(ids: [4271509592, 4266679896]) {items() { name column_values{text} }}}";
        return axios.post("http://localhost:9000/demo/getMonday",{
            query:query,
        })
        .then((res)=>res.data.data.boards)
        // .then((data)=>console.log(data[0]))
        .then((data)=>{
            data[0].items.map((v,index)=>
            setReminderInfo(reminderInfo=>(
                [...reminderInfo,{content:v.name, type:v.column_values[0].text}])
                ));
            data[1].items.map((val,index)=>
            setEmploymentInfo(employmentInfo=>(
                [...employmentInfo,{name:val.name, department:val.column_values[2].text}])
                ));
        })
        }

     //project Categorization
    //  const getProjectCategorization=(e)=>{
    //     let query = "{boards(ids: 4271509592) {items() { name column_values{text} }}}";
    //     axios.post("http://localhost:9000/demo/getMonday",{
    //         query:query,
    //     })
    //     .then((res)=>res.data.data.boards[0])
    //     .then((data)=>data.items.map((val,index)=>setReminder(reminder=>([...reminder,{content:val.name, type:val.column_values[0].text}]))));
    // }

    //auto select team when name is selected
    const handleNameTeamMatch=(e)=>{
        console.log(e.target.value.split(",")[1]);
        setSelectedTeam(e.target.value.split(",")[1]);
        handleTeamChange(e.target.value.split(",")[1]);
    }
    //only show certain project options when a team is selected
    const handleTeamChange=(e)=>{
        const projectTypes = ["Internal Project","Program-related Project"];
        console.log(e);
        var teamVal =  "";
        (e.target != undefined)? teamVal = e.target.value : teamVal = e;
        console.log(teamVal);
        switch(teamVal){
            case "Operations": setTeam([projectTypes[0]]); handleTypeChange(); break;
            case "Finance": setTeam([projectTypes[0]]); handleTypeChange();break;
            case "Marketing & Communications": setTeam([projectTypes[0]]); handleTypeChange();break;
            case "People & Culture": setTeam([projectTypes[0]]);handleTypeChange(); break;
            case "Fundraising": setTeam([projectTypes[0]]); handleTypeChange();break;
            case "Business Development": setTeam([projectTypes[1]]); handleTypeChange();break;
            case "Program": setTeam([projectTypes[1]]); handleTypeChange();break;
            case "Innovation Studio": setTeam([projectTypes[1]]);handleTypeChange(); break;
            case "Learning & Research": setTeam([...projectTypes]);handleTypeChange(); break;
            case "Office of CEO": setTeam([...projectTypes]); handleTypeChange();break;
            case "Technology":setTeam([...projectTypes]);handleTypeChange(); break;
            case "": setTeam([]); break;
        }
    }

    //update project list
    const handleProjectChange=(i,e,pjId)=>{
        let newProjectValues = [...projects];
        let sumHours = 0;
        //update project information (project name/role/time)
        newProjectValues[i][e.target.name] = e.target.value;
        setProjects(newProjectValues);
        //add popup reminders
        if(e.target.name == "projectName"){
            console.log(e.target.value);
            console.log(reminderInfo);
            var reminderNeed = reminderInfo.filter((ele)=>{return ele.content == e.target.value })
            var reminderExisted = popup.filter((ele)=>{return ele.reminderId == pjId })
            if(reminderNeed && reminderExisted.length == 0){
                console.log(1);
                setPopup([...popup,{reminderId:pjId,reminderContent:reminderNeed[0].type}]);
            }
            else if(reminderNeed && reminderExisted.length != 0){

                const updatedReminder = popup.map((object, i) => {if(object.reminderId == pjId){object.reminderContent=reminderNeed[0].type}return object});

                setPopup(updatedReminder);
            }
 
        }
        //add hours to the total time counter
        if(e.target.name == "projectHours"){
            projects.forEach(e=>{
                if(e.projectHours==""){
                    sumHours += parseInt(0);
                }
                else{
                    sumHours += parseFloat(e.projectHours);
                }
            })
            setCount(sumHours);
        }
    }

    //only show certain project when a project type is selecte
    const handleTypeChange=(e,ele)=>{
        //if it is either one
        if(typeof e == "object"){
            var exist = pjOptions.filter((e)=>{return e.hasOwnProperty(ele.projectId)});
            if(e.target.value == "Internal Project" ){
                if(exist.length != 0){
                    setPjOptions(pjOptions.map((e)=>{if(e.hasOwnProperty(ele.projectId)){e[ele.projectId]=internalPj}return e}));
                }
                else{
                    setPjOptions([...pjOptions,{[ele.projectId]:internalPj}]);
                }
                
            }
            else if(e.target.value == "Program-related Project" ){
                if(exist.length != 0){
                    setPjOptions(pjOptions.map((e)=>{if(e.hasOwnProperty(ele.projectId)){e[ele.projectId]=programPj}return e}));
                }
                else{
                    setPjOptions([...pjOptions,{[ele.projectId]:programPj}]);
                }
            }
            else{
                if(exist.length != 0){
                    setPjOptions(pjOptions.map((e)=>{if(e.hasOwnProperty(ele.projectId)){e[ele.projectId]=[]}return e}));
                }
            }
        }
        //if the team is changed, clear all project inputs
        else{
            setProjects([{projectId: new Date().getTime(), projectType:"",projectName:"",projectRole:"",projectHours:0}]);
            setPjOptions([]);
        }
    }

    //add project rows into the widget
    const addProjectFields=()=>{
        setProjects([...projects,{projectId:new Date().getTime(),projectType:"",projectName:"",projectRole:"",projectHours:""}])
    }

    //remove project row from the widget
    const removeProjectFields=(ele)=>{
        if(ele.projectHours != ""){
            setCount(count-parseFloat(ele.projectHours));
        }
        const updatedList = projects.filter((object, i) => object.projectId != ele.projectId);
        setProjects(updatedList);
    }



    //organize form data before submitting them to Monday
    const handleSubmit=(e)=>{
        e.preventDefault();
        const personName = e.target.employeeName.value.split(",")[0];
        console.log(personName);
        const dateValue = new Date(e.target.date.value);
        const month = ("0" + (dateValue.getMonth() + 1)).slice(-2)
        const day = ("0" + dateValue.getDate()).slice(-2);
        const year = dateValue.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        // console.log(formattedDate);
        // console.log(e.target.teamName.value);
        const teamName = e.target.date.value;
        // console.log(e.target.projectType.value);
        const projectGenre = e.target.projectType.value;
        // console.log(projects);

        let query = 'mutation ($myItemName: String!, $columnVals: JSON!, $groupName: String! ) { create_item (board_id:4284585496, group_id: $groupName, item_name:$myItemName, column_values:$columnVals) { id } }';
        let vars = {
        "groupName" : "topics",
        "myItemName" : personName,
        "columnVals" : JSON.stringify({
            "date4" : {"date" : formattedDate},
            // //program project 1 name
            // "updated_programs_options":{"labels":(projectGenre=="Program-related Project" && 0<projects.length) ? [projects[0].projectName] : ["n/a"]},
            // //internal project 1 name
            // "dup__of_2__project_name9":{"labels": (projectGenre=="Internal Project" && 0<projects.length) ? [projects[0].projectName] : ["n/a"]} , 
            // //project role 1
            // "dup__of_2__what_is_your_role_in_the_project_6" : {"label" : (0<projects.length) ? projects[0].projectRole:"n/a"}, 
            // //project hours 1
            // "dup__of_2__how_many_hours_did_you_spend_this_week_on_the_selected_project_0" : (0<projects.length) ? projects[0].projectHours:"n/a"

        })
        };
        createItem(query,vars);
    }

    //push data to Monday
    const createItem = (query,vars) =>{
        axios.post("http://localhost:9000/demo/boardUpdate",{
            apiKey: accessToken,
            query: query,
            vars:vars
        })
        //item id
        .then((res)=>console.log(res.data.data.create_item.id))
        .catch((err)=>console.log(err))
    }


    const toggleShowA = (ele)=>{
        console.log(111);
        const updatedReminder = popup.filter((object, i) => {return object.reminderId != ele.projectId});
        console.log(updatedReminder);
        setPopup(updatedReminder);
    }

    return (
        <div className='formAll'>
        <div className='formSection'>

            <Form className='formBlock' onSubmit={handleSubmit}>
            <h1>Weekly Project Data Log Form</h1>
            <Form.Group className="mb-5" as={Col} controlId="formBasicEmail">
                    <Form.Label><strong>Enter the Monday of the week:</strong></Form.Label>
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
                
            <Form.Group className="mb-5" controlId="formBasicSite">
                    <Form.Label><strong>What's your name?</strong></Form.Label>
                    <Form.Select name="employeeName" aria-label="Default select example" onChange={handleNameTeamMatch}>
                        <option></option>
                        {employmentInfo.map((val,idx)=>(
                            <option value={[val.name, val.department]}>{val.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-5" controlId="formBasicSite">
                    <Form.Label><strong>Which team are you on?</strong></Form.Label>
                    <Form.Select name="teamName" aria-label="Default select example"  onChange={handleTeamChange}>
                        <option></option>
                        {options.map((val,idx)=>(
                            (selectedTeam == val)?<option value={val} selected >{val}</option>:
                            <option value={val} >{val}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* <Form.Group className="mb-1" controlId="formCapacity">
                    <Form.Label>Total Hours: <bold>{count}</bold></Form.Label>
                </Form.Group> */}
                
                <Form.Group className="mb-3" controlId="formBasicCourse"  >
                    <Row >
                        <Col  className="my-1"><Form.Label><strong>Project Type</strong></Form.Label></Col>
                        <Col  className="my-1"><Form.Label><strong>Project Name</strong></Form.Label></Col>
                        <Col className="my-1"><Form.Label><strong>Project Role</strong></Form.Label></Col>
                        <Col className="my-1"><Form.Label><strong>Work Hours</strong></Form.Label></Col>
                        {projects.length>1 ? 
                            <Col sm={1} className="my-1">
                            </Col>
                            : null}
                    </Row>
                    {projects.map((ele,idx)=>(
                        <Row key={ele.projectId}>
                            <Row>
                            <Col className="my-1" >
                                <Form.Label visuallyHidden="true">type</Form.Label>
                                <Form.Select name="projectType" aria-label="Default select example" ref={pjTypeRef} onChange={e=>handleTypeChange(e,ele)}>
                                    <option></option>
                                    {team && team.map((val,index)=>(
                                        <option value={val} >{val}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col className="my-1" >
                                <Form.Label visuallyHidden="true">name</Form.Label>
                                <Form.Select  aria-label="Default select example" name="projectName"  onChange={e=>handleProjectChange(idx,e,ele.projectId)} >
                                    <option></option>
                                    {pjOptions && pjOptions.map((value)=>( value.hasOwnProperty(ele.projectId)? value[ele.projectId].map((v,idx)=>(<option value={v}>{v}</option>)) :null))

                                    }
                                    {/* {pjOptions.has(ele.projectId) ? pjOptions[ele.projectId].map((v)=>(<option value={v}>{v}</option>)) : (<option></option>)} */}
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
                            {popup.map((el,idx)=>(
                                (el.reminderId == ele.projectId) ?
                            <Alert key='info' variant='info' onClose={() => toggleShowA(ele)} dismissible>
                           Note:This will go to {el.reminderContent}
                          </Alert> :null
                                
                           ))}
                        </Row>
                        
                    ))}
                </Form.Group>

                <Form.Group className="mb-4" id="formGridCheckbox">
                    <Button variant="secondary" onClick={()=>addProjectFields()}>+ Add Row</Button> 
                </Form.Group>

                <Form.Group className="mb-5" controlId="formCapacity">
                    <Form.Label><strong>Do you feel you have the capacity to take on a new project?</strong></Form.Label>
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
            <div className='notificationAisle'>
                <div className='quoteContainer'>
                    <h4>Quote of the Week</h4>
                    <h6>{quote.sentence}</h6>
                    <h6>{quote.author}</h6>
                </div>
                <div className='timeCounter'>
                    <h3>Total Time</h3>
                    <h1>{count}</h1>
                </div>
                
            
            </div>
       
        </div>
        </div>
        
    )
}

export default FormPage

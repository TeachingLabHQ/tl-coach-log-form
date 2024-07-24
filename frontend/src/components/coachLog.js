/* eslint-disable no-sparse-arrays */
/* eslint-disable default-case */
import React, { useState, useContext, useEffect, createRef } from "react";
import { AccessTokenContext } from "../contexts/accessTokenContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import "../App.css";
import DatePicker from "react-datepicker";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Divider } from "@chakra-ui/react";
import { CoachingQuestion } from "./coach-log/CoachingQuestion";
import { EmployeeNameQuestion } from "./utils/EmployeeNameQuestion";
import { DateQuestion } from "./utils/DateQuestion";
import { DistrictSchoolQuestion } from "./coach-log/DistrictSchoolQuestion";
import { MicroPLQuestion } from "./coach-log/MicroPLQuestion";

function CoachFormPage() {
  const [team, setTeam] = useState([""]);
  const [projects, setProjects] = useState([
    {
      projectId: new Date().getTime(),
      projectType: "",
      projectName: "",
      projectRole: "",
      projectHours: 0,
    },
  ]);
  const [options, setOptions] = useState([
    "Operations",
    "Program",
    "Business Development",
    "Finance",
    "Learning & Research",
    "Strategy & Communications",
    "Office of the CEO",
    ,
    "People & Culture",
    "Technology",
    "Fundraising",
    "Innovation Studio",
  ]);
  const [pjOptions, setPjOptions] = useState([{ "": "" }]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [pickedDate, setPickedDate] = useState(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
  );
  const [formattedDateStart, setFormattedDateStart] = useState();
  const [formattedDateEnd, setFormattedDateEnd] = useState();
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [count, setCount] = useState(0);
  const pjTypeRef = createRef("");
  const [reminderInfo, setReminderInfo] = useState([]);
  const [popup, setPopup] = useState([]);
  const [internalPj, setInternalPj] = useState([]);
  const [programPj, setProgramPj] = useState([]);
  const [validated, setValidated] = useState(false);
  const [errorCheck, setErrorCheck] = useState();
  const [submitCheck, setSubmitCheck] = useState();
  const [capCheck, setCapCheck] = useState();
  const [nameCheck, setNameCheck] = useState();
  const [schoolByDistrict, setSchoolByDistrict] = useState({});
  const [orgUpdate, setOrgUpdate] = useState([]);
  const randomIdx = Math.floor(Math.random() * 4);
  const openModal = true;
  const modalBody =
    "New projects are created when partner contracts have been signed, or internal project budgets have been created. " +
    "If you do not see your client project listed in the drop down, please contact Daissan Colbert(daissan.colbert@teachinglab.org) and Kelly Sanders(kelly.sanders@teachinglab.org).";

  const pjRoles = [
    {
      target: { name: "projectRole", value: "Analyst" },
      label: "Analyst",
      value: "Analyst",
    },
    {
      target: { name: "projectRole", value: "Client/Partnership Manager" },
      label: "Client/Partnership Manager",
      value: "Client/Partnership Manager",
    },
    {
      target: { name: "projectRole", value: "Coach Coordinator" },
      label: "Coach Coordinator",
      value: "Coach Coordinator",
    },
    {
      target: { name: "projectRole", value: "Facilitator/Coach" },
      label: "Facilitator/Coach",
      value: "Facilitator/Coach",
    },
    {
      target: { name: "projectRole", value: "Instructional Designer" },
      label: "Instructional Designer",
      value: "Instructional Designer",
    },
    {
      target: { name: "projectRole", value: "Project Lead" },
      label: "Project Lead",
      value: "Project Lead",
    },
    {
      target: { name: "projectRole", value: "Project Sponsor" },
      label: "Project Sponsor",
      value: "Project Sponsor",
    },
    {
      target: { name: "projectRole", value: "Project Management Support" },
      label: "Project Management Support",
      value: "Project Management Support",
    },
    {
      target: { name: "projectRole", value: "Subject Matter Expert" },
      label: "Subject Matter Expert",
      value: "Subject Matter Expert",
    },
    {
      target: { name: "projectRole", value: "Tech Engineer/Developer" },
      label: "Tech Engineer/Developer",
      value: "Tech Engineer/Developer",
    },
    {
      target: { name: "projectRole", value: "Other" },
      label: "Other",
      value: "Other",
    },
  ];

  //get information from Monday and format the current date when the page loads
  useEffect(() => {
    getMondayInfo();
  }, []);

  //get employee information(name,deparment)/reminder info from FTE/PTE board and
  const getMondayInfo = (e) => {
    let districtQuery =
      "{boards(ids:6477891110){items_page(limit:500) {cursor items {name group{title}}}}}";
    axios.post("/demo/getMonday", { query: districtQuery }).then((res) => {
      let schoolsByDistrict = {};
      res.data.data.boards[0].items_page.items.forEach((e) => {
        const districtName = e.group.title;
        const schoolName = e.name;
        if (!schoolsByDistrict[districtName]) {
          schoolsByDistrict[districtName] = [e.name];
        } else {
          schoolsByDistrict[districtName].push(schoolName);
        }
      });
      setSchoolByDistrict(schoolsByDistrict);
    });
  };

  //only show certain project options when a team is selected
  const handleTeamChange = (e) => {
    const projectTypes = ["Internal Project", "Program-related Project"];
    var teamVal = "";
    e.target != undefined ? (teamVal = e.target.value) : (teamVal = e);
    switch (teamVal) {
      case "Operations":
        setTeam([...projectTypes]);
        handleTypeChange();
        break;
      case "Finance":
        setTeam([...projectTypes]);
        handleTypeChange();
        break;
      case "Strategy & Communications":
        setTeam([projectTypes[0]]);
        handleTypeChange();
        break;
      case "People & Culture":
        setTeam([projectTypes[0]]);
        handleTypeChange();
        break;
      case "Fundraising":
        setTeam([projectTypes[0]]);
        handleTypeChange();
        break;
      case "Business Development":
        setTeam([projectTypes[1]]);
        handleTypeChange();
        break;
      case "Program":
        setTeam([projectTypes[1]]);
        handleTypeChange();
        break;
      case "Innovation Studio":
        setTeam([projectTypes[1]]);
        handleTypeChange();
        break;
      case "Learning & Research":
        setTeam([...projectTypes]);
        handleTypeChange();
        break;
      case "Office of the CEO":
        setTeam([...projectTypes]);
        handleTypeChange();
        break;
      case "Technology":
        setTeam([...projectTypes]);
        handleTypeChange();
        break;
      case "":
        setTeam([]);
        break;
    }
  };

  //document projects logged by users in an array
  const handleProjectChange = (i, e, pjId) => {
    let newProjectValues = [...projects];
    let sumHours = 0;
    //update project information (project name/role/time)
    newProjectValues[i][e.target.name] = e.target.value;
    //auto select project role as "other" when select admin options for project name
    if (
      e.target.value == "TL_Internal Admin" ||
      e.target.value == "TL_Programmatic Admin"
    ) {
      newProjectValues[i]["projectRole"] = "Other";
    }
    setProjects(newProjectValues);

    //add hours to the time counter
    if (e.target.name == "projectHours") {
      projects.forEach((e) => {
        if (e.projectHours == "") {
          sumHours += parseInt(0);
        } else {
          sumHours += parseFloat(e.projectHours);
        }
      });
      setCount(sumHours);
    }
  };

  //only show certain project when a project type is selected
  const handleTypeChange = (e, ele) => {
    //if it is either one
    if (typeof e == "object") {
      var exist = pjOptions.filter((e) => {
        return e.hasOwnProperty(ele.projectId);
      });
      if (e.target.value == "Internal Project") {
        if (exist.length != 0) {
          setPjOptions(
            pjOptions.map((e) => {
              if (e.hasOwnProperty(ele.projectId)) {
                e[ele.projectId] = internalPj[0];
              }
              return e;
            })
          );
        } else {
          setPjOptions([...pjOptions, { [ele.projectId]: internalPj[0] }]);
        }
      } else if (e.target.value === "Program-related Project") {
        if (exist.length !== 0) {
          setPjOptions(
            pjOptions.map((e) => {
              if (e.hasOwnProperty(ele.projectId)) {
                e[ele.projectId] = programPj[0];
              }
              return e;
            })
          );
        } else {
          setPjOptions([...pjOptions, { [ele.projectId]: programPj[0] }]);
        }
      } else {
        if (exist.length !== 0) {
          setPjOptions(
            pjOptions.map((e) => {
              if (e.hasOwnProperty(ele.projectId)) {
                e[ele.projectId] = [];
              }
              return e;
            })
          );
        }
      }
    }
    //if the team name is manually reselected, clear all project inputs
    else {
      setProjects([
        {
          projectId: new Date().getTime(),
          projectType: "",
          projectName: "",
          projectRole: "",
          projectHours: 0,
        },
      ]);
      setPjOptions([{ "": "" }]);
    }
  };

  //show additional question if user say yes to capcity question
  const handleCapacity = (e) => {
    if (e.target.value == "Yes") {
      setCapCheck(true);
    } else {
      setCapCheck(false);
    }
  };

  //add project rows into the widget
  const addProjectFields = () => {
    setProjects([
      ...projects,
      {
        projectId: new Date().getTime(),
        projectType: "",
        projectName: "",
        projectRole: "",
        projectHours: "",
      },
    ]);
  };

  //delete project row from the widget
  const removeProjectFields = (ele) => {
    if (ele.projectHours != "") {
      setCount(count - parseFloat(ele.projectHours));
    }
    const updatedList = projects.filter(
      (object, i) => object.projectId != ele.projectId
    );
    setProjects(updatedList);
    const updatedpjOptionList = pjOptions.filter(
      (object, i) => object != ele.projectId
    );
    setPjOptions(updatedpjOptionList);
  };

  //submit data to Monday in the projet log board (https://teachinglab.monday.com/boards/4284585496/views/99921004)
  const handleSubmit = (e) => {
    setErrorCheck();
    setSubmitCheck();
    const form = e.currentTarget;
    //form validation
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setSubmitCheck(false);
    } else {
      e.preventDefault();
      setValidated(true);
      setSubmitCheck(true);
      const personName = nameCheck
        ? e.target.employeeNameManual.value
        : e.target.employeeName.value.split(",")[0];
      const dateValue = new Date(e.target.date.value);
      const month = ("0" + (dateValue.getMonth() + 1)).slice(-2);
      const day = ("0" + dateValue.getDate()).slice(-2);
      const year = dateValue.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;

      const teamName = e.target.date.value;
      const capacity = e.target.capacity.value;
      const extraHours =
        e.target.additionalHours == undefined
          ? 0
          : e.target.additionalHours.value;
      const comment = e.target.comment.value;
      let totalHours = projects.reduce((a, b) => {
        return a + parseFloat(b.projectHours);
      }, 0);
      //create parent items
      let queryParent =
        "mutation ($myItemName: String!, $columnVals: JSON!, $groupName: String! ) { create_item (board_id:4284585496, group_id: $groupName, item_name:$myItemName, column_values:$columnVals) { id } }";
      let varsParent = {
        groupName: "topics",
        myItemName: personName,
        columnVals: JSON.stringify({
          date4: { date: formattedDate },
          // capacity
          status1: { label: capacity },
          //total hours
          numbers8: totalHours,
          //additional hours
          numbers85: extraHours,
          //comment
          notes: comment,
        }),
      };

      // create subitems on Monday
      createItem(queryParent, varsParent).then((response) => {
        for (var i = 0; i < projects.length; i++) {
          const parentID = response;
          const projectName = projects[i].projectName;
          const projectGenre = projects[i].projectType;
          const projectRole = projects[i].projectRole;
          const projectHours = projects[i].projectHours;
          let querySub =
            "mutation ($myItemName: String!,$parentID: ID!, $columnVals: JSON! ) { create_subitem (parent_item_id:$parentID, item_name:$myItemName, column_values:$columnVals) { id } }";
          let varsSub = {
            myItemName: personName,
            parentID: String(parentID),
            columnVals: JSON.stringify({
              date: { date: formattedDate },
              project_role: projectRole,
              //project type
              project_type: projectGenre,
              //project name
              name6: projectName,
              //project hours
              numbers: parseFloat(projectHours),
            }),
          };
          const myTimeout = setTimeout(setErrorCheck(false), 60000);
          createItemSub(querySub, varsSub).then((e) => {
            console.log(e);
            if (
              e.data.hasOwnProperty("errors") ||
              (e.status < 600 && e.status > 399)
            ) {
              setErrorCheck(true);
            } else {
              setErrorCheck(false);
            }
            clearTimeout(myTimeout);
            console.log(e);
          });
        }
      });
    }
  };

  //push parent item data to Monday
  const createItem = (query, vars) => {
    return (
      axios
        .post("demo/boardUpdate", {
          apiKey: accessToken,
          query: query,
          vars: vars,
        })
        //item id
        .then((res) => res.data.data.create_item.id)
        .catch((err) => err)
    );
  };

  //push subitem data to Monday
  const createItemSub = (query, vars) => {
    return (
      axios
        .post("/demo/boardUpdate", {
          apiKey: accessToken,
          query: query,
          vars: vars,
        })
        //item id
        .then((res) => res)
        .catch((err) => err)
    );
  };

  const toggleShowA = (ele) => {
    const updatedReminder = popup.filter((object, i) => {
      return object.reminderId != ele.projectId;
    });
    setPopup(updatedReminder);
  };
  const [districtSelected, setDistrictSelected] = useState();
  const [schoolSelected, setSchoolSelected] = useState();

  return (
    <div className="formAll">
      <div className="formSection">
        <Form
          className="formBlock"
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          <h1>Coach Log Form</h1>
          <DateQuestion />
          <EmployeeNameQuestion />
          <DistrictSchoolQuestion
            setDistrictSelected={setDistrictSelected}
            setSchoolSelected={setSchoolSelected}
          />

          <CoachingQuestion
            districtSelected={districtSelected}
            schoolSelected={schoolSelected}
            projects={projects}
            team={team}
            pjRoles={pjRoles}
            pjTypeRef={pjTypeRef}
            pjOptions={pjOptions}
            handleTypeChange={handleTypeChange}
            handleProjectChange={handleProjectChange}
            removeProjectFields={removeProjectFields}
            addProjectFields={addProjectFields}
          />
          <MicroPLQuestion
            districtSelected={districtSelected}
            schoolSelected={schoolSelected}
          />

          <Form.Group className="mb-5" controlId="formBasicSite">
            <Form.Label>
              <strong>Do you have any additional comments? </strong>
            </Form.Label>
            <Form.Control
              name="comment"
              as="textarea"
              rows={4}
              aria-label="Default select example"
            ></Form.Control>
            <strong>
              *Please use this notes section to add details about time
              allocation this week. If you have concerns about your capacity or
              your projects, please discuss with your home manager and/or
              project lead.
            </strong>
          </Form.Group>

          <div className="submitButton">
            <Button
              className="submitButton mb-3"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>

          {submitCheck == true && errorCheck == undefined ? (
            <Spinner animation="border" variant="light" />
          ) : null}
          {submitCheck == false ? (
            <Alert key="warning" variant="warning">
              Error: Please make sure all required fields (*) are filled out.
            </Alert>
          ) : null}
          {errorCheck == false ? (
            <Alert key="success" variant="success">
              Your log is submitted successfully!
            </Alert>
          ) : null}
          {errorCheck == true ? (
            <Alert key="danger" variant="danger">
              Something went wrong! If this happens constantly, please contact
              project management or technology team.
            </Alert>
          ) : null}
        </Form>
      </div>
    </div>
  );
}

export default CoachFormPage;

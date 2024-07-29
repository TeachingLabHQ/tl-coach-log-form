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
import { ModelQuestion } from "./coach-log/ModelQuestion";
import { AdminQuestion } from "./coach-log/AdminQuestion";
import { ReasonQuestion } from "./coach-log/ReasonQuestion";
import { AdminWalkthroughQuestion } from "./coach-log/AdminWalkthroughQuestion";
import { ModeQuestion } from "./coach-log/ModeQuestion";

function CoachFormPage() {
  const [team, setTeam] = useState([""]);
  const [coachingLogs, setCoachingLogs] = useState([
    {
      logId: new Date().getTime(),
      coacheeName: "",
      coacheeRole: "",
      coachingActivity: "",
      coachingDuration: 0,
    },
  ]);
  const [count, setCount] = useState(0);
  const pjTypeRef = createRef("");
  const [validated, setValidated] = useState(false);
  const [errorCheck, setErrorCheck] = useState();
  const [submitCheck, setSubmitCheck] = useState();
  const [schoolByDistrict, setSchoolByDistrict] = useState({});
  const [selectedMicroPLParticipants, setSelectedMicroPLParticipants] =
    useState([]);
  const [selectedMicroPLParticipantRoles, setSelectedMicroPLParticipantRoles] =
    useState([]);
  const [selectedModelParticipants, setSelectedModelParticipants] = useState(
    []
  );
  const [selectedModelParticipantRoles, setSelectedModelParticipantRoles] =
    useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [originalSessions, setOriginalSessions] = useState([]);

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

  //store coach logs in an array
  const handleCoachingLogsChange = (i, e) => {
    let latestCoachingLogs = [...coachingLogs];
    let sumHours = 0;
    //update coaching entry
    latestCoachingLogs[i][e.target.name] = e.target.value;
    setCoachingLogs(latestCoachingLogs);

    //add hours to the time counter
    if (e.target.name === "coachingDuration") {
      coachingLogs.forEach((e) => {
        if (e.coachingDuration === "") {
          sumHours += parseInt(0);
        } else {
          sumHours += parseFloat(e.coachingDuration);
        }
      });
      setCount(sumHours);
    }
  };

  //add logs into the widget
  const addProjectFields = () => {
    setCoachingLogs([
      ...coachingLogs,
      {
        logId: new Date().getTime(),
        coacheeName: "",
        coacheeRole: "",
        coachingActivity: "",
        coachingDuration: 0,
      },
    ]);
  };

  //delete logs from the widget
  const removeProjectFields = (ele) => {
    if (ele.coachingDuration !== "") {
      setCount(count - parseFloat(ele.coachingDuration));
    }
    console.log(ele.logId);
    const updatedList = coachingLogs.filter(
      (object, i) => object.logId !== ele.logId
    );
    setCoachingLogs(updatedList);
  };

  //submit data to Monday in the coach log board
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
      const coachName = e.target.coachNameManual
        ? e.target.coachNameManual.value
        : e.target.coachName.value;

      const dateValue = new Date(e.target.date.value);
      const month = ("0" + (dateValue.getMonth() + 1)).slice(-2);
      const day = ("0" + dateValue.getDate()).slice(-2);
      const year = dateValue.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;

      const district = e.target.districtName.value;
      const school = e.target.schoolName.value;
      const microPLParticipants = selectedMicroPLParticipants;
      const microPLParticipantRoles = selectedMicroPLParticipantRoles;
      const microPLDuration = e.target.microPLDuration.value;
      const microPLTopic = e.target.microPLTopic.value;
      console.log("microPLParticipants", microPLParticipants);
      console.log("microPLParticipantRoles", microPLParticipantRoles);
      console.log("microPLDuration", microPLDuration);
      console.log("microPLTopic", microPLTopic);
    }
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
            coachingLogs={coachingLogs}
            pjTypeRef={pjTypeRef}
            handleCoachingLogsChange={handleCoachingLogsChange}
            removeProjectFields={removeProjectFields}
            addProjectFields={addProjectFields}
          />
          <MicroPLQuestion
            districtSelected={districtSelected}
            schoolSelected={schoolSelected}
            setSelectedMicroPLParticipantRoles={
              setSelectedMicroPLParticipantRoles
            }
            setSelectedMicroPLParticipants={setSelectedMicroPLParticipants}
          />
          <ModelQuestion
            districtSelected={districtSelected}
            schoolSelected={schoolSelected}
            setSelectedModelParticipants={setSelectedModelParticipants}
            setSelectedModelParticipantRoles={setSelectedModelParticipantRoles}
          />
          <AdminQuestion
            districtSelected={districtSelected}
            schoolSelected={schoolSelected}
            setSelectedAdmins={setSelectedAdmins}
          />
          <AdminWalkthroughQuestion />
          <ReasonQuestion
            districtSelected={districtSelected}
            schoolSelected={schoolSelected}
            setOriginalSessions={setOriginalSessions}
          />
          <ModeQuestion />

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

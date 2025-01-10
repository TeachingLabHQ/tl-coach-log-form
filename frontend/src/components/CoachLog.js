/* eslint-disable no-sparse-arrays */
/* eslint-disable default-case */
import axios from "axios";
import React, { createRef, useContext, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";
import { AccessTokenContext } from "../contexts/accessTokenContext";
import { AdminQuestion } from "./coach-log/AdminQuestion";
import { AdminWalkthroughQuestion } from "./coach-log/AdminWalkthroughQuestion";
import { CoachingQuestion } from "./coach-log/CoachingQuestion";
import { DistrictSchoolQuestion } from "./coach-log/DistrictSchoolQuestion";
import { MicroPLQuestion } from "./coach-log/MicroPLQuestion";
import { ModelQuestion } from "./coach-log/ModelQuestion";
import { ModeQuestion } from "./coach-log/ModeQuestion";
import { ReasonQuestion } from "./coach-log/ReasonQuestion";
import { createItem, createItemSub, uploadFile } from "./coach-log/utils";
import { DateQuestion } from "./utils/DateQuestion";
import { EmployeeNameQuestion } from "./utils/EmployeeNameQuestion";
import { NYCQuestion } from "./coach-log/nyc/NYCQuestions";
import { getTeacherInfo } from "./coach-log/utils";

function CoachLog() {
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
  const [timeCheck, setTimeCheck] = useState();
  const [submitCheck, setSubmitCheck] = useState();
  const [schoolByDistrict, setSchoolByDistrict] = useState({});
  const [selectedMicroPLParticipants, setSelectedMicroPLParticipants] =
    useState([]);
  const [
    selectedCancellationParticipants,
    setSelectedCancellationParticipants,
  ] = useState([]);
  const [selectedMicroPLParticipantRoles, setSelectedMicroPLParticipantRoles] =
    useState([]);
  const [selectedModelParticipants, setSelectedModelParticipants] = useState(
    []
  );
  const [selectedModelParticipantRoles, setSelectedModelParticipantRoles] =
    useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [originalSessions, setOriginalSessions] = useState([]);
  const [microPLDone, setMicroPLDone] = useState();
  const [modelDone, setModelDone] = useState();
  const [adminDone, setAdminDone] = useState();
  const [walkthroughDone, setWalkthroughDone] = useState();
  const [isCoachingMissed, setIsCoachingMissed] = useState();
  const [isContractor, setIsContractor] = useState();
  const [coachingMode, setCoachingMode] = useState();
  const { accessToken } = useContext(AccessTokenContext);
  const [NYCDone, setNYCDone] = useState("");
  const [readsGradeLevels, setReadsGradeLevels] = useState([]);
  const [solvesGradeLevels, setSolvesGradeLevels] = useState([]);
  const [teachersSupportedNumber, setTeachersSupportedNumber] = useState(0);
  const [teachersSupportedType, setTeachersSupportedType] = useState("");
  const [solvesImplementationIndicator, setSolvesImplementationIndicator] =
    useState(""); // assuming it's a string
  const [solvesPrimaryStrategy, setSolvesPrimaryStrategy] = useState("");
  const [solvesSpecificStrategy, setSolvesSpecificStrategy] = useState("");
  const [supportCycle, setSupportCycle] = useState("");
  const [
    readsImplementationIndicatorsList,
    setReadsImplementationIndicatorsList,
  ] = useState([]);
  const [readsStrategiesUsedList, setReadsStrategiesUsedList] = useState([]);
  const [readsWorkFocusList, setReadsWorkFocusList] = useState([]);
  const [nycTouchpoint, setNycTouchpoint] = useState();
  const [nycTouchpointDuration, setNycTouchpointDuration] = useState();
  const [solvesTouchpoint, setSolvesTouchpoint] = useState();
  const [nycReadsAdmin, setNycReadsAdmin] = useState();
  const [nycReadsAdminsSupportedType, setNycReadsAdminsSupportedType] =
    useState([]);
  const [solvesPrimaryStrategyList, setSolvesPrimaryStrategyList] = useState(
    []
  );
  const [solvesSpecificStrategyList, setSolvesSpecificStrategyList] = useState(
    []
  );
  const [readsPrimaryFocus, setReadsPrimaryFocus] = useState();
  const [nycSolvesAdmin, setNycSolvesAdmin] = useState();
  const [solvesIntervisitation, setSolvesIntervisitation] = useState();
  const [solvesLeaderCycle, setSolvesLeaderCycle] = useState();
  const [solvesAdminPrimaryStrategy, setSolvesAdminPrimaryStrategy] =
    useState();
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

  //get coachee list
  const [districtSelected, setDistrictSelected] = useState();
  const [schoolSelected, setSchoolSelected] = useState();
  const [coacheeList, setCoacheeList] = useState([]);
  useEffect(() => {
    //teacher list should update when a new school is selected
    if (schoolSelected) {
      getTeacherInfo(setCoacheeList, districtSelected, schoolSelected);
    }
    //set Coachee list as null when district is changed
    setCoacheeList([]);
  }, [schoolSelected, districtSelected]);

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

    const allGradeLevelsPresent = readsGradeLevels.every((gradeLevel) =>
      readsStrategiesUsedList.some((item) => item.includes(gradeLevel))
    );
    const readsTeacherSupport =
      nycReadsAdmin === "Yes - provided leader specific support"
        ? nycReadsAdminsSupportedType.length !== 0
          ? true
          : false
        : true;

    const nycReadsGradeLevelValidity =
      NYCDone === "NYC Reads"
        ? readsGradeLevels.toString() !== "" &&
          allGradeLevelsPresent &&
          teachersSupportedType.toString() !== "" &&
          readsTeacherSupport
          ? true
          : false
        : true;
    const nycSolvesGradeLevelValidity =
      NYCDone === "NYC Solves"
        ? solvesGradeLevels.toString() !== "" &&
          teachersSupportedType.toString() !== ""
          ? true
          : false
        : true;
    if (
      form.checkValidity() === false ||
      nycReadsGradeLevelValidity === false ||
      nycSolvesGradeLevelValidity === false
    ) {
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
        : JSON.parse(e.target.coachName.value).name;

      const coachMondayId = e.target.coachNameManual
        ? ""
        : JSON.parse(e.target.coachName.value).id;
      const dateValue = new Date(e.target.date.value);
      const month = ("0" + (dateValue.getMonth() + 1)).slice(-2);
      const day = ("0" + dateValue.getDate()).slice(-2);
      const year = dateValue.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      const district = e.target.districtName.value;
      const school = e.target.schoolName.value;

      let microPLParticipants = "";
      let microPLParticipantRoles = "";
      let microPLDuration = "";
      let microPLTopic = "";
      let microPLFile = "";
      let totalCoachingMins = count;
      if (microPLDone === "yes") {
        microPLParticipants = selectedMicroPLParticipants.toString();
        microPLParticipantRoles = selectedMicroPLParticipantRoles.toString();
        microPLDuration = e.target.microPLDuration.value;
        microPLTopic = e.target.microPLTopic.value;
        totalCoachingMins += parseFloat(microPLDuration);
        microPLFile = e.target.elements.microPLFile.files[0];
      }
      let modelParticipants = "";
      let modelParticipantRoles = "";
      let modelDuration = "";
      let modelTopic = "";
      if (modelDone === "yes") {
        modelParticipants = selectedModelParticipants.toString();
        modelParticipantRoles = selectedModelParticipantRoles.toString();
        modelDuration = e.target.modelDuration.value;
        modelTopic = e.target.modelTopic.value;
        totalCoachingMins += parseFloat(modelDuration);
      }

      let adminParticipants = "";
      let adminDuration = "";
      if (adminDone === "yes") {
        adminParticipants = selectedAdmins.toString();
        adminDuration = e.target.adminDuration.value;
        totalCoachingMins += parseFloat(adminDuration);
      }

      let walkthroughClassrooms = "";
      let walkthroughDuration = "";
      if (walkthroughDone === "yes") {
        walkthroughClassrooms = e.target.walkthroughClassrooms.value;
        walkthroughDuration = e.target.walkthroughDuration.value;
        totalCoachingMins += parseFloat(walkthroughDuration);
      }

      //NYC related values
      let ImplementationIndicatorReads = "";
      let strategiesUsedReads = "";
      let workFocusReads = "";
      let implementationIndicatorSolves = "";
      let primaryStrategySolvesList = "";
      let specificStrategySolvesList = "";
      let supportCycleSolves = "";
      let readsGradeLevelsNYC = "";
      let solvesGradeLevelsNYC = "";
      let teachersSupportedNumberGeneral = "";
      let teachersSupportedTypeGeneral = "";
      let NYCCoachType = "no";
      let NYCTouchpoint = "";
      let NYCReadsAdmin = "";
      let NYCReadsSupportedLeaders = "";
      let NYCReadsSupportPrimaryFocus = "";
      let NYCSolvesMeetWithAdmin = "";
      let NYCSolvesIntervisitation = "";
      let NYCSolvesDBN = "";
      let NYCSolvesLeaderCycle = "";
      let NYCSolvesAdminPrimaryStrategy = "";
      let NYCAdditionalComments = "";

      if (NYCDone && NYCDone !== "no") {
        teachersSupportedNumberGeneral = teachersSupportedNumber;
        teachersSupportedTypeGeneral = teachersSupportedType.toString();
        NYCAdditionalComments = e.target.coachingAdditionalWriteIn?.value;
        if (NYCDone === "NYC Reads") {
          NYCTouchpoint = nycTouchpoint;
          readsGradeLevelsNYC = readsGradeLevels.toString();
          ImplementationIndicatorReads =
            readsImplementationIndicatorsList.toString();
          workFocusReads = readsWorkFocusList.toString();
          strategiesUsedReads = readsStrategiesUsedList.toString();
          NYCCoachType = NYCDone;
          NYCReadsAdmin = nycReadsAdmin;
          NYCReadsSupportPrimaryFocus = readsPrimaryFocus;
          NYCReadsSupportedLeaders = nycReadsAdminsSupportedType.toString();
        } else {
          NYCTouchpoint = solvesTouchpoint;
          solvesGradeLevelsNYC = solvesGradeLevels.toString();
          implementationIndicatorSolves = solvesImplementationIndicator;
          primaryStrategySolvesList = Object.values(solvesPrimaryStrategyList)
            .flat()
            .toString();
          specificStrategySolvesList = solvesSpecificStrategyList.toString();
          supportCycleSolves = supportCycle;
          NYCCoachType = NYCDone;
          NYCSolvesMeetWithAdmin = nycSolvesAdmin;
          NYCSolvesIntervisitation = solvesIntervisitation;
          NYCSolvesDBN = e.target.DBN?.value;
          NYCSolvesLeaderCycle = solvesLeaderCycle;
          NYCSolvesAdminPrimaryStrategy = solvesAdminPrimaryStrategy;
        }
      }

      let originalSessionsList = "";
      let reasonChoice = "";
      let fullReasonContent = "";
      let replacementActivities = "";
      let noCoachingDuration = "";
      let cancellationParticipants = "";
      if (isCoachingMissed === "yes") {
        cancellationParticipants = selectedCancellationParticipants.toString();
        originalSessionsList = originalSessions.toString();
        reasonChoice = e.target.reasonChoice.value;
        if (e.target.reasonContent) {
          fullReasonContent =
            e.target.reasonContent.value + ". " + e.target.reasonWriteIn.value;
        }
        if (e.target.replacementActivities) {
          replacementActivities = e.target.replacementActivities.value;
        }

        noCoachingDuration = e.target.noCoachingDuration.value;
      }

      let schoolTravelDuration = "";
      let finalTravelDuration = "";
      if (
        (coachingMode === "In-person" || coachingMode === "Hybrid") &&
        isContractor === "yes"
      ) {
        schoolTravelDuration = e.target.schoolTravelDuration.value;
        finalTravelDuration = e.target.finalTravelDuration.value;
      }

      let additionalClarification = e.target.additionalClarification.value;
      if (totalCoachingMins > 360) {
        setTimeCheck(false);
        return;
      }
      if (totalCoachingMins <= 360) {
        setTimeCheck(true);
      }

      //create parent items
      let queryParent =
        "mutation ($myItemName: String!, $columnVals: JSON!, $groupName: String! ) { create_item (board_id:6741344103, group_id: $groupName, item_name:$myItemName, column_values:$columnVals) { id } }";
      let varsParent = {
        groupName: "topics",
        myItemName: coachName,
        columnVals: JSON.stringify({
          date__1: { date: formattedDate },
          people__1: coachMondayId,
          text88__1: districtSelected,
          text5__1: schoolSelected.label,
          text4__1: microPLParticipants,
          text3__1: microPLParticipantRoles,
          text28__1: microPLTopic,
          text15__1: microPLDuration,
          files__1: microPLFile,
          text7__1: modelParticipants,
          text29__1: modelParticipantRoles,
          text76__1: modelTopic,
          numbers1__1: modelDuration,
          text9__1: adminParticipants,
          numbers4__1: adminDuration,
          numbers__1: walkthroughClassrooms,
          numbers3__1: walkthroughDuration,
          text59__1: cancellationParticipants,
          text23__1: originalSessionsList,
          numbers82__1: noCoachingDuration,
          text51__1: reasonChoice,
          text99__1: fullReasonContent,
          text30__1: replacementActivities,
          text58__1: coachingMode,
          numbers8__1: schoolTravelDuration,
          numbers10__1: finalTravelDuration,
          long_text8__1: additionalClarification,
          text13__1: NYCCoachType,
          text85__1: NYCTouchpoint,
          text_mkm2tnt8: nycTouchpointDuration,
          text87__1: teachersSupportedNumberGeneral,
          text43__1: teachersSupportedTypeGeneral,
          text0__1: ImplementationIndicatorReads,
          text34__1: workFocusReads,
          text56__1: strategiesUsedReads,
          text431__1: implementationIndicatorSolves,
          text89__1: supportCycleSolves,
          text83__1: primaryStrategySolvesList,
          text16__1: specificStrategySolvesList,
          text01__1: NYCReadsAdmin,
          text285__1: NYCReadsSupportedLeaders,
          text61__1: NYCReadsSupportPrimaryFocus,
          text80__1: solvesGradeLevelsNYC,
          text33__1: readsGradeLevelsNYC,
          text07__1: NYCSolvesMeetWithAdmin,
          text290__1: NYCSolvesIntervisitation,
          text_Mjj6jM8n: NYCSolvesDBN,
          text018__1: NYCSolvesLeaderCycle,
          text48__1: NYCSolvesAdminPrimaryStrategy,
          long_text_mkkab976: NYCAdditionalComments,
        }),
      };
      createItem(queryParent, varsParent, accessToken).then((response) => {
        console.log("micro", microPLFile);
        //upload file if there is any
        if (microPLFile) {
          const formData = new FormData();
          formData.append(
            "query",
            `mutation add_file($file: File!, $itemId: ID!) { add_file_to_column(item_id: $itemId, column_id: "files__1", file: $file) { id } }`
          );
          formData.append(
            "variables",
            JSON.stringify({ itemId: String(response) })
          );
          formData.append("map", JSON.stringify({ file: "variables.file" }));
          formData.append("file", microPLFile);
          uploadFile(formData, accessToken).then((e) => {
            console.log(e);
            if (
              e.data.hasOwnProperty("errors") ||
              (e.status < 600 && e.status > 399)
            ) {
              setErrorCheck(true);
              return;
            } else {
              setErrorCheck(false);
            }
          });
        }

        //upload subitems
        for (var i = 0; i < coachingLogs.length; i++) {
          const parentID = response;
          const coacheeName = coachingLogs[i].coacheeName;
          const coacheeRole = coachingLogs[i].coacheeRole;
          const coachingActivity = coachingLogs[i].coachingActivity;
          const coachingDuration = coachingLogs[i].coachingDuration;
          let querySub =
            "mutation ($myItemName: String!,$parentID: ID!, $columnVals: JSON! ) { create_subitem (parent_item_id:$parentID, item_name:$myItemName, column_values:$columnVals) { id } }";
          let varsSub = {
            myItemName: coacheeName,
            parentID: String(parentID),
            columnVals: JSON.stringify({
              date0: { date: formattedDate },
              text__1: coacheeName,
              text0__1: coacheeRole,
              text5__1: coachingActivity,
              numbers__1: parseFloat(coachingDuration),
            }),
          };
          const myTimeout = setTimeout(setErrorCheck(false), 60000);
          createItemSub(querySub, varsSub, accessToken).then((e) => {
            if (
              e.data.hasOwnProperty("errors") ||
              (e.status < 600 && e.status > 399)
            ) {
              setErrorCheck(true);
            } else {
              setErrorCheck(false);
            }
            clearTimeout(myTimeout);
          });
        }
      });
    }
  };

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
            schoolSelected={schoolSelected}
          />
          <CoachingQuestion
            coacheeList={coacheeList}
            coachingLogs={coachingLogs}
            setCoachingLogs={setCoachingLogs}
            pjTypeRef={pjTypeRef}
            handleCoachingLogsChange={handleCoachingLogsChange}
            removeProjectFields={removeProjectFields}
            addProjectFields={addProjectFields}
          />
          <MicroPLQuestion
            coacheeList={coacheeList}
            setSelectedMicroPLParticipantRoles={
              setSelectedMicroPLParticipantRoles
            }
            setSelectedMicroPLParticipants={setSelectedMicroPLParticipants}
            microPLDone={microPLDone}
            setMicroPLDone={setMicroPLDone}
          />
          <ModelQuestion
            coacheeList={coacheeList}
            setSelectedModelParticipants={setSelectedModelParticipants}
            setSelectedModelParticipantRoles={setSelectedModelParticipantRoles}
            modelDone={modelDone}
            setModelDone={setModelDone}
          />
          <AdminQuestion
            coacheeList={coacheeList}
            setSelectedAdmins={setSelectedAdmins}
            adminDone={adminDone}
            setAdminDone={setAdminDone}
          />
          <AdminWalkthroughQuestion
            walkthroughDone={walkthroughDone}
            setWalkthroughDone={setWalkthroughDone}
          />
          <ReasonQuestion
            coacheeList={coacheeList}
            setOriginalSessions={setOriginalSessions}
            isCoachingMissed={isCoachingMissed}
            setIsCoachingMissed={setIsCoachingMissed}
            setSelectedCancellationParticipants={
              setSelectedCancellationParticipants
            }
          />
          <NYCQuestion
            NYCDone={NYCDone}
            setNYCDone={setNYCDone}
            setTeachersSupportedNumber={setTeachersSupportedNumber}
            setTeachersSupportedType={setTeachersSupportedType}
            teachersSupportedType={teachersSupportedType}
            setSolvesImplementationIndicator={setSolvesImplementationIndicator}
            solvesImplementationIndicator={solvesImplementationIndicator}
            setSolvesPrimaryStrategy={setSolvesPrimaryStrategy}
            solvesPrimaryStrategy={solvesPrimaryStrategy}
            setSolvesSpecificStrategy={setSolvesSpecificStrategy}
            setSupportCycle={setSupportCycle}
            setReadsImplementationIndicatorsList={
              setReadsImplementationIndicatorsList
            }
            setReadsStrategiesUsedList={setReadsStrategiesUsedList}
            setReadsWorkFocusList={setReadsWorkFocusList}
            readsStrategiesUsedList={readsStrategiesUsedList}
            setNycTouchpoint={setNycTouchpoint}
            nycReadsAdmin={nycReadsAdmin}
            setNycReadsAdmin={setNycReadsAdmin}
            setNycReadsAdminsSupportedType={setNycReadsAdminsSupportedType}
            setReadsPrimaryFocus={setReadsPrimaryFocus}
            setSolvesGradeLevels={setSolvesGradeLevels}
            solvesGradeLevels={solvesGradeLevels}
            setSolvesPrimaryStrategyList={setSolvesPrimaryStrategyList}
            solvesPrimaryStrategyList={solvesPrimaryStrategyList}
            setSolvesSpecificStrategyList={setSolvesSpecificStrategyList}
            readsGradeLevels={readsGradeLevels}
            setReadsGradeLevels={setReadsGradeLevels}
            setNycSolvesAdmin={setNycSolvesAdmin}
            nycSolvesAdmin={nycSolvesAdmin}
            setSolvesIntervisitation={setSolvesIntervisitation}
            setSolvesLeaderCycle={setSolvesLeaderCycle}
            setSolvesAdminPrimaryStrategy={setSolvesAdminPrimaryStrategy}
            setSolvesTouchpoint={setSolvesTouchpoint}
            nycReadsAdminsSupportedType={nycReadsAdminsSupportedType}
            solvesIntervisitation={solvesIntervisitation}
            setNycTouchpointDuration={setNycTouchpointDuration}
            nycTouchpoint={nycTouchpoint}
          />
          <ModeQuestion
            coachingMode={coachingMode}
            setCoachingMode={setCoachingMode}
            isContractor={isContractor}
            setIsContractor={setIsContractor}
          />
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>
                Please provide any clarification on the coaching session
              </strong>
            </Form.Label>
            <Form.Control
              name="additionalClarification"
              as="textarea"
              rows={2}
              aria-label="Default select example"
            ></Form.Control>
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
          {submitCheck === true &&
          errorCheck === undefined &&
          timeCheck === true ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <></>
          )}
          {timeCheck === false ? (
            <Alert key="danger" variant="danger">
              Please make sure your total input coaching minutes are under 360
              minutes. Coaching Time include all minutes other than travel time.
            </Alert>
          ) : (
            <></>
          )}
          {submitCheck === false ? (
            <Alert key="warning" variant="warning">
              Error: Please make sure all required fields (*) are filled out
              correctly.
            </Alert>
          ) : null}
          {errorCheck === false ? (
            <Alert key="success" variant="success">
              Your log is submitted successfully!
            </Alert>
          ) : null}
          {errorCheck === true ? (
            <Alert key="danger" variant="danger">
              Something went wrong! If this happens constantly, please contact
              project management or technology team.
            </Alert>
          ) : null}
        </Form>
        <div className="notificationAisle">
          <div className="quoteContainer">
            <div>
              <p
                style={{
                  fontSize: "23px",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                FAQ
              </p>
              <p
                style={{
                  fontSize: "19px",
                  fontWeight: "500",
                }}
              >
                <strong>Why can't I see the names of my coachees?</strong>{" "}
                <br /> - Ensure that the coachee information has been uploaded
                to the SY24-25 Coaching Participant Roster Monday board. <br />{" "}
                - Please note that it may take up to around 15 seconds for the
                names to appear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachLog;

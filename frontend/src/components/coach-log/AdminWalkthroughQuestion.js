import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { classroomAmount, timeOptions } from "../utils/utils";

export const AdminWalkthroughQuestion = ({
  districtSelected,
  schoolSelected,
}) => {
  const [microPLDone, setMicroPLDone] = useState();
  const [coacheeList, setCoacheeList] = useState();
  const getTeacherInfo = (e) => {
    let teachersBySchool = {};
    let teacherQuery = `{boards(ids:6197660733){items_page (limit:100) {items {column_values(ids:["short_text_2","coaching_partners","short_text66"]){text column{title}}}}}}`;
    axios.post("/demo/getMonday", { query: teacherQuery }).then((res) => {
      res.data.data.boards[0].items_page.items.forEach((e) => {
        const district = e.column_values.filter((v) => {
          return v.column.title === "District Name";
        })[0].text;
        const school = e.column_values.filter((v) => {
          return v.column.title === "School Name";
        })[0].text;
        const teacherName = e.column_values.filter((v) => {
          return v.column.title === "Coachee";
        })[0].text;
        if (!teachersBySchool[district]) {
          teachersBySchool[district] = { [school]: [teacherName] };
        } else if (
          teachersBySchool[district] &&
          !teachersBySchool[district][school]
        ) {
          teachersBySchool[district][school] = [teacherName];
        } else {
          teachersBySchool[district][school].push(teacherName);
        }
      });
      const coachees = getCoacheeList(teachersBySchool);
      console.log(coachees);
      setCoacheeList(coachees);
    });
  };
  const getCoacheeList = (teachersBySchool) => {
    const uniqueTeacherArray = [];
    for (const [key, value] of Object.entries(teachersBySchool)) {
      if (districtSelected === key) {
        for (const [schoolName, teacherList] of Object.entries(value)) {
          if (schoolSelected === schoolName) {
            const uniqueTeacherSet = new Set(teacherList);
            uniqueTeacherArray.push(...uniqueTeacherSet);
            uniqueTeacherArray.push("N/A");
          }
        }
      }
    }
    return uniqueTeacherArray;
  };
  useEffect(() => {
    getTeacherInfo();
    //teacher list should update when a new school is selected
  }, [schoolSelected]);
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Did you complete a walkthrough with the admin at this school today?{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="walkthroughDone"
          aria-label="Default select example"
          onChange={(e) => {
            setMicroPLDone(e.target.value);
            if (e.target.value === "yes") {
              getTeacherInfo();
            }
          }}
          required
        >
          <option value=""></option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
      {microPLDone === "yes" ? (
        <>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>
                How many classrooms were observed during this walkthrough?{" "}
              </strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="walkthroughClassrooms"
              required
            >
              <option></option>
              {classroomAmount.map((val, index) => (
                <option value={val}>{val}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>How many minutes was this meeting?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="walkthroughDuration"
              required
            >
              <option></option>
              {timeOptions.map((val, index) => (
                <option value={val}>{val}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

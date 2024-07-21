import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { coachingActivities, roleList, timeOptions } from "../utils/utils";

export const CoachingQuestion = ({
  projects,
  team,
  pjRoles,
  pjTypeRef,
  pjOptions,
  handleTypeChange,
  handleProjectChange,
  removeProjectFields,
  addProjectFields,
  districtSelected,
  schoolSelected,
}) => {
  const [coachingDone, setCoachingDone] = useState();
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
      <Form.Group className="mb-5" controlId="formBasicSite">
        <Form.Label>
          <strong>Did you complete 1:1 coaching today?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="CoachingDone"
          aria-label="Default select example"
          onChange={(e) => {
            setCoachingDone(e.target.value);
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
      {coachingDone === "yes" ? (
        <Form.Group className="mb-3" controlId="formBasicCourse">
          <Row>
            <Col className="my-1">
              <Form.Label>
                <strong>Coachee*</strong>
              </Form.Label>
            </Col>
            <Col className="my-1">
              <Form.Label>
                <strong>Role*</strong>
              </Form.Label>
            </Col>
            <Col className="my-1">
              <Form.Label>
                <strong>Activities*</strong>
              </Form.Label>
            </Col>
            <Col className="my-1">
              <Form.Label>
                <strong>Duration*</strong>
              </Form.Label>
            </Col>
            {projects.length > 1 ? <Col sm={1} className="my-1"></Col> : null}
          </Row>
          {projects.map((ele, idx) => (
            <Row key={ele.projectId}>
              <Row>
                <Col className="my-1">
                  <Form.Label visuallyHidden="true">Coachee Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="projectType"
                    aria-label="Default select example"
                    ref={pjTypeRef}
                    onChange={(e) => {
                      handleTypeChange(e, ele);
                      handleProjectChange(idx, e);
                    }}
                    required
                  >
                    <option></option>
                    {coacheeList &&
                      coacheeList.map((val, index) => (
                        <option value={val}>{val}</option>
                      ))}
                  </Form.Control>
                </Col>
                <Col className="my-1">
                  <Form.Label visuallyHidden="true">Coachee Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="coacheeRole"
                    aria-label="Default select example"
                    required
                  >
                    <option></option>
                    {roleList.map((val, index) => (
                      <option value={val}>{val}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className="my-1">
                  <Form.Label visuallyHidden="true">role</Form.Label>
                  <Form.Control
                    as="select"
                    aria-label="Default select example"
                    name="coacheeRole"
                    onChange={(e) => handleProjectChange(idx, e)}
                    required
                  >
                    <option></option>
                    {coachingActivities.map((val, index) => (
                      <option value={val}>{val}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className="my-1">
                  <Form.Label visuallyHidden="true">
                    Coaching Duration
                  </Form.Label>
                  <Form.Control
                    as="select"
                    aria-label="Default select example"
                    name="coachingDuration"
                    onChange={(e) => handleProjectChange(idx, e)}
                    required
                  >
                    <option></option>
                    {timeOptions.map((val, index) => (
                      <option value={val}>{val}</option>
                    ))}
                  </Form.Control>
                </Col>

                {projects.length > 1 ? (
                  <Col sm={1} className="my-1">
                    <Button
                      variant="danger"
                      onClick={() => removeProjectFields(ele)}
                    >
                      X
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Row>
          ))}
        </Form.Group>
      ) : (
        <></>
      )}

      <Form.Group className="mb-4" id="formGridCheckbox">
        <Button variant="secondary" onClick={() => addProjectFields()}>
          + Add Row
        </Button>
      </Form.Group>
    </>
  );
};

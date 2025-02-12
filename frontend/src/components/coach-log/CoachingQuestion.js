import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { coachingActivities, roleList, timeOptions } from "../utils/utils";

export const CoachingQuestion = ({
  coachingLogs,
  setCoachingLogs,
  pjTypeRef,
  handleCoachingLogsChange,
  removeProjectFields,
  addProjectFields,
  coacheeList,
}) => {
  const [coachingDone, setCoachingDone] = useState();
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
            if (e.target.value === "no") {
              setCoachingLogs([]);
            } else {
              setCoachingLogs([
                {
                  logId: new Date().getTime(),
                  coacheeName: "",
                  coacheeRole: "",
                  coachingActivity: "",
                  coachingDuration: 0,
                },
              ]);
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
        <>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Row>
              <Col className="my-1">
                <Form.Label>
                  <strong>Coachee</strong>
                </Form.Label>
              </Col>
              <Col className="my-1">
                <Form.Label>
                  <strong>Role</strong>
                </Form.Label>
              </Col>
              <Col className="my-1">
                <Form.Label>
                  <strong>Activities</strong>
                </Form.Label>
              </Col>
              <Col className="my-1">
                <Form.Label>
                  <strong>Duration (mins)</strong>
                </Form.Label>
              </Col>
              {coachingLogs.length > 1 ? (
                <Col sm={1} className="my-1"></Col>
              ) : null}
            </Row>
            {coachingLogs.map((ele, idx) => (
              <Row key={ele.projectId}>
                <Row>
                  <Col className="my-1">
                    <Form.Label visuallyHidden="true">Coachee Name</Form.Label>
                    <Form.Control
                      as="select"
                      name="coacheeName"
                      aria-label="Default select example"
                      ref={pjTypeRef}
                      value={ele.coacheeName}
                      onChange={(e) => {
                        handleCoachingLogsChange(idx, e);
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
                      value={ele.coacheeRole}
                      onChange={(e) => {
                        handleCoachingLogsChange(idx, e);
                      }}
                    >
                      <option></option>
                      {roleList.map((val, index) => (
                        <option value={val}>{val}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col className="my-1">
                    <Form.Label visuallyHidden="true">Activity</Form.Label>
                    <Form.Control
                      as="select"
                      aria-label="Default select example"
                      name="coachingActivity"
                      onChange={(e) => handleCoachingLogsChange(idx, e)}
                      required
                      value={ele.coachingActivity}
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
                      onChange={(e) => handleCoachingLogsChange(idx, e)}
                      required
                      value={ele.coachingDuration}
                    >
                      <option></option>
                      {timeOptions.map((val, index) => (
                        <option value={val}>{val}</option>
                      ))}
                    </Form.Control>
                  </Col>

                  {coachingLogs.length > 1 ? (
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
          <Form.Group className="mb-4" id="formGridCheckbox">
            <Button variant="secondary" onClick={() => addProjectFields()}>
              + Add Row
            </Button>
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

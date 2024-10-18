import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { generalActivities, timeOptions, reasons } from "../utils/utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

export const ReasonQuestion = ({
  districtSelected,
  schoolSelected,
  setOriginalSessions,
  isCoachingMissed,
  setIsCoachingMissed,
}) => {
  const [happenReason, setHappenReason] = useState();
  const [replacement, setReplacement] = useState();

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Were there coaching activities that were scheduled but did not take
            place at this school today?{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="reasonDone"
          aria-label="Default select example"
          onChange={(e) => {
            setIsCoachingMissed(e.target.value);
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
      {isCoachingMissed === "yes" ? (
        <>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>What was supposed to happen? </strong>
            </Form.Label>
            <DropdownMultiselect
              options={generalActivities}
              name="reasonList"
              handleOnChange={(selected) => {
                setOriginalSessions(selected);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>Why did it not happen?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="reasonChoice"
              required
              onChange={(e) => {
                setHappenReason(e.target.value);
              }}
            >
              <option></option>
              <option val={"Due to the partner"}>Due to the partner</option>
              <option val={"Due to me, the coach, not being able to attend"}>
                Due to me, the coach, not being able to attend
              </option>
            </Form.Control>
          </Form.Group>
          {happenReason === "Due to the partner" ? (
            <>
              <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>
                  <strong>What happened?</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  name="reasonContent"
                  required
                >
                  <option></option>
                  {reasons.map((val, index) => (
                    <option value={val}>{val}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>
                  <strong>Other Reason?</strong>
                </Form.Label>
                <Form.Control
                  name="reasonWriteIn"
                  as="textarea"
                  rows={2}
                  aria-label="Default select example"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSite">
                <Form.Label>
                  <strong>
                    Did you engage in replacement coaching activities for this
                    school today?
                  </strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="replacementDone"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setReplacement(e.target.value);
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
              {replacement === "yes" ? (
                <Form.Group className="mb-3" controlId="formBasicCourse">
                  <Form.Label>
                    <strong>
                      Please make sure that you capture your replacement
                      coaching activities on this log for today.
                    </strong>
                  </Form.Label>
                  <Form.Control
                    name="replacementActivities"
                    as="textarea"
                    rows={2}
                    aria-label="Default select example"
                  ></Form.Control>
                </Form.Group>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>How many minutes was this session?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="noCoachingDuration"
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

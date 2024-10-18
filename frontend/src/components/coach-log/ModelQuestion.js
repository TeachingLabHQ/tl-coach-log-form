import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { coachingActivities, roleList, timeOptions } from "../utils/utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { getTeacherInfo } from "./utils";

export const ModelQuestion = ({
  districtSelected,
  schoolSelected,
  setSelectedModelParticipants,
  setSelectedModelParticipantRoles,
  modelDone,
  setModelDone,
}) => {
  const [coacheeList, setCoacheeList] = useState();

  useEffect(() => {
    getTeacherInfo(setCoacheeList, districtSelected, schoolSelected);
  }, [districtSelected, schoolSelected]);
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Did you provide coaching, modeling, or planning with a group of
            teachers at this school today?{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="CoachingDone"
          aria-label="Default select example"
          onChange={(e) => {
            setModelDone(e.target.value);
            if (e.target.value === "yes") {
              getTeacherInfo(setCoacheeList, districtSelected, schoolSelected);
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
      {modelDone === "yes" ? (
        <>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Names of participants: </strong>
            </Form.Label>
            <DropdownMultiselect
              options={coacheeList}
              name="modelParticipants"
              handleOnChange={(selected) => {
                setSelectedModelParticipants(selected);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Participants were:</strong>
            </Form.Label>
            <DropdownMultiselect
              options={roleList}
              name="modelParticipantRoles"
              handleOnChange={(selected) => {
                setSelectedModelParticipantRoles(selected);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Topic of session </strong>
            </Form.Label>
            <Form.Control
              name="modelTopic"
              as="textarea"
              rows={1}
              aria-label="Default select example"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>How many minutes was this session? </strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="modelDuration"
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

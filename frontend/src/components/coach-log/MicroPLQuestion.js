import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { roleList, timeOptions } from "../utils/utils";

export const MicroPLQuestion = ({
  coacheeList,
  setSelectedMicroPLParticipantRoles,
  setSelectedMicroPLParticipants,
  microPLDone,
  setMicroPLDone,
}) => {
  // Use a unique key for DropdownMultiselect to force re-render
  const [dropdownKey, setDropdownKey] = useState(0);

  useEffect(() => {
    // Whenever coacheeList changes, update the key to force re-render
    setDropdownKey((prevKey) => prevKey + 1);
  }, [coacheeList]);
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>Did you deliver a micro PL at this school today?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="CoachingDone"
          aria-label="Default select example"
          onChange={(e) => {
            setMicroPLDone(e.target.value);
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
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Names of participants: </strong>
            </Form.Label>
            <DropdownMultiselect
              key={dropdownKey} // Force re-render by using a dynamic key
              options={coacheeList}
              name="microPLParticipants"
              handleOnChange={(selected) => {
                setSelectedMicroPLParticipants(selected);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Participants were:</strong>
            </Form.Label>
            <DropdownMultiselect
              options={roleList}
              name="microPLParticipantRoles"
              handleOnChange={(selected) => {
                setSelectedMicroPLParticipantRoles(selected);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Topic of micro PL </strong>
            </Form.Label>
            <Form.Control
              name="microPLTopic"
              as="textarea"
              rows={1}
              aria-label="Default select example"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>How many minutes was this micro PL?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="microPLDuration"
              required
            >
              <option></option>
              {timeOptions.map((val, index) => (
                <option value={val}>{val}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>
              <strong>
                Upload participant attendance sheet, if there are more than 15
                participants
              </strong>
            </Form.Label>
            <Form.Control type="file" name="microPLFile" />
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

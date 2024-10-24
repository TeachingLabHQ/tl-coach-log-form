import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { timeOptions } from "../utils/utils";

export const AdminQuestion = ({
  coacheeList,
  setSelectedAdmins,
  adminDone,
  setAdminDone,
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
          <strong>
            Did you meet with the school administrators and/or school-based
            coach about coaching progress at this school today?{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="adminDone"
          aria-label="Default select example"
          onChange={(e) => {
            setAdminDone(e.target.value);
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
      {adminDone === "yes" ? (
        <>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Names of admins: </strong>
            </Form.Label>
            <DropdownMultiselect
              key={dropdownKey} // Force re-render by using a dynamic key
              options={coacheeList}
              name="adminNames"
              handleOnChange={(selected) => {
                setSelectedAdmins(selected);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCourse">
            <Form.Label>
              <strong>How many minutes was this meeting?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              aria-label="Default select example"
              name="adminDuration"
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

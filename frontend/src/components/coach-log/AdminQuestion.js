import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { coachingActivities, roleList, timeOptions } from "../utils/utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { getTeacherInfo } from "./utils";

export const AdminQuestion = ({
  districtSelected,
  schoolSelected,
  setSelectedAdmins,
  adminDone,
  setAdminDone,
}) => {
  const [coacheeList, setCoacheeList] = useState();
  useEffect(() => {
    getTeacherInfo(setCoacheeList, districtSelected, schoolSelected);
    //teacher list should update when a new school is selected
  }, [districtSelected, schoolSelected]);
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
      {adminDone === "yes" ? (
        <>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Names of admins: </strong>
            </Form.Label>
            <DropdownMultiselect
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

import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { classroomAmount, timeOptions } from "../utils/utils";

export const AdminWalkthroughQuestion = ({
  districtSelected,
  schoolSelected,
  walkthroughDone,
  setWalkthroughDone,
}) => {
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
            setWalkthroughDone(e.target.value);
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
      {walkthroughDone === "yes" ? (
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
              <strong>
                How many minutes was this walkthrough? (360 mins max)
              </strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="walkthroughDuration"
              min="0"
              max="360"
              step="1"
              placeholder="Enter time in minutes"
            />
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

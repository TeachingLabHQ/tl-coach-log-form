import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { timeOptions } from "../utils/utils";

export const ModeQuestion = ({
  districtSelected,
  schoolSelected,
  coachingMode,
  setCoachingMode,
  isContractor,
  setIsContractor,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Were coaching activities at this school in-person or virtual today?{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="modeDone"
          aria-label="Default select example"
          onChange={(e) => {
            setCoachingMode(e.target.value);
          }}
          required
        >
          <option value=""></option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Virtual">Virtual</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
      {coachingMode === "In-person" || coachingMode === "Hybrid" ? (
        <>
          <Form.Group className="mb-3" controlId="formBasicSite">
            <Form.Label>
              <strong>Are you a 1099 contractor with Teaching Lab?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="isContractor"
              aria-label="Default select example"
              onChange={(e) => {
                setIsContractor(e.target.value);
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
          {isContractor === "yes" ? (
            <>
              <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>
                  <strong>
                    How long was your travel/ commute to this school today?{" "}
                  </strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  name="schoolTravelDuration"
                  required
                >
                  <option></option>
                  {timeOptions.map((val, index) => (
                    <option value={val}>{val}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCourse">
                <Form.Label>
                  <strong>
                    How long was your travel/ commute to your second school or
                    your final destination today?
                  </strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  name="finalTravelDuration"
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
      ) : (
        <></>
      )}
    </>
  );
};

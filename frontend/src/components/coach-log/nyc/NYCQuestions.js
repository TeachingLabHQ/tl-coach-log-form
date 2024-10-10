import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { NYCGradeLevel, supportedTeachers } from "../utils";
import { NYCReads } from "./NYCReads";
import { NYCSolves } from "./NYCSolves";

export const NYCQuestion = ({
  NYCDone,
  setNYCDone,
  setNycGradeLevels,
  setTeachersSupportedNumber,
  setTeachersSupportedType,
  setSolvesImplementationIndicator,
  solvesImplementationIndicator,
  setSolvesPrimaryStrategy,
  solvesPrimaryStrategy,
  setSolvesSpecificStrategy,
  setSupportCycle,
  setImplementationIndicator,
  setStrategiesUsed,
  setWorkFocus,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>Are you a NYC Reads or NYC Solves Coach?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="NYCDone"
          aria-label="Default select example"
          onChange={(e) => {
            setNYCDone(e.target.value);
          }}
          required
        >
          <option value=""></option>
          <option value="NYC Reads">Yes, NYC Reads</option>
          <option value="NYC Solves">Yes, NYC Solves</option>
          <option value="no">No</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>

      {NYCDone && NYCDone !== "no" ? (
        <>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>Select all the grade-levels you supported today</strong>
            </Form.Label>
            <DropdownMultiselect
              options={NYCGradeLevel}
              name="NYCGradeLevels"
              handleOnChange={(selected) => {
                setNycGradeLevels(selected);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>
                Approximately how many total teachers did you support this
                visit?
              </strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="teachersSupportedNumber"
              min="0"
              onChange={(e) => setTeachersSupportedNumber(e.target.value)}
              step="any"
              placeholder="Enter a number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>
                Did you support any of the following teachers during this visit?
              </strong>
            </Form.Label>
            <DropdownMultiselect
              options={supportedTeachers}
              name="teachersSupportedType"
              handleOnChange={(selected) => {
                setTeachersSupportedType(selected);
              }}
            />
          </Form.Group>
          {NYCDone === "NYC Reads" ? (
            <NYCReads
              setImplementationIndicator={setImplementationIndicator}
              setStrategiesUsed={setStrategiesUsed}
              setWorkFocus={setWorkFocus}
            />
          ) : (
            <NYCSolves
              setSolvesImplementationIndicator={
                setSolvesImplementationIndicator
              }
              solvesImplementationIndicator={solvesImplementationIndicator}
              setSolvesPrimaryStrategy={setSolvesPrimaryStrategy}
              solvesPrimaryStrategy={solvesPrimaryStrategy}
              setSolvesSpecificStrategy={setSolvesSpecificStrategy}
              setSupportCycle={setSupportCycle}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

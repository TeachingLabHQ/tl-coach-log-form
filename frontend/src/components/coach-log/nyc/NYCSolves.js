import Form from "react-bootstrap/Form";
import {
  primaryStrategyUsed,
  solvesSpecificStrategyOptions,
  supportCycles,
} from "../utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

export const NYCSolves = ({
  NYCGradeLevel,
  setSolvesImplementationIndicator,
  solvesImplementationIndicator,
  setSolvesPrimaryStrategy,
  solvesPrimaryStrategy,
  setSolvesSpecificStrategy,
  setSupportCycle,
  setNycGradeLevels,
}) => {
  return (
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
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>Please select the School Implementation Experience:</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="implementationIndicator"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setSolvesImplementationIndicator(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="First year of Implementation">
            First year of Implementation
          </option>
          <option value="Experienced with Implementation">
            Experienced with Implementation
          </option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>Please select the Support Cycle: </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="supportCycle"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setSupportCycle(e.target.value);
          }}
        >
          <option value=""></option>
          {solvesImplementationIndicator &&
            supportCycles[solvesImplementationIndicator].map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Select the Primary Strategy used to support teachers in this visit:{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="implementationIndicator"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setSolvesPrimaryStrategy(e.target.value);
          }}
        >
          <option value=""></option>
          {primaryStrategyUsed.map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Please select the Specific Strategy used to support teachers in this
            visit:{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="solvesSpecificStrategy"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setSolvesSpecificStrategy(e.target.value);
          }}
        >
          <option value=""></option>
          {solvesPrimaryStrategy &&
            solvesSpecificStrategyOptions[solvesPrimaryStrategy].map((ss) => (
              <option value={ss} key={ss}>
                {ss}
              </option>
            ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

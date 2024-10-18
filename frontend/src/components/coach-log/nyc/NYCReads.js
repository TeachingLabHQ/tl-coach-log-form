import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { focusOfWork, strategiesUsed } from "../utils";

export const NYCReads = ({
  setImplementationIndicator,
  setStrategiesUsed,
  setWorkFocus,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Please select the primary implementation indicator addressed through
            your work with teachers today.
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="implementationIndicator"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setImplementationIndicator(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="Foundational Skills">Foundational Skills</option>
          <option value="Knowledge-Building Content">
            Knowledge-Building Content
          </option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Please select the focus of your work with teachers today.
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="workFocus"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setWorkFocus(e.target.value);
          }}
        >
          <option value=""></option>
          {focusOfWork.map((w) => (
            <option value={w} key={w}>
              {w}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-1" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Please select 1-3 strategies you used to support teachers
            today.(Select Up to 3)
          </strong>
        </Form.Label>
        <DropdownMultiselect
          options={strategiesUsed}
          name="strategiesUsed"
          handleOnChange={(selected) => {
            if (selected.length > 3) {
              alert("You can only select up to 3 strategies.");
              return; // Do not update state if more than 3 are selected
            }
            setStrategiesUsed(selected); // Update state if within limit
          }}
        />
      </Form.Group>
    </>
  );
};

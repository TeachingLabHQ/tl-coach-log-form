import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { focusOfWork, strategiesUsed } from "../utils";
export const NYCReadsSubQuestions = ({
  readsGradeLevel,
  setReadsWorkFocusList,
  setReadsStrategiesUsedList,
  setReadsImplementationIndicatorsList,
  readsStrategiesUsedList,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            [{readsGradeLevel}] Please select the primary implementation
            indicator addressed through your work with teachers today.
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="implementationIndicator"
          aria-label="Default select example"
          required
          onChange={(e) => {
            const selectedIndicator = `(${readsGradeLevel}) ${e.target.value}`;
            setReadsImplementationIndicatorsList((prevList) => [
              // Filter out any entries with the same grade level
              ...prevList.filter(
                (item) => !item.startsWith(`(${readsGradeLevel})`)
              ),
              // Add the new value
              selectedIndicator,
            ]);
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
            [{readsGradeLevel}] Please select the focus of your work with
            teachers today.
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="workFocus"
          aria-label="Default select example"
          required
          onChange={(e) => {
            const selectedWorkFocus =
              "(" + readsGradeLevel + ") " + e.target.value;
            setReadsWorkFocusList((prevList) => [
              ...prevList.filter(
                (item) => !item.startsWith(`(${readsGradeLevel})`)
              ),
              selectedWorkFocus,
            ]);
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
            [{readsGradeLevel}] Please select 1-3 strategies you used to support
            teachers today.(Select Up to 3) (Required)*
          </strong>
        </Form.Label>
        <DropdownMultiselect
          options={strategiesUsed}
          required
          name={"strategiesUsed" + readsGradeLevel}
          handleOnChange={(selected) => {
            if (selected.length > 3) {
              alert("You can only select up to 3 strategies.");
              return; // Do not update state if more than 3 are selected
            }
            const selectedStrategies = `(${readsGradeLevel}) ${selected.join(
              ", "
            )}`;
            if (selected.length === 0) {
              setReadsStrategiesUsedList((prevList) => [
                ...prevList.filter(
                  (item) => !item.startsWith(`(${readsGradeLevel})`)
                ),
              ]);
            } else {
              setReadsStrategiesUsedList((prevList) => [
                ...prevList.filter(
                  (item) => !item.startsWith(`(${readsGradeLevel})`)
                ),
                selectedStrategies,
              ]);
            }
          }}
        />
        <Form.Control.Feedback
          type="invalid"
          style={{
            display: readsStrategiesUsedList.some((s) =>
              s.includes(readsGradeLevel)
            )
              ? "none"
              : "block",
          }}
        >
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

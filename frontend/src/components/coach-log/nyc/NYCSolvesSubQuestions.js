import Form from "react-bootstrap/Form";
import {
  primaryStrategyUsed,
  solvesSpecificStrategyOptions,
  NYCSolvesGradeLevel,
} from "../utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
export const NYCSolvesSubQuestions = ({
  solvesGradeLevel,
  setSolvesPrimaryStrategyList,
  solvesPrimaryStrategyList,
  setSolvesSpecificStrategyList,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            [{solvesGradeLevel}] Select the Primary Strategy used to support
            teachers in this grade in this visit:{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="PrimaryStrategy"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setSolvesPrimaryStrategyList((prevList) => ({
              ...prevList,
              [solvesGradeLevel]: `(${solvesGradeLevel})${e.target.value}`,
            }));
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
            [{solvesGradeLevel}] Please select the Specific Strategy used to
            support teachers in this grade in this visit:{" "}
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="solvesSpecificStrategy"
          aria-label="Default select example"
          required
          onChange={(e) => {
            setSolvesSpecificStrategyList((prevList) => [
              ...prevList.filter(
                (item) => !item.startsWith(`(${solvesGradeLevel})`)
              ),
              `(${solvesGradeLevel})${e.target.value}`,
            ]);
          }}
        >
          <option value=""></option>
          {solvesPrimaryStrategyList[solvesGradeLevel] &&
            solvesSpecificStrategyOptions[
              solvesPrimaryStrategyList[solvesGradeLevel].split(")")[1]
            ].map((ss) => (
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

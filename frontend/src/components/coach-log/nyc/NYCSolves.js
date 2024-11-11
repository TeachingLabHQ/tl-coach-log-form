import Form from "react-bootstrap/Form";
import {
  primaryStrategyUsed,
  solvesSpecificStrategyOptions,
  supportCycles,
} from "../utils";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { NYCSolvesGradeLevel } from "../utils";
import { NYCSolvesSubQuestions } from "./NYCSolvesSubQuestions";
import { useEffect } from "react";

export const NYCSolves = ({
  setSolvesImplementationIndicator,
  solvesImplementationIndicator,
  setSupportCycle,
  setSolvesGradeLevels,
  solvesGradeLevels,
  setSolvesPrimaryStrategyList,
  solvesPrimaryStrategyList,
  setSolvesSpecificStrategyList,
}) => {
  useEffect(() => {
    // Filter each list directly by only keeping items that start with one of the selected grade levels
    const filterListsByGradeLevels = (setter) => {
      setter((prevList) =>
        prevList.filter((item) =>
          solvesGradeLevels.some((level) => item.startsWith(`(${level})`))
        )
      );
    };
    // Filter the solvesPrimaryStrategyList object by grade levels
    const filterObjectByGradeLevels = (setter) => {
      setter((prevList) => {
        return Object.keys(prevList)
          .filter((key) => solvesGradeLevels.includes(key))
          .reduce((acc, key) => {
            acc[key] = prevList[key];
            return acc;
          }, {});
      });
    };
    filterListsByGradeLevels(setSolvesSpecificStrategyList);
    filterObjectByGradeLevels(setSolvesPrimaryStrategyList);
  }, [
    setSolvesPrimaryStrategyList,
    setSolvesSpecificStrategyList,
    solvesGradeLevels,
  ]);
  return (
    <>
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
      <Form.Group className="mb-1" controlId="formBasicSite">
        <Form.Label>
          <strong>Select all the grade-levels you supported today</strong>
        </Form.Label>
        <DropdownMultiselect
          options={NYCSolvesGradeLevel}
          name="NYCSolvesGradeLevels"
          handleOnChange={(selected) => {
            setSolvesGradeLevels(selected);
          }}
          required
        />
      </Form.Group>
      {solvesGradeLevels.map((g) => (
        <NYCSolvesSubQuestions
          key={g}
          solvesGradeLevel={g}
          setSolvesPrimaryStrategyList={setSolvesPrimaryStrategyList}
          solvesPrimaryStrategyList={solvesPrimaryStrategyList}
          setSolvesSpecificStrategyList={setSolvesSpecificStrategyList}
        />
      ))}
    </>
  );
};

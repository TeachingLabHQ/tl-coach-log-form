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
  setNycSolvesAdmin,
  nycSolvesAdmin,
  setSolvesIntervisitation,
  setSolvesLeaderCycle,
  setSolvesAdminPrimaryStrategy,
  setSolvesTouchpoint,
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
          <strong>What type of touchpoint are you recording?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="Solvestouchpoint"
          aria-label="Default select example"
          onChange={(e) => {
            setSolvesTouchpoint(e.target.value);
          }}
          required
        >
          <option value=""></option>
          <option value="Teacher OR teacher & leader support">
            Teacher OR teacher & leader support
          </option>
          <option value="Leader support only">Leader support only</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
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
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Did you meet with the school administrators and/or school-based
            coach today?
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="NYCSolvesAdmin"
          aria-label="Default select example"
          onChange={(e) => {
            setNycSolvesAdmin(e.target.value);
          }}
          required
        >
          <option value=""></option>
          <option value="Yes - debriefed teacher support only">
            Yes - debriefed teacher support only
          </option>
          <option value="Yes - provided leader specific support">
            Yes - provided leader specific support
          </option>
          <option value="no">No</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
      {nycSolvesAdmin === "Yes - provided leader specific support" ? (
        <>
          <Form.Group className="mb-3" controlId="formBasicSite">
            <Form.Label>
              <strong>Was this an intervisitation support visit?</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="intervisitation"
              aria-label="Default select example"
              required
              onChange={(e) => {
                setSolvesIntervisitation(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose an option.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSite">
            <Form.Label>
              <strong>Select the cycle for leaders in this visit.</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="leaderCycle"
              aria-label="Default select example"
              required
              onChange={(e) => {
                setSolvesLeaderCycle(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="Sustaining the Math: Systems & Structures">
                Sustaining the Math: Systems & Structures
              </option>
              <option value="Supporting the Math: Feedback and Observations">
                Supporting the Math: Feedback and Observations
              </option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose an option.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSite">
            <Form.Label>
              <strong>
                Select the primary strategy used to support leaders in this
                visit.
              </strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="adminPrimaryStrategy"
              aria-label="Default select example"
              required
              onChange={(e) => {
                setSolvesAdminPrimaryStrategy(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="Develop/revise/refine mathematics instructional priority">
                Develop/revise/refine mathematics instructional priority
              </option>
              <option value="Review takeaways from job-embedded support sessions">
                Review takeaways from job-embedded support sessions
              </option>
              <option value="Walkthroughs">Walkthroughs</option>
              <option value="Leadership skills for implementation work">
                Leadership skills for implementation work
              </option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose an option.
            </Form.Control.Feedback>
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

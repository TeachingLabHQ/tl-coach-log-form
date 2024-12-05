import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { NYCGradeLevel, supportedTeachers } from "../utils";
import { NYCReads } from "./NYCReads";
import { NYCSolves } from "./NYCSolves";

export const NYCQuestion = ({
  NYCDone,
  nycReadsAdmin,
  setNYCDone,
  setTeachersSupportedNumber,
  setTeachersSupportedType,
  teachersSupportedType,
  setSolvesImplementationIndicator,
  solvesImplementationIndicator,
  setSupportCycle,
  setReadsImplementationIndicatorsList,
  setReadsStrategiesUsedList,
  setReadsWorkFocusList,
  readsStrategiesUsedList,
  setNycTouchpoint,
  setNycReadsAdmin,
  setNycReadsAdminsSupportedType,
  setReadsPrimaryFocus,
  setSolvesGradeLevels,
  solvesGradeLevels,
  setSolvesPrimaryStrategyList,
  solvesPrimaryStrategyList,
  setSolvesSpecificStrategyList,
  readsGradeLevels,
  setReadsGradeLevels,
  setNycSolvesAdmin,
  nycSolvesAdmin,
  setSolvesIntervisitation,
  setSolvesLeaderCycle,
  setSolvesAdminPrimaryStrategy,
  setSolvesTouchpoint,
  nycReadsAdminsSupportedType,
}) => {
  function resetReadsStates() {
    setReadsImplementationIndicatorsList([]);
    setReadsStrategiesUsedList([]);
    setReadsWorkFocusList([]);
    setNycReadsAdmin();
    setNycReadsAdminsSupportedType([]);
    setReadsPrimaryFocus();
    setReadsGradeLevels([]);
    setNycTouchpoint();
  }
  function resetSolvesStates() {
    setSolvesImplementationIndicator("");
    setSupportCycle("");
    setSolvesGradeLevels([]);
    setSolvesPrimaryStrategyList([]);
    setSolvesSpecificStrategyList([]);
    setNycSolvesAdmin();
    setSolvesIntervisitation();
    setSolvesLeaderCycle();
    setSolvesAdminPrimaryStrategy();
    setSolvesTouchpoint();
  }

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
            if (e.target.value === "NYC Reads") {
              resetReadsStates();
            } else if (e.target.value === "NYC Solves") {
              resetSolvesStates();
            }
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
                (Required)*
              </strong>
            </Form.Label>
            <DropdownMultiselect
              options={supportedTeachers}
              name="teachersSupportedType"
              handleOnChange={(selected) => {
                setTeachersSupportedType(selected);
              }}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{
                display: teachersSupportedType.length !== 0 ? "none" : "block",
              }}
            >
              Please choose an option.
            </Form.Control.Feedback>
          </Form.Group>
          {NYCDone === "NYC Reads" ? (
            <NYCReads
              setReadsImplementationIndicatorsList={
                setReadsImplementationIndicatorsList
              }
              setReadsStrategiesUsedList={setReadsStrategiesUsedList}
              setReadsWorkFocusList={setReadsWorkFocusList}
              NYCGradeLevel={NYCGradeLevel}
              readsStrategiesUsedList={readsStrategiesUsedList}
              setNycReadsAdmin={setNycReadsAdmin}
              nycReadsAdmin={nycReadsAdmin}
              setNycReadsAdminsSupportedType={setNycReadsAdminsSupportedType}
              setReadsPrimaryFocus={setReadsPrimaryFocus}
              readsGradeLevels={readsGradeLevels}
              setReadsGradeLevels={setReadsGradeLevels}
              setNycTouchpoint={setNycTouchpoint}
              nycReadsAdminsSupportedType={nycReadsAdminsSupportedType}
            />
          ) : (
            <NYCSolves
              setSolvesImplementationIndicator={
                setSolvesImplementationIndicator
              }
              solvesImplementationIndicator={solvesImplementationIndicator}
              setSupportCycle={setSupportCycle}
              setSolvesGradeLevels={setSolvesGradeLevels}
              solvesGradeLevels={solvesGradeLevels}
              setSolvesPrimaryStrategyList={setSolvesPrimaryStrategyList}
              solvesPrimaryStrategyList={solvesPrimaryStrategyList}
              setSolvesSpecificStrategyList={setSolvesSpecificStrategyList}
              setNycSolvesAdmin={setNycSolvesAdmin}
              nycSolvesAdmin={nycSolvesAdmin}
              setSolvesIntervisitation={setSolvesIntervisitation}
              setSolvesLeaderCycle={setSolvesLeaderCycle}
              setSolvesAdminPrimaryStrategy={setSolvesAdminPrimaryStrategy}
              setSolvesTouchpoint={setSolvesTouchpoint}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

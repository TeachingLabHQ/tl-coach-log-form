import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";

export const DTEQuestions = ({
  projects,
  team,
  pjRoles,
  pjTypeRef,
  pjOptions,
  handleTypeChange,
  handleProjectChange,
  removeProjectFields,
  addProjectFields,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicCourse">
        <Row>
          <Col className="my-1">
            <Form.Label>
              <strong>Coachee*</strong>
            </Form.Label>
          </Col>
          <Col className="my-1">
            <Form.Label>
              <strong>Role*</strong>
            </Form.Label>
          </Col>
          <Col className="my-1">
            <Form.Label>
              <strong>Completed?*</strong>
            </Form.Label>
          </Col>
          <Col className="my-1">
            <Form.Label>
              <strong>Duration*</strong>
            </Form.Label>
          </Col>
          {projects.length > 1 ? <Col sm={1} className="my-1"></Col> : null}
        </Row>
        {projects.map((ele, idx) => (
          <Row key={ele.projectId}>
            <Row>
              <Col className="my-1">
                <Form.Label visuallyHidden="true">type</Form.Label>
                <Form.Control
                  as="select"
                  name="projectType"
                  aria-label="Default select example"
                  ref={pjTypeRef}
                  onChange={(e) => {
                    handleTypeChange(e, ele);
                    handleProjectChange(idx, e);
                  }}
                  required
                >
                  <option></option>
                  {team &&
                    team.map((val, index) => (
                      <option value={val}>{val}</option>
                    ))}
                </Form.Control>
              </Col>
              <Col className="my-1">
                <Form.Label visuallyHidden="true">name</Form.Label>
                <Select
                  options={
                    projects[idx].projectType === ""
                      ? pjOptions[0][ele.projectId]
                      : pjOptions.filter((e) => {
                          return e.hasOwnProperty(ele.projectId);
                        })[0][ele.projectId]
                  }
                  name="projectRole"
                  onChange={(e) => {
                    handleProjectChange(idx, e);
                  }}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      color: "black",
                    }),
                    menu: (styles) => ({ ...styles, width: "250px" }),
                  }}
                  required
                />
              </Col>
              <Col className="my-1">
                <Form.Label visuallyHidden="true">role</Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Default select example"
                  name="projectRole"
                  onChange={(e) => handleProjectChange(idx, e)}
                  required
                >
                  <option></option>
                  {pjRoles.map((val) =>
                    projects.some((i) => {
                      return i.projectId == ele.projectId;
                    }) &&
                    projects[
                      projects.findIndex((i) => {
                        return i.projectId == ele.projectId;
                      })
                    ].projectRole == val.value ? (
                      <option value={val.value} selected>
                        {val.value}
                      </option>
                    ) : (
                      <option value={val.value}>{val.value}</option>
                    ),
                  )}
                </Form.Control>
              </Col>
              <Col className="my-1">
                <Form.Label visuallyHidden="true">hours</Form.Label>
                <Form.Control
                  type="number"
                  name="projectHours"
                  min="0"
                  onChange={(e) => handleProjectChange(idx, e)}
                  step="any"
                  placeholder="Enter Time"
                  required
                />
              </Col>

              {projects.length > 1 ? (
                <Col sm={1} className="my-1">
                  <Button
                    variant="danger"
                    onClick={() => removeProjectFields(ele)}
                  >
                    X
                  </Button>
                </Col>
              ) : null}
            </Row>
          </Row>
        ))}
      </Form.Group>

      <Form.Group className="mb-4" id="formGridCheckbox">
        <Button variant="secondary" onClick={() => addProjectFields()}>
          + Add Row
        </Button>
      </Form.Group>
    </>
  );
};

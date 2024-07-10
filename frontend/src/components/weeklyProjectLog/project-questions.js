export const projectQuestions = async () => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicCourse">
        <Row>
          <Col className="my-1">
            <Form.Label>
              <strong>Project Type*</strong>
            </Form.Label>
          </Col>
          <Col className="my-1">
            <Form.Label>
              <strong>Project Name*</strong>
            </Form.Label>
          </Col>
          <Col className="my-1">
            <Form.Label>
              <strong>Project Role*</strong>
            </Form.Label>
          </Col>
          <Col className="my-1">
            <Form.Label>
              <strong>Work Hours*</strong>
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
            {popup.map((el, idx) =>
              (el.reminderId == ele.projectId) & (el.reminderContent != "") ? (
                <Alert
                  url={el.reminderUrl}
                  key="info"
                  variant="info"
                  onClose={() => toggleShowA(ele)}
                  dismissible
                >
                  {el.reminderUrl == null ? (
                    "Note: "
                  ) : (
                    <Alert.Link href={el.reminderUrl[0]} target="_blank">
                      {" "}
                      Click the Link{" "}
                    </Alert.Link>
                  )}
                  {el.reminderContent}
                </Alert>
              ) : null,
            )}
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

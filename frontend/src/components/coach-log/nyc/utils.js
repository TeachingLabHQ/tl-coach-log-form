import Form from "react-bootstrap/Form";
export const TouchpointDurationQuestion = ({ setTouchpointDuration }) => {
  const hourOptions = [1, 2, 3, 4, 5, 6];
  return (
    <Form.Group className="mb-3" controlId="formBasicSite">
      <Form.Label>
        <strong>
          What was the duration of your professional learning support, in hours?
        </strong>
      </Form.Label>
      <Form.Control
        as="select"
        name="touchpoint"
        aria-label="Default select example"
        onChange={(e) => {
          setTouchpointDuration(e.target.value);
        }}
        required
      >
        <option value=""></option>
        {hourOptions.map((h) => (
          <option value={h}>{h}</option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        Please choose an option.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

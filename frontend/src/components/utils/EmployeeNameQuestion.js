import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
export const EmployeeNameQuestion = () => {
  const [selectedCoach, setSelectedCoach] = useState();
  const [cfInfo, setCfInfo] = useState([]);
  const getFTEmployeeNames = () => {
    let queryEmployee =
      '{boards(ids:2227132353) {items_page (limit:200) { items { name column_values(ids:"dropdown7"){text}}}}}';
    axios
      .post("/demo/getMonday", {
        query: queryEmployee,
      })
      .then((res) => res.data.data.boards[0].items_page.items)
      .then((items) => {
        const uniqueNames = new Set(items.map((val) => val.name));
        setCfInfo((prevInfo) => {
          return Array.from(new Set([...prevInfo, ...uniqueNames])).sort(
            (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
          );
        });
      });
  };
  const getCFNames = () => {
    let queryCF =
      "{boards(ids:2208860812) {items_page (limit:200) { items { name }}}}";
    axios
      .post("/demo/getMonday", {
        query: queryCF,
      })
      .then((res) => res.data.data.boards[0].items_page.items)
      .then((items) => {
        const uniqueNames = new Set(items.map((val) => val.name));
        setCfInfo((prevInfo) => {
          return Array.from(new Set([...prevInfo, ...uniqueNames])).sort(
            (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
          );
        });
      });
  };
  useEffect(() => {
    getFTEmployeeNames();
    getCFNames();
  }, []);
  return (
    <>
      <Form.Group className="mb-5" controlId="formBasicSite">
        <Form.Label>
          <strong>Please select your name from the drop-down menu*</strong>
        </Form.Label>
        <Form.Control
          name="coachName"
          as="select"
          onChange={(e) => {
            setSelectedCoach(e.target.value);
          }}
          required
        >
          <option></option>
          {cfInfo.map((val, idx) => (
            <option value={val}>{val}</option>
          ))}
          <option value={"missing name"}>Others: My name is not here</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose a name.
        </Form.Control.Feedback>
      </Form.Group>

      {selectedCoach === "missing name" ? (
        <Form.Group className="mb-5" controlId="formBasicSite">
          <Form.Label>
            <strong>Please enter your full name:*</strong>
          </Form.Label>
          <Form.Control
            name="coachNameManual"
            as="input"
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a name.
          </Form.Control.Feedback>
        </Form.Group>
      ) : null}
    </>
  );
};

import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
export const EmployeeNameQuestion = () => {
    const [selectedName,setSelectedName] = useState();
    const [employmentInfo, setEmploymentInfo] = useState([]);
    const getEmployeeNames = () => {
        let queryEmployee =
        '{boards(ids:2227132353) {items_page (limit:200) { items { name column_values(ids:"dropdown7"){text}}}}}';
      axios
        .post("/demo/getMonday", {
          query: queryEmployee,
        })
        .then((res) => res.data.data.boards[0].items_page.items)
        .then((items) => {
          items.map((val, index) =>
            setEmploymentInfo((employmentInfo) =>
              [
                ...employmentInfo,
                { name: val.name, department: val.column_values[0].text },
              ].sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
              }),
            ),
          );
        })
    }
    useEffect(()=>{
        getEmployeeNames();
    },[]) 
    return (
        <>
        <Form.Group className="mb-5" controlId="formBasicSite">
        <Form.Label>
              <strong>Please select your name from the drop-down menu*</strong>
            </Form.Label>
            <Form.Control
              name="employeeName"
              as="select"
              aria-label="Default select example"
              onChange={(e)=>{setSelectedName(e.target.value)}}
              required
            >
              <option></option>
              {employmentInfo.map((val, idx) => (
                <option value={val.name}>{val.name}</option>
              ))}
              <option value={"missing name"}>
                Others: My name is not here
              </option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose a name.
            </Form.Control.Feedback>
          </Form.Group>

          {selectedName === "missing name" ? (
            <Form.Group className="mb-5" controlId="formBasicSite">
              <Form.Label>
                <strong>Please enter your full name:*</strong>
              </Form.Label>
              <Form.Control
                name="employeeNameManual"
                as="input"
                aria-label="Default select example"
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please input a name.
              </Form.Control.Feedback>
            </Form.Group>
          ) : null}
        </>
    )
}
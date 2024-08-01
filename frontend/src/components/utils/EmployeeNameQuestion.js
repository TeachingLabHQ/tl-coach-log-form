import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
export const EmployeeNameQuestion = () => {
  const [selectedCoach, setSelectedCoach] = useState();
  const [cfInfo, setCfInfo] = useState([]);
  const getMondayProfiles = () => {
    let queryMondayProfiles = `{users  {
      email
      name
    id
    
    }}`;
    axios
      .post("/demo/getMonday", {
        query: queryMondayProfiles,
      })
      .then((res) => res.data.data.users)
      .then((users) => {
        const uniqueUsers = Array.from(
          new Set(users.map((user) => user.email))
        ).map((email) => users.find((user) => user.email === email));
        const newUsers = uniqueUsers.map((user) => ({
          name: user.name,
          email: user.email,
          id: user.id,
        }));
        setCfInfo((prevInfo) => {
          const allUsers = [...prevInfo, ...newUsers];
          const uniqueAllUsers = Array.from(
            new Set(allUsers.map((user) => user.email))
          ).map((email) => allUsers.find((user) => user.email === email));
          return uniqueAllUsers.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
        });
      });
  };
  useEffect(() => {
    getMondayProfiles();
    console.log(cfInfo);
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
            setSelectedCoach(JSON.parse(e.target.value).name);
          }}
          required
        >
          <option></option>
          {cfInfo.map((val, idx) => (
            <option value={JSON.stringify({ name: val.name, id: val.id })}>
              {val.name}
            </option>
          ))}
          <option value={JSON.stringify({ name: "missing name", id: 0 })}>
            Others: My name is not here
          </option>
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

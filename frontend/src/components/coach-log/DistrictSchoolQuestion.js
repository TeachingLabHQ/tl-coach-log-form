import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";

export const DistrictSchoolQuestion = ({
  setDistrictSelected,
  setSchoolSelected,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  const [districtSchools, setDistrictSchools] = useState({});
  const [schoolList, setSchoolList] = useState([]);
  // const getDistrictInfoFromGoogleSheet = (e) => {
  //   axios.post("/demo/getDistrictSchool").then((res) => {
  //     const districtSchools = res.data;
  //     console.log(districtSchools);
  //     let schoolsByDistrict = {};
  //     for (const district of districtSchools) {
  //       for (let i = 1; i < district.length; i++) {
  //         const districtName = district[0];
  //         if (!schoolsByDistrict[districtName]) {
  //           schoolsByDistrict[districtName] = [district[i]];
  //         } else {
  //           schoolsByDistrict[districtName].push(district[i]);
  //         }
  //       }
  //     }
  //     setDistrictSchools(schoolsByDistrict);
  //   });
  // };
  useEffect(() => {
    // getDistrictInfoFromGoogleSheet();
  }, []);
  const onSelectDistrict = (e) => {
    setSelectedDistrict(e.target.value);
    setDistrictSelected(e.target.value);
    const schools = districtSchools[e.target.value];
    setSchoolList(schools);
  };
  return (
    <>
      <Form.Group className="mb-5" controlId="formBasicSite">
        <Form.Label>
          <strong>What district did you coach today?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="districtName"
          aria-label="Default select example"
          onChange={(e) => {
            onSelectDistrict(e);
          }}
          required
        >
          <option></option>
          {Object.entries(districtSchools).map(([key, val], idx) => (
            <option value={key}>{key}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose a district.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5" controlId="formBasicSite">
        <Form.Label>
          <strong>What school did you coach today?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="schoolName"
          aria-label="Default select example"
          onChange={(e) => {
            setSelectedSchool(e.target.value);
            setSchoolSelected(e.target.value);
          }}
          required
        >
          <option></option>
          {schoolList.map((val, idx) => (
            <option value={val}>{val}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose a district.
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

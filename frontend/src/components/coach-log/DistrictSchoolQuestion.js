import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";

export const DistrictSchoolQuestion = ({
  setDistrictSelected,
  setSchoolSelected,
  schoolSelected,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [districtSchools, setDistrictSchools] = useState({});
  const [schoolList, setSchoolList] = useState([]);
  const getDistrictInfoFromGoogleSheet = (e) => {
    axios.post("/demo/getDistrictSchool").then((res) => {
      const districtSchools = res.data;
      let schoolsByDistrict = {};
      for (const district of districtSchools) {
        const districtName = district[0];
        //use N/A as an option if no schools are added
        if (district.length === 1) {
          schoolsByDistrict[districtName] = [{ label: "N/A", value: ["N/A"] }];
        } else {
          for (let i = 1; i < district.length; i++) {
            if (!schoolsByDistrict[districtName]) {
              schoolsByDistrict[districtName] = [
                { label: district[i], value: [district[i]] },
              ];
            } else {
              schoolsByDistrict[districtName].push({
                label: district[i],
                value: [district[i]],
              });
            }
          }
          if (districtName === "NY_D75") {
            schoolsByDistrict[districtName].unshift({
              label: "all D75 schools",
              value: district.slice(1),
            });
          }
          if (districtName === "NY_D9") {
            schoolsByDistrict[districtName].unshift({
              label: "all D9 schools",
              value: district.slice(1),
            });
          }
          if (districtName === "NY_D13") {
            schoolsByDistrict[districtName].unshift({
              label: "all D13 schools",
              value: district.slice(1),
            });
          }
        }
      }
      setDistrictSchools(schoolsByDistrict);
    });
  };
  useEffect(() => {
    getDistrictInfoFromGoogleSheet();
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
            setSchoolSelected("");
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
            setSchoolSelected(JSON.parse(e.target.value));
          }}
          required
          value={schoolSelected ? JSON.stringify(schoolSelected) : ""}
        >
          <option></option>
          {schoolList.map((val, idx) => (
            <option value={JSON.stringify(val)}>{val.label}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose a district.
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

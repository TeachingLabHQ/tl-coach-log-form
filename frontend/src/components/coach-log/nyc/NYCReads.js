import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { focusOfWork, strategiesUsed } from "../utils";
import React, { useState, useEffect } from "react";
import { NYCReadsSubQuestions } from "./NYCReadsSubQuestions";

export const NYCReads = ({
  NYCGradeLevel,
  setReadsImplementationIndicatorsList,
  setReadsStrategiesUsedList,
  setReadsWorkFocusList,
  readsStrategiesUsedList,
}) => {
  const [readsGradeLevels, setReadsGradeLevels] = useState([]);
  useEffect(() => {
    // Filter each list directly by only keeping items that start with one of the selected grade levels
    const filterListsByGradeLevels = (setter) => {
      setter((prevList) =>
        prevList.filter((item) =>
          readsGradeLevels.some((level) => item.startsWith(`(${level})`))
        )
      );
    };

    filterListsByGradeLevels(setReadsImplementationIndicatorsList);
    filterListsByGradeLevels(setReadsStrategiesUsedList);
    filterListsByGradeLevels(setReadsWorkFocusList);
  }, [
    readsGradeLevels,
    setReadsImplementationIndicatorsList,
    setReadsStrategiesUsedList,
    setReadsWorkFocusList,
  ]);
  return (
    <>
      <Form.Group className="mb-1" controlId="formBasicSite">
        <Form.Label>
          <strong>Select all the grade-levels you supported today</strong>
        </Form.Label>
        <DropdownMultiselect
          options={NYCGradeLevel}
          name="NYCReadsGradeLevels"
          handleOnChange={(selected) => {
            setReadsGradeLevels(selected);
          }}
          required
        />
      </Form.Group>
      {readsGradeLevels.map((g) => (
        <NYCReadsSubQuestions
          key={g}
          readsGradeLevel={g}
          setReadsImplementationIndicatorsList={
            setReadsImplementationIndicatorsList
          }
          setReadsStrategiesUsedList={setReadsStrategiesUsedList}
          setReadsWorkFocusList={setReadsWorkFocusList}
          readsStrategiesUsedList={readsStrategiesUsedList}
        />
      ))}
    </>
  );
};

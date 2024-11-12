import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { focusOfWork, strategiesUsed } from "../utils";
import React, { useState, useEffect } from "react";
import { NYCReadsSubQuestions } from "./NYCReadsSubQuestions";
import { nycSchoolLeaders } from "../utils";
import { nycReadsPrimaryFocus } from "../utils";

export const NYCReads = ({
  NYCGradeLevel,
  setReadsImplementationIndicatorsList,
  setReadsStrategiesUsedList,
  setReadsWorkFocusList,
  setNycReadsAdmin,
  readsStrategiesUsedList,
  nycReadsAdmin,
  setNycReadsAdminsSupportedType,
  setReadsPrimaryFocus,
  readsGradeLevels,
  setReadsGradeLevels,
  setNycTouchpoint,
}) => {
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
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>What type of touchpoint are you recording?</strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="NYCtouchpoint"
          aria-label="Default select example"
          onChange={(e) => {
            setNycTouchpoint(e.target.value);
          }}
          required
        >
          <option value=""></option>
          <option value="Single school teacher support">
            Single school teacher support
          </option>
          <option value="Multi-school professional learning">
            Multi-school professional learning
          </option>
          <option value="Leader support only">Leader support only</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
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
      <Form.Group className="mb-3" controlId="formBasicSite">
        <Form.Label>
          <strong>
            Did you meet with the school administrators and/or school-based
            coach today?
          </strong>
        </Form.Label>
        <Form.Control
          as="select"
          name="NYCAdmin"
          aria-label="Default select example"
          onChange={(e) => {
            setNycReadsAdmin(e.target.value);
          }}
          required
        >
          <option value=""></option>
          <option value="Yes - debriefed teacher support only">
            Yes - debriefed teacher support only
          </option>
          <option value="Yes - provided leader specific support">
            Yes - provided leader specific support
          </option>
          <option value="no">No</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
      {nycReadsAdmin === "Yes - provided leader specific support" ? (
        <>
          <Form.Group className="mb-1" controlId="formBasicSite">
            <Form.Label>
              <strong>
                Which school leaders did you support directly today? Select all
                that apply.
              </strong>
            </Form.Label>
            <DropdownMultiselect
              options={nycSchoolLeaders}
              name="nycSchoolLeaders"
              handleOnChange={(selected) => {
                setNycReadsAdminsSupportedType(selected);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSite">
            <Form.Label>
              <strong>
                Select the primary focus of the support provided to leaders in
                this school:
              </strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="readsPrimaryFocus"
              aria-label="Default select example"
              required
              onChange={(e) => {
                setReadsPrimaryFocus(e.target.value);
              }}
            >
              <option value=""></option>
              {nycReadsPrimaryFocus.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose an option.
            </Form.Control.Feedback>
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

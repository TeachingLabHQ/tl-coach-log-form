import Form from "react-bootstrap/Form";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import DatePicker from "react-datepicker";
import { useState } from "react";


export const DateQuestion = () => {
    const [selecedDate, setSelectedDate] = useState(
        new Date().setDate(new Date().getDate() - new Date().getDay() + 1),
      );
    const formatDate = (e) => {
        let ogDate = e == null ? selecedDate : e;
        const dateValue = new Date(ogDate);
        const startMonth = ("0" + (dateValue.getMonth() + 1)).slice(-2);
        const startDay = ("0" + dateValue.getDate()).slice(-2);
        const formattedDateStart = `${startMonth}/${startDay}`;
        const endDateValue = new Date(dateValue.setDate(dateValue.getDate() + 6));
        const endMonth = ("0" + (endDateValue.getMonth() + 1)).slice(-2);
        const endDay = ("0" + endDateValue.getDate()).slice(-2);
        const formattedDateEnd = `${endMonth}/${endDay}`;
        // setFormattedDateStart(formattedDateStart);
        // setFormattedDateEnd(formattedDateEnd);
      };
    return (<Form.Group className="mb-4" as={Col} controlId="formBasicEmail">
        <Form.Label>
          <strong>Please select the date:*</strong>
        </Form.Label>
        <div className="customDatePickerWidth">
          <DatePicker
            showIcon
            selected={selecedDate}
            onChange={(date) => {
              setSelectedDate(date);
              formatDate(date);
            }}
            name="date"
            style={{ width: "100%" }}
          />
        </div>
      </Form.Group>);
}
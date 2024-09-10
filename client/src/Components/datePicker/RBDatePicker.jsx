import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";

import "./RBDatePicker.css";

const RBDatePicker = ({value, onChange}) => {
  return (
    <Form.Group controlId="formDateTime" className="mb-3">
      <Form.Label>Fecha programada</Form.Label>
      <br />
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="form-control full-width-picker"
        placeholderText="Select date and time"
      />
    </Form.Group>
  );
};

export default RBDatePicker;

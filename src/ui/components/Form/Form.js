import React from "react";

import $ from "./Form.module.css";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const Form = ({ legendName, onSubmit, primaryPlaceholder, primaryName, primaryValue, primaryOnChange, secondaryPlaceholder, secondaryName, secondaryValue, secondaryOnChange, buttonName }) => {
  return (
    <form onSubmit={onSubmit}>
    <fieldset>
      <legend>{legendName}</legend>
      <div className={$.formRow}>
        <InputText
          name={primaryName}
          onChange={primaryOnChange}
          placeholder={primaryPlaceholder}
          value={primaryValue}
        />
      </div>
      <div className={$.formRow}>
        <InputText
          name={secondaryName}
          onChange={secondaryOnChange}
          value={secondaryValue}
          placeholder={secondaryPlaceholder}
        />
      </div>
      <Button type="submit" variant="primary">
          {buttonName}
      </Button>
    </fieldset>
  </form>
  );
};

export default Form;
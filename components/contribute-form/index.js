import { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

const ContributeForm = ({ contribute }) => {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    contribute(value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label htmlFor="">Amount to contribute</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="eth"
          labelPosition="right"
        />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  );
};

export default ContributeForm;

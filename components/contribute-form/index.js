import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

const ContributeForm = ({ contribute, errorMessage, loading }) => {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    contribute(value);
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label htmlFor="">Amount to contribute</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="eth"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button loading={loading} primary>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;

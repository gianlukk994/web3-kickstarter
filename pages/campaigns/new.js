import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { Layout } from "../../components";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const [contribution, setContribution] = useState();
  const [errMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(contribution).send({
        from: accounts[0],
      });
      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h1>New Campaign!</h1>
      <Form onSubmit={onSubmit} error={!!errMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
        </Form.Field>
        {errMessage && <Message error header="Oops!" content={errMessage} />}
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;

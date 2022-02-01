import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { Layout } from "../../components";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const [contribution, setContribution] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await factory.methods.createCampaign(contribution).send({
      from: accounts[0],
    });
  };

  return (
    <Layout>
      <h1>New Campaign!</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
        </Form.Field>
        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;

import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    };
  });

  return (
    <>
      <h3>Open Campaigns</h3>
      <Card.Group items={items} />
      <Button content="Create Campaign" icon="add circle" primary={true} />
    </>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;

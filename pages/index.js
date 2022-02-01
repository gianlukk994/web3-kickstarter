import React from "react";
import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  console.log(campaigns);

  return <h1>Hello!</h1>;
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;

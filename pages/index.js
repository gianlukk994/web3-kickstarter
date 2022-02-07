import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Layout } from "../components";
import factory from "../ethereum/factory";

const CampaignIndex = ({ campaigns }) => {
  const router = useRouter();

  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
      fluid: true,
    };
  });

  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Button
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary={true}
        onClick={() => router.push("/campaigns/new")}
      />
      <Card.Group items={items} />
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;

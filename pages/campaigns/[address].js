import React from "react";
import { Card } from "semantic-ui-react";
import { Layout } from "../../components";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

const CampaignShow = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description:
        "The Manager created this campaign and can create requests to withdraw money",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minumum Contribution (wei)",
      description: "You must contribute at least this much wei to contribute",
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw money from the contract. Request must be approved from approvers",
    },
    {
      header: approversCount,
      meta: "Number of approvers",
      description: "Number of people that already donated to this campaign",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (eth)",
      description:
        "The balance is how much money this campaign has left to spend.",
    },
  ];

  return (
    <Layout>
      <Card.Group items={items} />
    </Layout>
  );
};

export default CampaignShow;

CampaignShow.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

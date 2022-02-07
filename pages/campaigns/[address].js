import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, Grid } from "semantic-ui-react";
import { Layout, ContributeForm } from "../../components";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

const CampaignShow = ({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const contribute = async (value) => {
    setErrorMessage(false);
    setLoading(true);

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });

      setLoading(false);

      router.replace(`/campaigns/${address}`);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Column width={10}>
          <Card.Group items={items} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm
            contribute={contribute}
            errorMessage={errorMessage}
            loading={loading}
          />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default CampaignShow;

CampaignShow.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

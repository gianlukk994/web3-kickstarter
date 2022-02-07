import { useRouter } from "next/router";
import { Button, Table } from "semantic-ui-react";
import { Layout } from "../../../../components";
import Campaign from "../../../../ethereum/campaign";

const Requests = ({ address }) => {
  const router = useRouter();

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests</h3>
      <Button
        primary
        onClick={() => router.push(`/campaigns/${address}/requests/new`)}
      >
        Add request
      </Button>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
      </Table>
    </Layout>
  );
};

export default Requests;

Requests.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();

  const requests = await Promise.all(
    Array(Number(requestCount))
      .fill()
      .map((_, index) => campaign.methods.requests(index).call())
  );

  return {
    address,
    requests,
    requestCount,
  };
};

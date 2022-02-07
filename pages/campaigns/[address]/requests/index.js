import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { Layout } from "../../../../components";

const Requests = ({ address }) => {
  const router = useRouter();

  return (
    <Layout>
      <h3>Requests</h3>
      <Button
        primary
        onClick={() => router.push(`/campaigns/${address}/requests/new`)}
      >
        Add request
      </Button>
    </Layout>
  );
};

export default Requests;

Requests.getInitialProps = async (ctx) => {
  const { address } = ctx.query;

  return {
    address,
  };
};

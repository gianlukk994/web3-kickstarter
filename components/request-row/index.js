import { Button, Table } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";

const RequestRow = ({ address, approversCount, idx, request }) => {
  const { approvalCount, complete, description, recipient, value } = request;
  const { Row, Cell } = Table;
  const readyToFinalize = approvalCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(idx).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(idx).send({
      from: accounts[0],
    });
  };

  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell>{idx}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{approvalCount + "/" + approversCount}</Cell>
      <Cell>
        {complete ? null : (
          <Button onClick={onApprove} color="green" basic>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button onClick={onFinalize} color="teal" basic>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;

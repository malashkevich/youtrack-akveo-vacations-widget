import React from 'react';
import {Button, Radio, Icon, Table} from 'semantic-ui-react';

export class IssuesTable extends React.Component {

  renderRow(issue) {
    return (
      <Table.Row key={issue.id}>
        <Table.Cell>
          <Radio
            onChange={data => this.props.onMainChange(issue.id)}
            checked={issue.isMain}/>
        </Table.Cell>
        <Table.Cell>{issue.title}</Table.Cell>
      </Table.Row>
    )
  }

  render() {
    let {issues} = this.props;
    return (
      <Table compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell/>
            <Table.HeaderCell>ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => this.renderRow(issue))}
        </Table.Body>
      </Table>
    )
  }
}
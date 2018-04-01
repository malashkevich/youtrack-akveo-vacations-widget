import React from 'react';
import {Button, Divider, Icon, Row, Table} from 'antd';

export class PreviewTable extends React.Component {

  columns = [{
    title: 'Date',
    dataIndex: 'title',

    render: (text, record) => this.renderAction(record)
  }];


  renderAction(item) {
    return (
      <Row type='flex' justify='space-between'>
        {item.title}
        <Button onClick={() => this.props.excludeDay(item.key)}
                shape='circle' type='danger' size='small' icon='delete'/>
      </Row>
    )
  }

  render() {
    return (
      <Table pagination={false} dataSource={this.props.data} columns={this.columns}/>
    )
  }
}
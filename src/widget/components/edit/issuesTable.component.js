import React from 'react';
import {Table} from 'antd';

const columns = [{
  title: 'Id',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'title',
}];


export class IssuesTableComponent extends React.Component {

  render() {
    let {issues} = this.props;
    let selectedKeys = issues.length > 0 ? [this.props.mainIssueId] : [];
    let data = issues.map(issue => {
      return {
        ...issue,
        key: issue.id
      }
    });
    return (
      <Table
        pagination={false} size='small'
        dataSource={data} columns={columns}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          type: 'radio',
          hideDefaultSelections: true,
          onChange: (key) => {
            this.props.onMainChange(key[0])
          }
        }}/>
    )
  }
}
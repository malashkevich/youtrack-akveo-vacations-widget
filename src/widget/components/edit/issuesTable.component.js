import React from 'react';
import {Alert, Table} from 'antd';

export class IssuesTableComponent extends React.Component {

  columns = [{
    title: 'Id',
    dataIndex: 'id',
  }, {
    title: 'Name',
    dataIndex: 'title',
  }];

  renderEmpty() {
    return(
      <Alert
        message='No issues found'
        description='Please create issue in VACATIONS project and reload this page.'
        type='info'
        showIcon
      />
    )
  }

  render() {
    let {issues} = this.props;
    if (issues.length === 0)
      return this.renderEmpty();
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
        dataSource={data} columns={this.columns}
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
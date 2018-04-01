import React from 'react';
import {Table} from 'antd';

const columns = [{
  title: 'Id',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'title',
}];


export class IssuesTable extends React.Component {

  render() {
    let {issues} = this.props;
    let data = issues.map(issue => {
      return {
        ...issue,
        key: issue.id
      }
    });
    return (
      <Table pagination={false} dataSource={data} columns={columns}
             rowSelection={{
               type: 'radio',
               hideDefaultSelections: true,
               onChange: (key) => {
                 this.props.onMainChange(key[0])
               }
             }}/>
    )
  }
}
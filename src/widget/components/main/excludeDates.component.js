import React from 'react';
import {PreviewTable} from './previewTable.component';
import {Button, Card, Divider, Row} from 'antd';
import {VacationsCounter} from './vacationsCounter';

export class ExcludeDatesComponent extends React.Component {

  render() {
    return (
      <div className='dates-exclude step-content'>
        <Card title='Select dates of your vacation'>
          <p>Exclude days that shouldn't be affected: day-off's, official holidays.</p>
          <VacationsCounter count={this.props.daysCount}/>
          <PreviewTable
            data={this.props.previewItems}
            excludeDay={day => this.props.excludeDay(day)}/>
          <Divider dashed={true}/>
          <Row type='flex' justify='end'>
            <Button className={'nav-button'}
                    disabled={this.props.isLoading}
                    onClick={() => this.props.prev()}>Go back</Button>
            <Button className={'nav-button'}
                    type='primary'
                    loading={this.props.isLoading}
                    disabled={!this.props.nextEnabled}
                    onClick={() => this.props.next()}>Next</Button>
          </Row>

        </Card>
      </div>
    )
  }
}
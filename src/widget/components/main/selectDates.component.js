import React from 'react';
import {Card, Divider, DatePicker, Row, Button} from 'antd';
import {Link} from '../controls/link';
import {VacationsCounter} from './vacationsCounter';
const {RangePicker} = DatePicker;

export class SelectDatesComponent extends React.Component {

  render() {
    let dates = this.props.dateRange.toJS();
    let {issueData} = this.props;
    return (
      <div className='select-dates step-content'>
        <Card title='Select dates of your vacation'>
          <p>Target issue: <Link {...issueData} /></p>
          <VacationsCounter count={this.props.daysCount}/>
          <Divider orientation='left'>Choose dates</Divider>

          <RangePicker value={dates}
                       onChange={range => this.props.changeDates(range)}/>
          <Divider dashed={true}/>
          <Row type='flex' justify='end'>
            <Button type='primary'
                    disabled={!this.props.nextEnabled}
                    onClick={() => this.props.next()}>Next</Button>
          </Row>
        </Card>
      </div>
    )
  }
}
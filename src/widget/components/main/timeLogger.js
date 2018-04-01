import React from 'react';
import {DatePicker, Button} from 'antd';
import {observer} from 'mobx-react'
import {PreviewTable} from './previewTable';

const {RangePicker} = DatePicker;

@observer
export class TimeLogger extends React.Component {

  render() {
    let dates = this.props.dateRange.toJS();
    let previewItems = this.props.previewItems;

    return (
      <div>
        <RangePicker value={dates}
                     onChange={range => this.props.onDatesChange(range)}/>

        <div>
          <h3>{`Days for vacations:${this.props.daysCount}`}</h3>
        </div>

        <PreviewTable
          data={previewItems}
          excludeDay={day => this.props.excludeDay(day)}/>

        <Button type='primary'
                loading={this.props.isLoading}
                onClick={() => this.props.logTime()}>
          Start vacation!
        </Button>
      </div>
    )
  }
}
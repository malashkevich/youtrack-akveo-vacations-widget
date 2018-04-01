import React from 'react';

export class VacationsCounter extends React.Component {

  render() {
    return(
      <div>
          <h3>{`Days selected: ${this.props.count}`}</h3>
      </div>
    )
  }
}
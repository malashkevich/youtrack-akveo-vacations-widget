import React from 'react';

export class Link extends React.Component {

  render() {
    let {text,href} = this.props;
    return(
      <a target='_blank' href={href}>{text}</a>
    )
  }
}
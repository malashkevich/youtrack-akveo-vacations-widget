import React from 'react';

export class Link extends React.Component {

  render() {
    let {text,href} = this.props;
    return(
      <a href={href}>{text}</a>
    )
  }
}
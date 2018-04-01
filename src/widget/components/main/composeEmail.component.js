/* eslint-disable no-undef */
import React from 'react';
import {Button, Card, Collapse, Divider, Row} from 'antd';
import {inject} from 'mobx-react'
import {getMailtoUrl} from '../../utils/mailto';
import {composeText} from '../../utils/mailText';

const Panel = Collapse.Panel;

@inject('mainVM')
export class ComposeEmailComponent extends React.Component {

  render() {
    let {mainVM} = this.props;
    let text = composeText(mainVM.filteredDates);
    let htmlText = text.replace(/\n/g, '<br />');
    let linkText = getMailtoUrl(mainVM.username, text);

    return (
      <div className='send-email step-content'>
        <Card title='Compose email notification'>
          <p>It's mandatory to send an email notification to <b>vacation.requests@akveo.com</b>.
            If you want to have a predefined email with dates - it's easy.
          </p>
          <p>Just click on one of the the links below:</p>
          <Button icon='mail' type='primary' href={linkText}>Open mail app</Button>
          <Collapse accordion className='email-panel'>
            <Panel header='You also can copy text and paste it to gmail or inbox.' key='1'>
              <div dangerouslySetInnerHTML={{__html: htmlText}}></div>
            </Panel>
          </Collapse>
          <Divider dashed={true}/>
          <Row type='flex' justify='end'>
            <Button type='primary' onClick={() => {
              mainVM.reset();
              this.props.reset();
            }}>
              Finish
            </Button>
          </Row>

        </Card>
      </div>
    )
  }
}
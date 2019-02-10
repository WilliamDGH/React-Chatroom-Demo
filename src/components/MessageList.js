import React, { Component } from 'react';

import Message from './Message'

const DUMMY_DATA = [
    {
        senderId: 'perborgen',
        text: 'Hey, how is it going?'
    },
    {
        senderId: 'janedoe',
        text: 'Great! How about you?'
    },
    {
        senderId: 'perborgen',
        text: 'Good to hear! I am great as well'
    },
    {
        senderId: 'perborgen',
        text: 'Good to hear! I am great as'
    }
]

class MessageList extends Component {
  constructor(){
    super()
    this.state = { messages : DUMMY_DATA }
  }

  render() {
      return (
          <div className="message-list">

            <Message />
          </div>
      )
  }
}

export default MessageList;

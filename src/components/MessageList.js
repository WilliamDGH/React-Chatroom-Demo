import React, { Component } from 'react';

import Message from './Message'

class MessageList extends Component {

  render() {
      return (
          <div className="message-list">
            {this.props.messages.map((message, index) => {
              return (
                <Message key={index} message={message}/>
              )
            })}
          </div>
      )
  }
}

export default MessageList;

import React, { Component } from 'react'

class SendMessageForm extends Component {
    render() {
        return (
            <form className="send-message-form">
                <input
                    placeholder="SendMessageForm"
                    type="text" />
                <button type="submit">Send</button>
            </form>
        )
    }
}

export default SendMessageForm

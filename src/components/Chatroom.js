import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import { tokenUrl, instanceLocator } from './../config'

import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'

class Chatroom extends Component {
  constructor(){
    super();
    this.state = {
      messages : [],
      joinableRooms: [],
      joinedRooms: [],
      roomId : null
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId : "123",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
    })

  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
  }

  subscribeToRoom(roomId){
    this.setState({ messages : [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 20,
      hooks : {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        }
      }
    })
    .then(room => {
      this.setState({
        roomId : room.id
      })
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  render() {
      return (
          <div className="chatroom">
              <RoomList
              subscribeToRoom = { this.subscribeToRoom }
              rooms={[...this.state.joinedRooms, ...this.state.joinedRooms]}/>
              <MessageList messages={this.state.messages}/>
              <SendMessageForm sendMessage={ this.sendMessage }/>
              <NewRoomForm />
          </div>
      );
  }
}

export default Chatroom

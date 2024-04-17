const rooms = [
  {
    roomId: 1,
    roomName: "Room 1",
    avatar: "assets/imgs/people.png",
    unreadCount: 4,
    index: 3,
    lastMessage: {
      content: "Last message received",
      senderId: 1234,
      username: "John Doe",
      timestamp: "10:20",
      saved: true,
      distributed: false,
      seen: false,
      new: true,
    },
    users: [
      {
        _id: 1234,
        username: "John Doe",
        avatar: "assets/imgs/doe.png",
        status: {
          state: "online",
          lastChanged: "today, 14:30",
        },
      },
      {
        _id: 4321,
        username: "John Snow",
        avatar: "assets/imgs/snow.png",
        status: {
          state: "offline",
          lastChanged: "14 July, 20:00",
        },
      },
    ],
    typingUsers: [4321],
  },
]

const messages = [
  {
    _id: 7890,
    indexId: 12092,
    content: "Message 1",
    senderId: 1234,
    username: "John Doe",
    avatar: "assets/imgs/doe.png",
    date: "13 November",
    timestamp: "10:20",
    system: false,
    saved: true,
    distributed: true,
    seen: true,
    deleted: false,
    disableActions: false,
    disableReactions: false,
    files: [
      {
        name: "My File",
        size: 67351,
        type: "png",
        audio: true,
        duration: 14.4,
        url: "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
        preview:
          "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
      },
    ],
    reactions: {
      "😁": [
        1234, // USER_ID
        4321,
      ],
      "🥰": [1234],
    },
    replyMessage: {
      content: "Reply Message",
      senderId: 4321,
      files: [
        {
          name: "My Replied File",
          size: 67351,
          type: "png",
          audio: true,
          duration: 14.4,
          url: "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
          preview:
            "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
        },
      ],
    },
  },
]

export default {
  rooms,
  messages,
}
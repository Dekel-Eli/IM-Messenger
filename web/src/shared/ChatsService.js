
import { getProfile } from "./ProfileService";
import { getDisplayedDate, getCurrentDate } from "./Utils";

export const getALLChats = (chatIds) => {

  return this.chats;
}

export const getChat = (chatId) => {
  //console.log(`getChat: ${chats.filter(chat => chat.chatId === chatId)[0]}`);
  return (chats.filter(chat => chat.chatId === chatId))[0];
}
export const getChatParticipants = (chatId) => {
  //console.log(`getChat: ${chats.filter(chat => chat.chatId === chatId)[0]}`);
  return (chats.filter(chat => chat.chatId === chatId))[0].participants;
}

export const getChatByParticipants = (senderId, receiverId) => {
  return chats.filter(chat => chat.participants.includes(senderId) && chat.participants.includes(receiverId))[0];
}

export const addChat = (participants, messages, lastUpdateDate) => {
  let chatId = chats.length + 1;
  let chat = {
    chatId: chatId,
    participants: participants,
    messages: messages,
    lastUpdateDate: lastUpdateDate ? lastUpdateDate : getCurrentDate(),
  };
  chats.push(chat);
  return chat;
}
// add a new message to the chat
export const addMessageToChat = (chatId, message) => {
  let chat = getChat(chatId);
  chat.messages.push(message);
  chat.lastUpdateDate = message.date;
  chat.lastMessageContent = message.content.data;
}


export const getMessagesFromChat = (chatId) => {
  //console.log(`getMessagesFromChat:` + getChat(chatId).messages);
  return getChat(chatId).messages;
}

export const getLastMessageFromChat = (chatId) => {
  let messages = getMessagesFromChat(chatId);
  return messages.length ? messages[messages.length - 1] : getChat(chatId).lastUpdateDate;
}


export const getRecieverInfo = (chatId, senderId) => {
  let receiverId = getChat(chatId).participants.filter(participant => participant !== senderId)[0];
  let recieverProfile = getProfile(receiverId);
  let lastMessage = getLastMessageFromChat(chatId)?.content;
  let lastUpdateDate = getDisplayedDate(getChat(chatId).lastUpdateDate);

  return {
    name: recieverProfile.nickname,
    photo: recieverProfile.photo,
    lastMessage: lastMessage,
    lastUpdateDate: lastUpdateDate
  };
}

export const getActiveContactsByChats = (profileId, chatIds) => {

  // find participants of the chats
  let buddies = [];
  chatIds?.forEach(chat => {
    buddies.push(...getChatParticipants(chat).filter(p =>
      p !== profileId))
  });
  return buddies;
}

export const orderChatsByLastUpdate = (chatIds) => {
  let orderChatIds = [...chatIds];
  orderChatIds.sort((b, a) => {
    let aDate = new Date(getChat(a).lastUpdateDate);
    let bDate = new Date(getChat(b).lastUpdateDate);
    let diffDay = aDate?.getDate() - bDate?.getDate();
    let diffHour = aDate?.getTime() - bDate?.getTime();
    return diffDay || (!diffDay && diffHour) ||
      (!diffDay && !diffHour && aDate?.getMilliseconds() - bDate?.getMilliseconds());
  });

  return orderChatIds;

}

let chats = [
  {
    chatId: 0,
    lastUpdateDate: getCurrentDate(),
    participants: [],
    messages: [
    ]
  },

  {
    chatId: 1,
    lastUpdateDate: "06/04/2022 12:01",
    participants: [1, 2,],
    messages: [
      {
        messageId: 1,
        senderId: 2,
        receiverId: 1,
        date: "06/04/2022 12:00",
        content: {
          type: "text",
          data: "Hello"
        },
      },
      {
        messageId: 2,
        senderId: 1,
        receiverId: 2,
        date: "06/04/2022 12:01",
        content: {
          type: "text",
          data: "FOOOOOO"
        },
      },
      {
        messageId: 3,
        senderId: 1,
        receiverId: 2,
        date: "06/04/2022 12:02",
        content: {
          type: "text",
          data: "check it out"
        }
      },
      {
        messageId: 4,
        senderId: 1,
        receiverId: 2,
        date: "06/04/2022 12:03",
        content: {
          type: "image",
          data: "profile_pic/nyan_cat.png"
        }
      },
    ]
  },

  {
    chatId: 2,
    lastUpdateDate: "08/04/2022 13:00",
    participants: [1, 3,],
    messages: [
      {
        messageId: 1,
        senderId: 3,
        receiverId: 1,
        date: "08/04/2022 13:00",
        content: {
          type: "text",
          data: "Hi👌"
        },
      },
      {
        messageId: 2,
        senderId: 1,
        receiverId: 3,
        date: "09/04/2022 12:02",
        content: {
          type: "text",
          data: "check it out"
        }
      },
      {
        messageId: 3,
        senderId: 1,
        receiverId: 3,
        date: "09/04/2022 12:03",
        content: {
          type: "video",
          data: "Nyan_Cat_Short.mp4"
        }
      },

    ]
  },
  {
    chatId: 3,
    lastUpdateDate: "06/04/2022 12:01",
    participants: [1, 4,],
    messages: [
      {
        messageId: 1,
        senderId: 4,
        receiverId: 1,
        date: "06/04/2022 12:00",
        content: {
          type: "text",
          data: "Hello"
        },
      },
      {
        messageId: 2,
        senderId: 1,
        receiverId: 4,
        date: "06/04/2022 12:01",
        content: {
          type: "text",
          data: "HIIIii"
        },
      },
      {
        messageId: 3,
        senderId: 4,
        receiverId: 1,
        date: "06/04/2022 12:02",
        content: {
          type: "text",
          data: "LOL"
        }
      },
      {
        messageId: 4,
        senderId: 1,
        receiverId: 4,
        date: "06/04/2022 12:03",
        content: {
          type: "audio",
          data: <audio controls>
            <source src="LOL.mp3" type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        }
      },
    ]
  },

  {
    chatId: 4,
    lastUpdateDate: "08/04/2022 13:00",
    participants: [1, 5,],
    messages: [
      {
        messageId: 1,
        senderId: 1,
        receiverId: 5,
        date: "08/04/2022 13:00",
        content: {
          type: "text",
          data: "YO👌"
        },
      },
      {
        messageId: 2,
        senderId: 5,
        receiverId: 1,
        date: "09/04/2022 12:02",
        content: {
          type: "text",
          data: "look at this easy assignment 🤣🤣😂😂😂"
        }
      },
      {
        messageId: 3,
        senderId: 5,
        receiverId: 1,
        date: "09/04/2022 12:03",
        content: {
          type: "file",
          data: {
            url: "web client.pdf",
            name: "Web client"
          }
        }
      },
    ]
  },
  {
    chatId: 5,
    lastUpdateDate: "06/04/2022 12:01",
    participants: [1, 6,],
    messages: [
      {
        messageId: 1,
        senderId: 1,
        receiverId: 6,
        date: "06/04/2022 12:00",
        content: {
          type: "text",
          data: "Hello"
        },
      },
      {
        messageId: 2,
        senderId: 6,
        receiverId: 1,
        date: "06/04/2022 12:01",
        content: {
          type: "text",
          data: "keep my wife's name out of your mouth!!"
        },
      }
    ]
  },
]; 

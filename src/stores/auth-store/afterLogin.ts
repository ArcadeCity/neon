import {
  ApiChatroom,
  AuthedPlayerResult,
  normalizeApiChatroom,
} from 'services/api'
import { AuthStore } from 'stores/auth-store'
import { Chatroom } from 'stores/chat-store'

export const afterLogin = async (
  self: AuthStore,
  result: AuthedPlayerResult
) => {
  if (result.kind !== 'ok') return false

  // POPULATE STORE
  self.setApiToken(result.token)
  self.setAuthedPlayer(result.user)
  self.getLocation()

  // TODO: Need to undo this at logout?
  self.env.api.apisauce.setHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${result.token}`,
  })

  const chatrooms = result.chatrooms
  if (chatrooms) {
    chatrooms.forEach((apiChatroom: ApiChatroom) => {
      const chatroom: Chatroom = normalizeApiChatroom(apiChatroom)
      self.rootStore.chatStore.setChatroom(chatroom)
    })
  }

  return true
}

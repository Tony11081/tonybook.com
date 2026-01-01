import { proxy } from 'valtio'

import { type GuestbookDto } from '~/db/dto/guestbook.dto'

export const guestbookState = proxy<{
  messages: GuestbookDto[]
  replyingTo: GuestbookDto | null
}>({
  messages: [],
  replyingTo: null,
})

export function setMessages(messages: GuestbookDto[]) {
  guestbookState.messages = messages
}

export function signBook(message: GuestbookDto) {
  if (message.parentId) {
    guestbookState.messages.push(message)
  } else {
    guestbookState.messages.splice(0, 0, message)
  }
}

export function replyToMessage(message: GuestbookDto) {
  guestbookState.replyingTo = message
}

export function clearGuestbookReply() {
  guestbookState.replyingTo = null
}

export function updateGuestbookMessage(
  id: GuestbookDto['id'],
  updates: Partial<GuestbookDto>
) {
  const idx = guestbookState.messages.findIndex((msg) => msg.id === id)
  if (idx === -1) {
    return
  }
  guestbookState.messages[idx] = {
    ...guestbookState.messages[idx],
    ...updates,
  }
}

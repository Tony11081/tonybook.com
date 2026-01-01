import { proxy } from 'valtio'

import { type PostIDLessCommentDto } from '~/db/dto/comment.dto'

type PostID = string
export const blogPostState = proxy<{
  postId: PostID
  currentBlockId: string | null
  comments: PostIDLessCommentDto[]
  replyingTo: PostIDLessCommentDto | null
}>({
  postId: '',
  currentBlockId: null,
  comments: [],
  replyingTo: null,
})

export function resetPostState(postId: PostID) {
  blogPostState.postId = postId
  blogPostState.currentBlockId = null
  blogPostState.comments = []
  blogPostState.replyingTo = null
}

export function addComment(comment: PostIDLessCommentDto) {
  blogPostState.comments.push(comment)
}

export function updateComment(
  id: PostIDLessCommentDto['id'],
  updates: Partial<PostIDLessCommentDto>
) {
  const idx = blogPostState.comments.findIndex((comment) => comment.id === id)
  if (idx === -1) {
    return
  }
  blogPostState.comments[idx] = {
    ...blogPostState.comments[idx],
    ...updates,
  }
}

export function replyTo(comment: PostIDLessCommentDto) {
  blogPostState.replyingTo = comment
}

export function clearReply() {
  blogPostState.replyingTo = null
}

export function focusBlock(blockId: string | null) {
  blogPostState.currentBlockId = blockId
}

export function clearBlockFocus() {
  blogPostState.currentBlockId = null
}

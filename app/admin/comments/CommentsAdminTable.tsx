'use client'

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import Link from 'next/link'
import React from 'react'

import { Button } from '~/components/ui/Button'
import { type CommentDto } from '~/db/dto/comment.dto'
import { url } from '~/lib'

type CommentRow = CommentDto & {
  postTitle?: string
  postSlug?: string
}

export function CommentsAdminTable({
  initialComments,
}: {
  initialComments: CommentRow[]
}) {
  const [comments, setComments] = React.useState(initialComments)

  const toggleFeatured = async (id: string) => {
    const res = await fetch(`/api/comments/${id}/pin`, { method: 'POST' })
    if (!res.ok) {
      return
    }
    const data = (await res.json()) as { isFeatured: boolean }
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, isFeatured: data.isFeatured } : comment
      )
    )
  }

  return (
    <Card className="mt-6">
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>文章</TableHeaderCell>
            <TableHeaderCell>评论内容</TableHeaderCell>
            <TableHeaderCell>置顶</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>
                <Link href={url(`/blog/${comment.postSlug ?? ''}`).href}>
                  {comment.postTitle}
                </Link>
              </TableCell>
              <TableCell>
                <Text>{comment.body.text}</Text>
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-8 px-3 text-xs"
                  onClick={() => toggleFeatured(comment.id)}
                >
                  {comment.isFeatured ? '取消' : '置顶'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { TagIcon } from '~/assets'

export const Series = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  plannedCount: z.number().optional(),
  cover: z
    .object({
      _ref: z.string(),
      asset: z.any(),
    })
    .optional(),
})
export type Series = z.infer<typeof Series>

export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'plannedCount',
      title: 'Planned Count',
      description: 'Total posts planned for this series.',
      type: 'number',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})

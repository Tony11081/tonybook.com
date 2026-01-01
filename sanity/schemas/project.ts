import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { Layers3Icon } from '~/assets'

export const Project = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  url: z.string().url(),
  description: z.string(),
  icon: z.object({
    _ref: z.string(),
    asset: z.any(),
  }),
  role: z.string().optional(),
  stack: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
  strategy: z.array(z.string()).optional(),
  results: z.string().optional(),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  gallery: z
    .array(
      z.object({
        _ref: z.string().optional(),
        asset: z.any().optional(),
      })
    )
    .optional(),
})
export type Project = z.infer<typeof Project>

export default defineType({
  name: 'project',
  title: '项目',
  type: 'document',
  icon: Layers3Icon,
  fields: [
    defineField({
      name: 'name',
      title: '名字',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'url',
      title: '链接',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: '简介',
      type: 'text',
    }),
    defineField({
      name: 'role',
      title: '角色',
      type: 'string',
    }),
    defineField({
      name: 'stack',
      title: '技术栈',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'goals',
      title: '目标',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'strategy',
      title: '策略',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'results',
      title: '结果',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metrics',
      title: '关键指标',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'icon',
      title: '图片',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: '案例截图',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
  ],
})

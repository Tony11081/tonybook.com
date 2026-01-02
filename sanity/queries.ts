import { groq } from 'next-sanity'

import { client } from '~/sanity/lib/client'
import { type Post, type PostDetail } from '~/sanity/schemas/post'
import { type Project } from '~/sanity/schemas/project'
import { type Series } from '~/sanity/schemas/series'

export const getAllLatestBlogPostSlugsQuery = () =>
  groq`
  *[_type == "post" && !(_id in path("drafts.**"))
  && publishedAt <= now()
  && defined(slug.current)] | order(publishedAt desc).slug.current
  `

export const getAllLatestBlogPostSlugs = () => {
  return client.fetch<string[]>(getAllLatestBlogPostSlugsQuery())
}

type GetBlogPostsOptions = {
  limit?: number
  offset?: number
  forDisplay?: boolean
  search?: string
  category?: string
  reading?: 'short' | 'medium' | 'long'
}

const basePostFilter = () =>
  `_type == "post" && !(_id in path("drafts.**")) && publishedAt <= now() && defined(slug.current)`

const buildPostFilter = ({ search, category, reading }: GetBlogPostsOptions) => {
  const filters = [basePostFilter()]

  if (search) {
    filters.push(
      `(title match $search || description match $search || pt::text(body) match $search)`
    )
  }

  if (category) {
    filters.push(`count(categories[@->slug.current == $category]) > 0`)
  }

  if (reading === 'short') {
    filters.push('readingTime <= 5')
  }
  if (reading === 'medium') {
    filters.push('readingTime > 5 && readingTime <= 10')
  }
  if (reading === 'long') {
    filters.push('readingTime > 10')
  }

  return filters.join(' && ')
}

export const getLatestBlogPostsQuery = ({
  limit = 5,
  forDisplay = true,
}: GetBlogPostsOptions) =>
  groq`
  *[${basePostFilter()}] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->{ title, "slug": slug.current },
    "series": series->{ _id, title, "slug": slug.current, description },
    seriesOrder,
    description,
    metaDescription,
    keywords,
    publishedAt,
    readingTime,
    mainImage {
      _ref,
      asset->{
        url,
        ${
          forDisplay
            ? '"lqip": metadata.lqip, "dominant": metadata.palette.dominant,'
            : ''
        }
      }
    }
  }`
export const getLatestBlogPosts = (options: GetBlogPostsOptions) =>
  client.fetch<Post[] | null>(getLatestBlogPostsQuery(options))

export const getBlogPostsQuery = ({
  limit = 10,
  offset = 0,
  forDisplay = true,
  search,
  category,
  reading,
}: GetBlogPostsOptions) => {
  const filter = buildPostFilter({ search, category, reading })
  return groq`
    *[${filter}] | order(publishedAt desc)[${offset}...${offset + limit}] {
      _id,
      title,
      "slug": slug.current,
      "categories": categories[]->{ title, "slug": slug.current },
      "series": series->{ _id, title, "slug": slug.current, description },
      seriesOrder,
      description,
      metaDescription,
      keywords,
      publishedAt,
      readingTime,
      mainImage {
        _ref,
        asset->{
          url,
          ${
            forDisplay
              ? '"lqip": metadata.lqip, "dominant": metadata.palette.dominant,'
              : ''
          }
        }
      }
    }
  `
}

export const getBlogPostsCountQuery = ({ search, category, reading }: GetBlogPostsOptions) => {
  const filter = buildPostFilter({ search, category, reading })
  return groq`count(*[${filter}])`
}

export const getBlogPosts = async (options: GetBlogPostsOptions) => {
  const search = options.search?.trim()
  const params: { search?: string; category?: string } = {}
  if (search) {
    params.search = `*${search}*`
  }
  if (options.category) {
    params.category = options.category
  }

  const [posts, total] = await Promise.all([
    client.fetch<Post[] | null>(getBlogPostsQuery(options), params),
    client.fetch<number>(getBlogPostsCountQuery(options), params),
  ])

  return { posts: posts ?? [], total }
}

export const getBlogPostQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->{ title, "slug": slug.current },
    "series": series->{ _id, title, "slug": slug.current, description, level },
    seriesOrder,
    description,
    metaDescription,
    keywords,
    publishedAt,
    readingTime,
    mood,
    body[] {
      ...,
      _type == "image" => {
        "url": asset->url,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions,
        ...
      }
    },
    "headings": body[length(style) == 2 && string::startsWith(style, "h")],
    mainImage {
      _ref,
      asset->{
        url,
        "lqip": metadata.lqip
      }
    },
    "related": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..2] {
      _id,
      title,
      "slug": slug.current,
      "categories": categories[]->{ title, "slug": slug.current },
      publishedAt,
      readingTime,
      mainImage {
        _ref,
        asset->{
          url,
          "lqip": metadata.lqip,
          "dominant": metadata.palette.dominant
        }
      },
    },
    "previous": *[_type == "post" && publishedAt < ^.publishedAt && !(_id in path("drafts.**"))] | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      "categories": categories[]->{ title, "slug": slug.current },
      description,
      publishedAt,
      readingTime,
      mainImage {
        _ref,
        asset->{
          url,
          "lqip": metadata.lqip,
          "dominant": metadata.palette.dominant
        }
      }
    },
    "next": *[_type == "post" && publishedAt > ^.publishedAt && !(_id in path("drafts.**"))] | order(publishedAt asc)[0] {
      _id,
      title,
      "slug": slug.current,
      "categories": categories[]->{ title, "slug": slug.current },
      description,
      publishedAt,
      readingTime,
      mainImage {
        _ref,
        asset->{
          url,
          "lqip": metadata.lqip,
          "dominant": metadata.palette.dominant
        }
      }
    },
    "seriesPosts": *[
      _type == "post" && defined(^.series._ref)
      && series._ref == ^.series._ref
      && !(_id in path("drafts.**"))
    ] | order(seriesOrder asc, publishedAt asc) {
      _id,
      title,
      "slug": slug.current,
      seriesOrder,
      publishedAt,
      readingTime
    }
  }`
export const getBlogPost = (slug: string) =>
  client.fetch<PostDetail | undefined, { slug: string }>(getBlogPostQuery, {
    slug,
  })

export const getCategoriesQuery = () =>
  groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
  `

export const getCategories = () =>
  client.fetch<{ _id: string; title: string; slug?: string; description?: string }[]>(
    getCategoriesQuery()
  )

export const getSeriesListQuery = () =>
  groq`
  *[_type == "series"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    plannedCount,
    cover {
      _ref,
      asset->{
        url,
        "lqip": metadata.lqip
      }
    },
    "postCount": count(*[_type == "post" && !(_id in path("drafts.**")) && series._ref == ^._id])
  }
  `

export const getSeriesList = () =>
  client.fetch<
    (Series & {
      postCount: number
      cover?: { _ref?: string; asset?: { url?: string; lqip?: string } }
    })[]
  >(getSeriesListQuery())

export const getSeriesBySlugQuery = () =>
  groq`
  *[_type == "series" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    plannedCount,
    cover {
      _ref,
      asset->{
        url,
        "lqip": metadata.lqip
      }
    },
    "posts": *[_type == "post" && !(_id in path("drafts.**")) && series._ref == ^._id] | order(seriesOrder asc, publishedAt asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      readingTime,
      seriesOrder,
      "categories": categories[]->{ title, "slug": slug.current },
      mainImage {
        _ref,
        asset->{
          url,
          "lqip": metadata.lqip,
          "dominant": metadata.palette.dominant
        }
      }
    }
  }
  `

export const getSeriesBySlug = (slug: string) =>
  client.fetch<
    (Series & {
      posts: Post[]
      cover?: { _ref?: string; asset?: { url?: string; lqip?: string } }
    }) | null,
    { slug: string }
  >(getSeriesBySlugQuery(), { slug })

export const getSettingsQuery = () =>
  groq`
  *[_type == "settings"][0] {
    "projects": projects[]->{
      _id,
      name,
      "slug": slug.current,
      url,
      description,
      role,
      stack,
      goals,
      strategy,
      results,
      metrics,
      icon,
      gallery
    },
    "heroPhotos": heroPhotos[].asset->url,
    "resume": resume[]{
      company,
      title,
      start,
      end,
      "logo": logo.asset->url
    }
  }`
export const getSettings = () =>
  client.fetch<{
    projects: Project[] | null
    heroPhotos?: string[] | null
    resume?:
      | {
          company: string
          title: string
          logo: string
          start: string
          end?: string
        }[]
      | null
  }>(getSettingsQuery())

export const getHomeSettingsQuery = () =>
  groq`
  *[_type == "settings"][0] {
    "heroPhotos": heroPhotos[].asset->url,
    "resume": resume[]{
      company,
      title,
      start,
      end,
      "logo": logo.asset->url
    }
  }`
export const getHomeSettings = () =>
  client.fetch<{
    heroPhotos?: string[] | null
    resume?:
      | {
          company: string
          title: string
          logo: string
          start: string
          end?: string
        }[]
      | null
  }>(getHomeSettingsQuery())

export const getProjectBySlugQuery = () =>
  groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    url,
    description,
    role,
    stack,
    goals,
    strategy,
    results,
    metrics,
    icon,
    gallery
  }
  `

export const getProjectBySlug = (slug: string) =>
  client.fetch<Project | null, { slug: string }>(getProjectBySlugQuery(), {
    slug,
  })


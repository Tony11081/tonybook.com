import { type MetadataRoute } from 'next'

import { url } from '~/lib'
import { getAllLatestBlogPostSlugs, getSeriesList, getSettings } from '~/sanity/queries'

export default async function sitemap() {
  const staticMap = [
    {
      url: url('/').href,
      lastModified: new Date(),
    },
    {
      url: url('/blog').href,
      lastModified: new Date(),
    },
    {
      url: url('/series').href,
      lastModified: new Date(),
    },
    {
      url: url('/start-here').href,
      lastModified: new Date(),
    },
    {
      url: url('/projects').href,
      lastModified: new Date(),
    },
    {
      url: url('/case-studies').href,
      lastModified: new Date(),
    },
    {
      url: url('/playbooks').href,
      lastModified: new Date(),
    },
    {
      url: url('/glossary').href,
      lastModified: new Date(),
    },
    {
      url: url('/guestbook').href,
      lastModified: new Date(),
    },
    {
      url: url('/consultation').href,
      lastModified: new Date(),
    },
    {
      url: url('/about').href,
      lastModified: new Date(),
    },
    {
      url: url('/now').href,
      lastModified: new Date(),
    },
    {
      url: url('/uses').href,
      lastModified: new Date(),
    },
    {
      url: url('/roadmap').href,
      lastModified: new Date(),
    },
    {
      url: url('/updates').href,
      lastModified: new Date(),
    },
    {
      url: url('/colophon').href,
      lastModified: new Date(),
    },
    {
      url: url('/library').href,
      lastModified: new Date(),
    },
    {
      url: url('/work-with-me').href,
      lastModified: new Date(),
    },
    {
      url: url('/newsletters').href,
      lastModified: new Date(),
    },
    {
      url: url('/changelog').href,
      lastModified: new Date(),
    },
  ] satisfies MetadataRoute.Sitemap

  const slugs = await getAllLatestBlogPostSlugs()
  const seriesList = await getSeriesList()
  const settings = await getSettings()
  const projects = settings?.projects ?? []

  const dynamicMap = slugs.map((slug) => ({
    url: url(`/blog/${slug}`).href,
    lastModified: new Date(),
  })) satisfies MetadataRoute.Sitemap

  const seriesMap = seriesList.map((series) => ({
    url: url(`/series/${series.slug}`).href,
    lastModified: new Date(),
  })) satisfies MetadataRoute.Sitemap

  const caseStudyMap = projects
    .filter((project) => project.slug)
    .map((project) => ({
      url: url(`/case-studies/${project.slug}`).href,
      lastModified: new Date(),
    })) satisfies MetadataRoute.Sitemap

  return [...staticMap, ...dynamicMap, ...seriesMap, ...caseStudyMap]
}

export const runtime = 'edge'
export const revalidate = 60

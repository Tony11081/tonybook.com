import { ImageResponse } from 'next/og'

import { getBlogPost } from '~/sanity/queries'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export default async function BlogPostOgImage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  const title = post?.title ?? 'Tonybook Blog'
  const categories =
    post?.categories?.map((category) => category.title).join(' · ') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(16,185,129,0.18))',
          color: '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.2em' }}>
          TONYBOOK BLOG
        </div>
        <div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          {categories ? (
            <div style={{ fontSize: 24, marginTop: 20, color: '#334155' }}>
              {categories}
            </div>
          ) : null}
        </div>
        <div style={{ fontSize: 22, color: '#0f172a' }}>
          tonybook.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

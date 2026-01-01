import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react'
import { parseDateTime } from '@zolplay/utils'
import { sql } from 'drizzle-orm'

import { db } from '~/db'

export default async function AdminSearchInsightsPage() {
  const { rows } = await db.execute<{
    query: string
    searches: number
    zero_results: number
    last_seen: string
  }>(sql`SELECT 
    query,
    COUNT(*) as searches,
    SUM(CASE WHEN results = 0 THEN 1 ELSE 0 END) as zero_results,
    MAX(created_at) as last_seen
  FROM search_insights
  GROUP BY query
  ORDER BY zero_results DESC, searches DESC
  LIMIT 100`)

  return (
    <>
      <Title>站内搜索洞察</Title>

      <Card className="mt-6">
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>搜索词</TableHeaderCell>
              <TableHeaderCell>搜索次数</TableHeaderCell>
              <TableHeaderCell>零结果次数</TableHeaderCell>
              <TableHeaderCell>最近搜索</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.query}>
                <TableCell>{row.query}</TableCell>
                <TableCell>{row.searches}</TableCell>
                <TableCell>{row.zero_results}</TableCell>
                <TableCell>
                  {parseDateTime({ date: new Date(row.last_seen) })?.format(
                    'YYYY-MM-DD HH:mm'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

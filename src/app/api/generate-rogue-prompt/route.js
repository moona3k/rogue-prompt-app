import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  
  // TODO: Implement actual logic to generate rogue prompt
  const roguePrompt = `Generated rogue prompt for: ${query}`
  
  return NextResponse.json({ roguePrompt })
}
"use client";
import { Button } from '@/components/ui/button'
import { Agent } from '@/types/AgentType'
import { ChevronLeft, Code2, Play, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
  agentDetail: Agent | undefined
  previewHeader?: boolean,
  onPublish?:()=>void
}

function Header({ agentDetail, previewHeader = false,onPublish }: Props) {
  // Add a mounted state to prevent hydration mismatch for dynamic links
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='w-full p-3 flex justify-between items-center border-b'>
      <div className='flex gap-2 items-center'>
        <ChevronLeft className='h-8 w-8 cursor-pointer hover:bg-gray-100 rounded-full' />
        <h2 className='text-xl font-bold'>{agentDetail?.name}</h2>
      </div>

      <div className='flex gap-3 items-center'>
        <Button variant={'ghost'} className="flex gap-2">
          <Code2 className="h-4 w-4" /> Code 
        </Button>
        
        {/* Only render the Link logic once the component has mounted on the client 
            to ensure agentDetail?.agentId is stable and avoid undefined routes */}
        {mounted && (
          !previewHeader ? (
            <Link href={`/agent-builder/${agentDetail?.agentId}/preview`} suppressHydrationWarning>
              <Button className="flex gap-2">
                <Play className="h-4 w-4" />
                Preview
              </Button>
            </Link>
          ) : (
            <Link href={`/agent-builder/${agentDetail?.agentId}`} suppressHydrationWarning>
              <Button variant={'outline'} className="flex gap-2">
                <X />
                Close preview
              </Button>
            </Link>
          )
        )}
        
        <Button onClick={onPublish}> Publish</Button>
      </div>
    </div>
  )
}

export default Header
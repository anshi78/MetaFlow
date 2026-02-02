import { Button } from '@/components/ui/button'
import { Handle, Position } from '@xyflow/react'
import { ThumbsUp } from 'lucide-react'
import React from 'react'

// Destructure { data } correctly to access custom properties
function UserApprovalNode({ data }: any) {
  return (
    <div className='bg-white rounded-2xl p-3 border shadow-sm flex flex-col gap-3 min-w-[180px]'>
      {/* Header */}
      <div className='flex gap-2 items-center'>
        <div 
          className='p-2 rounded-lg' 
          style={{ backgroundColor: data?.bgColor || '#dab2e0' }}
        >
          <ThumbsUp className='h-4 w-4 text-gray-700' />
        </div>
        <h2 className='text-sm font-semibold'>User Approval</h2>
      </div>

      {/* Action Buttons & Handles */}
      <div className='flex flex-col gap-3'>
        {/* Approve Section */}
        <div className="relative flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" className="w-full text-[10px] h-7 pointer-events-none" disabled>
            Approve
          </Button>
          <Handle 
            type='source' 
            position={Position.Right} 
            id='approve' 
            className='w-3 h-3 bg-green-500 border-2 border-white translate-x-1' 
          />
        </div>

        {/* Reject Section */}
        <div className="relative flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" className="w-full text-[10px] h-7 pointer-events-none" disabled>
            Reject
          </Button>
          <Handle 
            type='source' 
            position={Position.Right} 
            id='reject' 
            className='w-3 h-3 bg-red-500 border-2 border-white translate-x-1' 
          />
        </div>
      </div>

      {/* Input Handle (Entry Point) */}
      <Handle 
        type='target' 
        position={Position.Left} 
        className='w-3 h-3 bg-purple-500 border-2 border-white' 
      />
    </div>
  )
}

export default UserApprovalNode
import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
import { Merge } from 'lucide-react'
import React from 'react'

function IfElseNode({ data }: any) {
  return (
    <div className='bg-white rounded-2xl p-3 border shadow-sm flex flex-col gap-3 min-w-[180px]'>
      {/* Header */}
      <div className='flex gap-2 items-center'>
        <div 
          className='p-2 rounded-lg' 
          style={{ backgroundColor: data?.bgColor || '#FFF3CD' }}
        >
          <Merge className='h-4 w-4 text-gray-700' />
        </div>
        <h2 className='text-sm font-semibold'>If/Else</h2>
      </div>

      {/* Input Fields */}
      <div className='flex flex-col gap-2'>
        <div className="relative">
          <Input placeholder='If Condition' className='text-[10px] h-8 bg-gray-50' disabled />
          {/* True Handle (Green) */}
          <Handle 
            type='source' 
            position={Position.Right} 
            id='if' 
            className='w-3 h-3 bg-green-500 border-2 border-white' 
            style={{ top: '50%' }} 
          />
        </div>

        <div className="relative">
          <Input placeholder='Else Condition' className='text-[10px] h-8 bg-gray-50' disabled />
          {/* False Handle (Red) */}
          <Handle 
            type='source' 
            position={Position.Right} 
            id='else' 
            className='w-3 h-3 bg-red-500 border-2 border-white' 
            style={{ top: '50%' }} 
          />
        </div>
      </div>

      {/* Target Handle (Input) */}
      <Handle 
        type='target' 
        position={Position.Left} 
        className='w-3 h-3 bg-yellow-500 border-2 border-white' 
      />
    </div>
  )
}

export default IfElseNode
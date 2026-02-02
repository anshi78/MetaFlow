import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
import { Repeat } from 'lucide-react'
import React from 'react'

function WhileNode({ data }: any) {
  return (
    <div className='bg-white rounded-2xl p-3 border shadow-sm flex flex-col gap-3 min-w-[180px]'>
      {/* Header */}
      <div className='flex gap-2 items-center'>
        <div 
          className='p-2 rounded-lg' 
          style={{ backgroundColor: data?.bgColor || '#E3F2FD' }}
        >
          <Repeat className='h-4 w-4 text-gray-700' />
        </div>
        <h2 className='text-sm font-semibold'>While Loop</h2>
      </div>

      {/* Logic Inputs */}
      <div className='flex flex-col gap-2'>
        <div className="relative">
          <Input placeholder='Loop Condition' className='text-[10px] h-8 bg-gray-50' disabled />
          {/* Loop Source (True path) */}
          <Handle 
            type='source' 
            position={Position.Right} 
            id='loop-body' 
            className='w-3 h-3 bg-blue-500 border-2 border-white' 
            style={{ top: '50%' }} 
          />
        </div>

        <div className="relative">
          <Input placeholder='On Exit' className='text-[10px] h-8 bg-gray-50' disabled />
          {/* Exit Source (False path) */}
          <Handle 
            type='source' 
            position={Position.Right} 
            id='exit' 
            className='w-3 h-3 bg-red-500 border-2 border-white' 
            style={{ top: '50%' }} 
          />
        </div>
      </div>

      {/* Main Input (Target) */}
      <Handle 
        type='target' 
        position={Position.Left} 
        className='w-3 h-3 bg-gray-400 border-2 border-white' 
      />
    </div>
  )
}

export default WhileNode
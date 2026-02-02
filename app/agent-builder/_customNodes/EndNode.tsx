import { Handle, Position } from '@xyflow/react'
import { Square } from 'lucide-react'
import React from 'react'

function EndNode({data}:any) {
  return (
    <div>
         <div className='bg-white rounded-2xl p-2 px-3 border' >
        <div className='flex gap-2 items-center'>
            <Square className='p-2 rounded-lg h-8 w-8 bg-blue-100'
            style={{ backgroundColor: data?.bgColor }}
             />
        <h2>
            End</h2>
            <Handle type='target' position={Position.Left} className='w-3 h-3 bg-blue-500 rounded-full'/>
              
        </div>
        </div>
    </div>
  )
}

export default EndNode
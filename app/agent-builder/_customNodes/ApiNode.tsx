import { Handle, Position } from '@xyflow/react'
import { Webhook } from 'lucide-react'
import React from 'react'

function ApiNode({data}: any) {
  return (
    <div className='bg-white rounded-2xl p-2 px-3 border shadow-sm min-w-[150px]'>
           <div className='flex gap-2 items-center relative'>
               <div className='p-2 rounded-lg' >
                  <Webhook className='p-2 rounded-lg h-8 w-8' 
                  style={{ backgroundColor: data?.bgColor }}
                  />
               </div>
               <div className='flex flex-col'>
               <h2>{data?.label}</h2>
               <p className='text-xs text-gray-500'>API</p>
               </div>
               <Handle type='target' position={Position.Left} className='w-2 h-2 bg-blue-500 border-none'/>
               <Handle type='source' position={Position.Right} className='w-2 h-2 bg-blue-500 border-none'/>
           </div>
       </div>
  )
}

export default ApiNode
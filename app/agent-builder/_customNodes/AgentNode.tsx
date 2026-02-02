import { Handle, Position } from '@xyflow/react'
import { MousePointer, SquareSquare, Merge, Repeat, ThumbsUpIcon, Webhook, Play } from 'lucide-react'
import React from 'react'

const IconMap: any = {
    agent: MousePointer,
    end: SquareSquare,
    ifElse: Merge,
    while: Repeat,
    approval: ThumbsUpIcon,
    api: Webhook,
    start: Play 
};

function AgentNode({ data }: any) {
 // Look up icon based on the iconName string passed from the tools panel
 const Icon = IconMap[data?.iconName || 'agent'];
 
 return (
    <div className='bg-white rounded-2xl p-2 px-3 border shadow-sm min-w-[150px]'>
        <div className='flex gap-2 items-center relative'>
            <div className='p-2 rounded-lg' style={{ backgroundColor: data?.bgColor || '#dbeafe' }}>
               {Icon && <Icon className='h-4 w-4 text-gray-700' />}
            </div>
           <div className='flex flex-col'>
               <h2>{data.label}</h2>
               <p className='text-xs text-gray-500'>Agent</p>
               </div>
         
            <Handle type='target' position={Position.Left} className='w-2 h-2 bg-blue-500 border-none'/>
            <Handle type='source' position={Position.Right} className='w-2 h-2 bg-blue-500 border-none'/>
        </div>
    </div>
  )
}

export default AgentNode;
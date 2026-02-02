"use client";
import { WorkflowContext } from '@/context/WorkflowContext';
import { Merge, MousePointer, Repeat, Square, SquareSquare, ThumbsUpIcon, Webhook } from 'lucide-react'
import React, { useContext } from 'react'

const AgentTools =[
    { name:'Agent', icon: MousePointer, bgColor:'#CDF7E3', id:'agent', type: 'AgentNode' },
    { name:'End', icon: Square, bgColor:'#f1ebc0ff', id:'end', type: 'EndNode' },
    { name:'If/Else', icon: Merge, bgColor:'#FFF3CD', id:'IfElseNode', type: 'IfElseNode' },
    { name:'While', icon: Repeat, bgColor:'#E3F2FD', id:'WhileNode', type: 'WhileNode' },
    { name:'User Approval', icon: ThumbsUpIcon, bgColor:'#dab2e0ff', id:'UserApprovalNode', type: 'UserApprovalNode' },
    { name:'API', icon: Webhook, bgColor:'#8fe3dfff', id:'api', type: 'ApiAgentNode' },
]

function AgentToolsPanel() {
    const { setAddedNodes } = useContext(WorkflowContext);

    // Inside onAgentToolClick function
const onAgentToolClick = (tool: any) => {
    const newNode = {
        id: `${tool.id}-${crypto.randomUUID()}`,
        position: { x: 100, y: 100 },
        data: { 
            label: tool.name, 
            // FIX: Save the string ID, NOT the icon component
            iconName: tool.id, 
            bgColor: tool.bgColor 
        },
        type: tool.type,
    }
    setAddedNodes((prev: any) => [...prev, newNode]);
}

    return (
        <div className='bg-white p-5 rounded-2xl border shadow-md'>
            <h2 className='font-semibold mb-4 text-gray-700'>AI Agent Tools</h2>
            <div className='flex flex-col gap-1'>
                {AgentTools.map((tool, index) => (
                    <div key={index} className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-xl transition-all' onClick={() => onAgentToolClick(tool)}>
                        <tool.icon className='p-2 rounded-lg h-8 w-8' style={{ backgroundColor: tool.bgColor }} />
                        <h2 className='text-sm font-medium text-gray-700'>{tool.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentToolsPanel;
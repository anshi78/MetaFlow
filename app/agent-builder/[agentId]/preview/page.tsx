'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../_components/Header'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Agent } from '@/types/AgentType'
import { ReactFlow } from '@xyflow/react'
import { nodeTypes } from '../page'
import '@xyflow/react/dist/style.css'
import axios from 'axios'
import { toast } from 'sonner'
import ChatUi from './_components/ChatUi'
import PublishCode from './_components/PublishCode'

function PreviewAgent() {
  const params = useParams()
  const agentId = params?.agentId as string
  const convex = useConvex()

  const [mounted, setMounted] = useState(false)
  const [agentDetail, setAgentDetail] = useState<Agent>()
  const [flowConfig, setFlowConfig] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // ✅ FIX: generate conversationId locally
  const [conversationId] = useState(() => crypto.randomUUID())
  const [openDialog,setOpenDialog]=useState(false);

  const updateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfig)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (agentId) GetAgentDetail()
  }, [agentId])

  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId,
    })
    setAgentDetail(result)
  }

  useEffect(() => {
    if (agentDetail) GenerateWorkflow()
  }, [agentDetail])

  const GenerateWorkflow = () => {
    const edgeMap = agentDetail?.edges?.reduce((acc: any, edge: any) => {
      if (!acc[edge.source]) acc[edge.source] = []
      acc[edge.source].push(edge)
      return acc
    }, {})

    const flow = agentDetail?.nodes?.map((node: any) => ({
      id: node.id,
      type: node.type,
      label: node.data?.label || node.type,
      settings: node.data?.settings || {},
      next: edgeMap[node.id] || null,
    }))

    const startNode = agentDetail?.nodes?.find((n: any) => n.type === 'StartNode')
    setFlowConfig({ startNode: startNode?.id || null, flow })
  }

  const GenerateAgentToolConfig = async () => {
    if (!agentDetail?._id || !flowConfig) return toast.error('Data not ready')
    setLoading(true)
    try {
      const result = await axios.post('/api/generate-agent-tool-config', {
        jsonConfig: flowConfig,
      })
      await updateAgentToolConfig({
        id: agentDetail._id as any,
        agentToolConfig: result.data,
      })
      toast.success('Agent rebooted successfully!')
      GetAgentDetail()
    } catch {
      toast.error('Reboot failed')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  const onPublish=()=>{
  setOpenDialog(true);
  }

 return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 1. Pass the correct onPublish function to open the dialog */}
      <Header 
        previewHeader 
        agentDetail={agentDetail} 
        onPublish={onPublish} 
      />

      <div className="flex-1 grid grid-cols-4 overflow-hidden">
        <div className="col-span-3 bg-gray-50 border-r">
          <ReactFlow
            nodes={agentDetail?.nodes || []}
            edges={agentDetail?.edges || []}
            fitView
            nodeTypes={nodeTypes}
            draggable={false}
          />
        </div>

        <div className="col-span-1">
          <ChatUi
            GenerateAgentToolConfig={GenerateAgentToolConfig}
            loading={loading}
            agentDetail={agentDetail}
            conversationId={conversationId}
          />
        </div>
      </div>

      {/* 2. Ensure agentToolConfig is passed to the dialog to display the code */}
      <PublishCode 
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog} 
        agentToolConfig={agentDetail?.agentToolConfig} 
      />
    </div>
  )
}

export default PreviewAgent

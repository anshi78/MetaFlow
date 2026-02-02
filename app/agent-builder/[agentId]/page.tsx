"use client";
import '@xyflow/react/dist/style.css';
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { 
  ReactFlow, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge,
  Background, 
  Controls, 
  MiniMap, 
  Panel,
  Connection,
  OnSelectionChangeParams,
  useOnSelectionChange
} from '@xyflow/react';
import Header from '../_components/Header'
import StartNode from '../_customNodes/StartNode';
import AgentNode from '../_customNodes/AgentNode';
import EndNode from '../_customNodes/EndNode';
import IfElseNode from '../_customNodes/IfElseNode';
import WhileNode from '../_customNodes/WhileNode';
import UserApprovalNode from '../_customNodes/UserApprovalNode';
import AgentToolsPanel from '../_components/AgentToolsPanel';
import SettingPanel from '../_components/SettingPanel';
import { WorkflowContext } from '@/context/WorkflowContext';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { CloudCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserApprovalNode: UserApprovalNode,
};

function AgentBuilder() {
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { agentId } = useParams();
  
  const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges, setSelectedNode } = useContext(WorkflowContext);
  
  const convex = useConvex();
  const updateAgentDetail = useMutation(api.agent.UpdateAgentDetail);
  const [agentDetail, setAgentDetail] = useState<any>(null);

  // --- ALL HOOKS MUST BE HERE (ABOVE ANY RETURNS) ---

  // 1. Consolidated Node Selection Handler
  const onNodeSelect = useCallback(({ nodes }: OnSelectionChangeParams) => {
    if (nodes && nodes.length > 0) {
      setSelectedNode(nodes[0]);
    } else {
      setSelectedNode(null);
    }
  }, [setSelectedNode]);

  // 2. React Flow Selection Hook
  useOnSelectionChange({
    onChange: onNodeSelect
  });

  // 3. Flow Callbacks
  const onNodesChange = useCallback(
    (changes: any) => setAddedNodes((nds: any) => applyNodeChanges(changes, nds || [])),
    [setAddedNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setNodeEdges((eds: any) => applyEdgeChanges(changes, eds || [])),
    [setNodeEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => setNodeEdges((eds: any) => addEdge(params, eds || [])),
    [setNodeEdges]
  );

  // 4. Hydration fix
  useEffect(() => { setMounted(true); }, []);

  // 5. Initial Data Fetching
  useEffect(() => {
    if (agentId) {
      const getDetail = async () => {
        const result = await convex.query(api.agent.GetAgentById, {
          agentId: agentId as string
        });
        setAgentDetail(result);
        
        if (result?.nodes && result.nodes.length > 0) {
          setAddedNodes(result.nodes);
          setNodeEdges(result.edges || []);
        } else {
          setAddedNodes([{
            id: 'start-node',
            type: 'StartNode',
            position: { x: 250, y: 100 },
            data: { label: 'Start', iconName: 'start' },
          }]);
        }
      };
      getDetail();
    }
  }, [agentId, convex, setAddedNodes, setNodeEdges]);

  // 6. Auto-Save Logic
  useEffect(() => {
    const dbId = agentDetail?._id; 
    if (!addedNodes || addedNodes.length === 0 || !dbId) return;

    const delayDebounceFn = setTimeout(async () => {
      setIsSaving(true);
      try {
        await updateAgentDetail({
          id: dbId,
          nodes: addedNodes,
          edges: nodeEdges,
        });
        toast.success("Changes saved");
      } catch (error) {
        console.error("Auto-save failed", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [addedNodes, nodeEdges, agentDetail?._id, updateAgentDetail]);

  // --- CONDITIONAL RETURN IS NOW AT THE BOTTOM OF THE HOOKS LIST ---
  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header agentDetail={agentDetail} />
      
      <div className="flex-grow relative">
        <ReactFlow
          nodes={addedNodes || []}
          edges={nodeEdges || []}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // Note: useOnSelectionChange is already handling selection, 
          // but keeping this doesn't hurt.
          onSelectionChange={onNodeSelect} 
          fitView
          nodeTypes={nodeTypes}
        >{/*@ts-ignore*/}
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap />
          
          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>

          <Panel position="top-right" className="m-4">
            <SettingPanel />
          </Panel>
          
          <Panel position='bottom-right' className="flex items-center gap-2 bg-white p-2 px-4 rounded-full border shadow-sm mb-4 mr-4">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <span className="text-xs text-gray-500 font-medium">Saving...</span>
              </>
            ) : (
              <>
                <CloudCheck className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-500 font-medium">Changes Saved</span>
              </>
            )}
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}

export default AgentBuilder;
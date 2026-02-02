"use client"
import { api } from '@/convex/_generated/api';
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { userDetailContext } from '@/context/UserDetailContext';
import { WorkflowContext } from '@/context/WorkflowContext';
import { ReactFlowProvider } from '@xyflow/react';

function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [addedNodes, setAddedNodes] = useState([{
    id: 'start',
    type: 'StartNode',
    position: { x: 0, y: 0 },
    data: { label: 'Start' },
  }]);

  const [nodeEdges, setNodeEdges] = useState([]);
  useEffect(() => {
    if (user) {
      CreateAndGetUser();
    }
  }, [user]);

  const CreateAndGetUser = async () => {
    if (user) {
      const result = await createUser({
        name: user.fullName ?? '',
        email: user.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user.imageUrl ?? '' // Pass the image URL here
      });
      console.log("User synced:", result);
      setUserDetail(result);
    }
  }

  return (
 <userDetailContext.Provider value={{ userDetail, setUserDetail }}>
  <ReactFlowProvider>
  <WorkflowContext.Provider value={{ addedNodes, setAddedNodes, nodeEdges, setNodeEdges, selectedNode, setSelectedNode }}>
  <div>{children}</div>
  </WorkflowContext.Provider>
  </ReactFlowProvider>
  </userDetailContext.Provider>
  )
}

export default AppProvider;
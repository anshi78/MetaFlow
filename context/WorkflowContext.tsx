"use client";
import React, { createContext, useState, ReactNode } from "react";

export const WorkflowContext = createContext<any>(null);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [addedNodes, setAddedNodes] = useState<any[]>([]);
  const [nodeEdges, setNodeEdges] = useState<any[]>([]);

  return (
    <WorkflowContext.Provider value={{ 
      addedNodes, 
      setAddedNodes, 
      nodeEdges, 
      setNodeEdges 
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};
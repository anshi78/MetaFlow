"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CodeBlock } from "@/components/ui/code-block"; 

type Props = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  agentToolConfig?: any; 
}

function PublishCode({ openDialog, setOpenDialog, agentToolConfig }: Props) {
  const configString = agentToolConfig 
    ? JSON.stringify(agentToolConfig, null, 2) 
    : "// No configuration generated yet. Please reboot the agent.";

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {/* Increased max-width to 4xl for a wider block */}
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] bg-white p-0 overflow-hidden">
        <div className="p-8 pb-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Get Code</DialogTitle>
            <DialogDescription className="text-zinc-500 text-base">
              You can use this configuration to integrate your agent into your custom applications.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        {/* Adjusted padding to make the block fill the width more effectively */}
        <div className="px-8 pb-8 flex-1 overflow-hidden">
          <div className="w-full">
            <CodeBlock 
              code={configString} 
              filename="agent-config.json" 
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PublishCode;
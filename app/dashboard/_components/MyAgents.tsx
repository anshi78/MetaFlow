"use client";
import { userDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { Agent } from '@/types/AgentType';
import { useConvex } from 'convex/react';
import { GitBranchPlus, Loader2 } from 'lucide-react'; // 1. Removed Link from here
import NextLink from 'next/link'; // 2. Imported Next.js Link
import React, { useContext, useEffect, useState, useCallback } from 'react';
import moment from 'moment';

function MyAgents() {
  const { userDetail } = useContext(userDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();

  const fetchAgents = useCallback(async () => {
    if (!userDetail?._id) return;

    setLoading(true);
    try {
      const result = await convex.query(api.agent.GetUserAgents, {
        userId: userDetail._id
      });
      setAgentList(result);
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  }, [userDetail?._id, convex]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]); 

  if (loading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className='w-full mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {agentList.map((agent) => (
          // 3. Added key to the outermost element in the map
          <div key={agent._id}> 
            {/* 4. Corrected dynamic href syntax and component usage */}
            <NextLink 
              href={`/agent-builder/${agent.agentId}`} 
              className='p-5 border rounded-2xl shadow mt-5 flex flex-col gap-2 hover:shadow-lg transition-all cursor-pointer block'
            >
              <GitBranchPlus className="bg-blue-100 p-2 h-10 w-10 rounded-lg text-blue-600" />
              <h2 className='font-bold text-lg'>{agent.name}</h2>
              <h2 className='text-sm text-gray-400'>
                {moment(agent._creationTime).fromNow()}
              </h2>
            </NextLink>
          </div>
        ))} 
      </div>
    </div>
  );
}

export default MyAgents;
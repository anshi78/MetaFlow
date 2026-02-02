import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import MyAgents from './MyAgents'

function AiAgentTab() {
  return (
    <div className='px-10 md:px-24 lg:px-2 mt-14'>
    <Tabs defaultValue="account" className='w-full'>
        <TabsList>
<TabsTrigger value="myagent">My Agents</TabsTrigger>
<TabsTrigger value="template">Templates</TabsTrigger>
        </TabsList>
<TabsContent value="myagent"><MyAgents /></TabsContent>
<TabsContent value="template">Templates</TabsContent>
    </Tabs>
    </div>
  )
}

export default AiAgentTab
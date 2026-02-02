import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

import { FileJson } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function AgentSetting({selectedNode,updateFormData}:any) {

const [formData,setFormData]=useState({
name:'',
instruction:'',
includeHistory:true,
model:'gemini-flash-1.5',
outputFormat:'Text',
schema:''
})

useEffect(()=>{
  selectedNode && setFormData(selectedNode?.data?.settings);
},[selectedNode])

const handleChange=(key:string,value:any)=>{
setFormData((prev)=>({
...prev,
[key]:value
}))

}

const onSave=()=>{
console.log(formData);
updateFormData(formData);
toast.success('Agent Settings Updated!');
}
  return (
    <div>
      <h2 className="font-bold">
        Agent
      </h2>
      <p className="text-gray-500 mt-1">Call the AI model with your instructions</p>

      <div>
        <Label className="mt-3 space-y-1">Name</Label>
        <Input placeholder="Agent Name" 
        value={formData?.name}
        onChange={(event)=>handleChange('name',event.target.value)} />
      </div>

       <div>
        <Label className="mt-3 space-y-1">Instruction</Label>
        <Textarea placeholder="Instruction" 
          value={formData?.instruction}
        onChange={(event)=>handleChange('instrction',event.target.value)}   />
        <h2 className="text-sm p-1 flex gap-2 items-center">Add Context <FileJson className="h-3 w-3"></FileJson></h2>
      </div>

        <div className='mt-3 space-y-1 flex justify-between items-center'>
        <Label className="mt-3 space-y-1">Include Chat History</Label>
        <Switch checked={formData?.includeHistory} 
        onCheckedChange={(checked)=>handleChange('includeHistory',checked)} />
      </div>
      <div className='mt-3 space-y-1 flex justify-between items-center' >
        <Label>Model</Label>
     <Select 
     value={formData?.model}
     onValueChange={(value)=>handleChange('model',value)}>
          <SelectTrigger >
            <SelectValue placeholder="gemini flash 1.5" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini-flash-1.5">Gemini Flash 1.5</SelectItem>
             <SelectItem value="gemini-pro-1.5">Gemini Pro 1.5</SelectItem>
              <SelectItem value="gemini-pro-2.0">Gemini Pro 2.0</SelectItem>
          </SelectContent>
       </Select>
      </div>
      <div className='mt-3 space-y-2'>
        <Label>Output Format</Label>
     <Tabs defaultValue="Text" className="w-[400px]"
     value={formData?.outputFormat}
     onValueChange={(value)=>handleChange('output',value)}>
      <TabsList>
        <TabsTrigger value="Text">Text</TabsTrigger>
          <TabsTrigger value="Json">Json</TabsTrigger>
           </TabsList>
           <TabsContent value="Text">
            <h2 className='text-sm text-gray-500'>Output will be Text </h2></TabsContent>
          <TabsContent value="Json">
            <Label className='text-sm text-gray-500'> Enter Json Scehma</Label> 
            <Textarea placeholder='{title:string}' 
            value={formData?.schema}
            className='max-w-[300px] mt-1'
            onChange={(event)=>handleChange('schema',event.target.value)} />
              </TabsContent>
               </Tabs>
      </div>
      <Button className="mt-5 w-full" onClick={onSave}>Save</Button>
    </div>
  )
}

export default AgentSetting
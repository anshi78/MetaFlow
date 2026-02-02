import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
function EndSettings({selectedNode,updateFormDats}:any) {
    const [formData,setFormData]=useState({scehma: ''})
    useEffect(()=>{
        selectedNode && setFormData(selectedNode?.data?.settings);
      },[selectedNode])

  return (
    <div>
         <h2 className="font-bold">End</h2>
      <p className="text-gray-500 mt-1">Choose the workflow outpt</p>
      <div className='mt-2 space-y-2'>
        <label>Output</label>
        <Textarea placeholder='{name:string}' 
        value={formData?.scehma}
        onChange={(e)=>setFormData({scehma:e.target.value})}
        />
      </div>
      <Button className='w-full mt-5' onClick={() => { updateFormDats(formData); toast.success('Updated!') }}>Save</Button>
    </div>
  )
}

export default EndSettings
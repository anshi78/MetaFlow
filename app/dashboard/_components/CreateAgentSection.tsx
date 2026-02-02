"use client";
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react' // Added Loader for better UX
import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/dist/client/components/navigation';
import { userDetailContext } from '@/context/UserDetailContext';

function CreateAgentSection() {
    const [openDialog, setOpenDialog] = useState(false);
    const [agentName, setAgentName] = useState<string>(''); // Fix: Use lowercase 'string'
    const [loading, setLoading] = useState(false);
    const router=useRouter();
    const [loader,setLoader]=useState(false);
    const {userDetail,setUserDetail}=useContext(userDetailContext);

    const createAgentMutation = useMutation(api.agent.CreateAgent);

    const CreateAgent=async ()=>{
        setLoader(true);
        const agentId = uuidv4();
        
        const result=await createAgentMutation({
             agentId:agentId,
            name:agentName ?? '',
           userId:userDetail?._id
        });
        console.log(result);
        setOpenDialog(false);
        setLoader(false);
        router.push('/agent-builder/'+agentId);
    }

    return (
        <div className='space-y-2 flex flex-col justify-center items-center mt-24'>
            <h2 className='font-bold text-xl'>Create AI Agent</h2>
            <p className='text-lg'>Build an AI Agent workflow with custom logic and tools</p>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button size={'lg'}><Plus />Create</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Agent Name</DialogTitle>
                        <DialogDescription className="pt-4">
                            <Input 
                                placeholder='Agent Name' 
                                value={agentName}
                                onChange={(event) => setAgentName(event.target.value)} 
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'ghost'}>Cancel</Button>
                        </DialogClose>
                        <Button 
                        onClick={() => CreateAgent()}disabled={loader} 
                        >
                            {loader && <Loader2 className="animate-spin mr-2" />}
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateAgentSection;
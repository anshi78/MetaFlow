import { Id } from "@/convex/_generated/dataModel"

export type Agent={
    _id:Id<"AgentTable">,
    agentId:string,
    name:string,
    published:boolean,
    config?:any,
    userId:Id<"UserTable">,
    nodes?:any,
    edges?:any,
    _creationTime:number,
    agentToolConfig?:any,
}
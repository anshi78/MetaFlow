import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    UserTable: defineTable({
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        subscription: v.string(),
        token: v.number()
    }),

    AgentTable: defineTable({
        agentId: v.string(),
        name: v.string(),
        // Add the instruction field here
        instruction: v.optional(v.string()), 
        config: v.optional(v.any()),
        nodes: v.optional(v.any()),
        edges: v.optional(v.any()),
        published: v.boolean(),
        userId: v.id("UserTable"),
        agentToolConfig: v.optional(v.any()),
    }).index("by_user", ["userId"]),

    ConversationTable: defineTable({
        conversationId: v.string(),
        agentId: v.id('AgentTable'),
        userId: v.id('UserTable'),
    })
});
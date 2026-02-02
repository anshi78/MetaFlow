import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const GetConversationById = query({
  args: {
    agentId: v.id("AgentTable"),
    userId: v.id("UserTable")
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('ConversationTable')
      .filter(q => 
        q.and(
          q.eq(q.field('agentId'), args.agentId),
          q.eq(q.field('userId'), args.userId)
        )
      )
      .collect();

    return result[0];
  }
});

// Added CreateConversation Mutation
export const CreateConversation = mutation({
  args: {
    agentId: v.id("AgentTable"),
    userId: v.id("UserTable")
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ConversationTable", {
        agentId: args.agentId,
        userId: args.userId,
        conversationId: ""
    });
  }
});
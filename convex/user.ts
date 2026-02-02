import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(), // Add this arg
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const user = await ctx.db
      .query('UserTable')
      .filter((q) => q.eq(q.field('email'), args.email))
      .first(); 

    if (!user) {
      const userData = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
        token: 5000,
        subscription: "free" // Add default value required by your schema
      };
      
      const result = await ctx.db.insert('UserTable', userData);
      return userData;
    }

    return user;
  },
});
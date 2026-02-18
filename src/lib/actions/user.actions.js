"use server";

import User from "../models/user.model";
import { connectToDatabase } from "../mongodb/mongoose";
import { revalidatePath } from "next/cache";

/**
 * Fetches user from DB by Clerk ID
 */

export async function getUserById(userId) {
  try {
    if (!userId) return null;
    await connectToDatabase();
    
    // Explicitly cast to String to prevent type mismatch
    const user = await User.findOne({ clerkId: String(userId) });
    
    if (!user) {
      console.log("⚠️ getUserById: No user found for ID:", userId);
      return null;
    }
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

/**
 * Updates progress and XP when a level is completed
 */
export async function completeSublevel(clerkId, finishedId) {
  try {
    if (!clerkId) throw new Error("clerkId is required");
    
    await connectToDatabase();
    
    const [unit, level] = finishedId.split("-").map(Number);
    let nextUnit = unit;
    let nextLevel = level + 1;

    // Logic: If they finish level 5, go to next unit level 1
    if (level >= 5) {
      nextUnit = unit + 1;
      nextLevel = 1;
    }

    const nextProgressId = `${nextUnit}-${nextLevel}`;

    console.log(`Attempting to update progress for ${clerkId} to ${nextProgressId}`);

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: String(clerkId) }, // Force string
      { 
        $set: { 
          currentProgress: nextProgressId,
          lastLevelCompletedAt: new Date() 
        }, 
        $inc: { xp: 20 } 
      },
      { new: true, runValidators: false } 
    );

    if (!updatedUser) {
      console.error("❌ DB ERROR: User not found in database for ID:", clerkId);
      throw new Error(`User with clerkId ${clerkId} does not exist in MongoDB.`);
    }

    console.log("✅ DB SUCCESS: Progress updated to", nextProgressId);

    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("❌ CRITICAL ERROR in completeSublevel:", error.message);
    throw error; // Throwing so the UI can catch it in the try/catch block
  }
}

/**
 * Creates a new user in the database
 */
export async function createUser(userData) {
  try {
    await connectToDatabase();
    const newUser = await User.create({
      clerkId: String(userData.clerkId),
      email: userData.email,
      username: userData.username,
      photo: userData.photo,
      xp: 0,
      currentProgress: "1-1-1",
      role: 'free' // Ensure default role is set
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Updates paid status
 */
export async function updateUserPaidStatus(clerkId) {
  try {
    await connectToDatabase();
    
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: String(clerkId) },
      { role: 'premium' }, // Changed to match your 'role' logic in LessonPage
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log("Error updating paid status:", error);
    return null;
  }
}
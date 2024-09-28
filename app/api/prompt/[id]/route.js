import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
// Get Request to get one speacific id(prompt)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed To fetch prompts", {
      status: 500,
    });
  }
};

// Path Request to get one speacific id and update(prompt)
export const PATCH = async (request, { params }) => { 
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id); // Make sure to use your model here
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt; // Use the input prompt variable here
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};


// Path Request to get one speacific id and delete(prompt)

export const DELETE = async (request, { params }) => {
  try {
      await connectToDB();

      // Find the prompt by ID and remove it
      await Prompt.findByIdAndRemove(params.id);

      return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("Error deleting prompt", { status: 500 });
  }
};  


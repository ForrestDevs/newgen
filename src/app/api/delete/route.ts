import Mux from "@mux/mux-node";
import { NextRequest } from "next/server";
import { env } from "process";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { assetIds } = body;

    if (!assetIds || !Array.isArray(assetIds)) {
      return new Response(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
      });
    }

    const { video } = new Mux({
      tokenId: env.MUX_TOKEN_ID,
      tokenSecret: env.MUX_TOKEN_SECRET,
    });

    const deletePromises = assetIds.map((assetId) =>
      video.assets.delete(assetId)
    );

    await Promise.all(deletePromises);

    return new Response(
      JSON.stringify({ message: "Videos deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error deleting videos:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting videos",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};

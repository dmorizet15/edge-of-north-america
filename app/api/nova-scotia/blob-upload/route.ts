import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Issues short-lived client-upload tokens so phone photos go straight to Vercel
 * Blob (no 4.5 MB serverless body limit). This route is behind the passcode gate
 * (middleware covers /api/nova-scotia/*), so only unlocked clients can get a
 * token. Metadata is written separately by the client via /api/nova-scotia/photos
 * once the blob URL is known.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
        addRandomSuffix: true,
        maximumSizeInBytes: 25 * 1024 * 1024,
      }),
      // Metadata is stored client-side after upload; nothing to do here.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "upload failed" },
      { status: 400 }
    );
  }
}

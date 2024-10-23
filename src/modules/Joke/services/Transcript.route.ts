/**
 * @route `/api/jokes`
 * @dir `app/api/jokes/route.ts`
 */

import TranscriptController from "@/modules/Joke/services/Transcript.controller";

export const GET = TranscriptController.index;
export const POST = TranscriptController.insert;

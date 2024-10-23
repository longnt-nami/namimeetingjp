/**
 * @route `/api/jokes`
 * @dir `app/api/jokes/route.ts`
 */

import MeetingController from "@/modules/Joke/services/meeting/Meeting.controller";
import withVerifyAppKey from "@/packages/server/middlewares/withVerifyAppKey";

export const GET = MeetingController.index;
export const POST = MeetingController.insert;

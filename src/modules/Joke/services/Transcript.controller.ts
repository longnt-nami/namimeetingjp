import TranscriptModel from "@/modules/Joke/services/Transcript.model";
import Controller from "@/packages/server/base/Controller";

class CTranscript extends Controller {
  /**
   * Use arrow function to create Controller method.
   * @see https://www.geeksforgeeks.org/arrow-functions-in-javascript/
   * @param req Request
   */
  public index = async (req: Request) => {
    try {
      var url = req.headers.get("referer") || "";
      console.log(url);
      const paramString = url.split("?")[1];
      const params = paramString?.split("&");
      const meetingIdParam = params[0];
      const meetingId = meetingIdParam?.split("=")?.[1];
      if (!meetingId) {
        return this.sendJSON({
          code: 400,
          message: "Missing meetingId",
        });
      }
      const payload = await TranscriptModel.allWithParams({
        meetingId: meetingId,
      });
      return this.sendJSON({
        code: 200,
        message: "Success get all transcripts.",
        payload,
      });
    } catch (err) {
      return this.handleError(err);
    }
  };

  public insert = async (req: Request) => {
    try {
      const body = await req.json();
      const {
        words,
        conf_avg,
        end,
        index,
        start,
        transcript,
        transcript_norm,
        meetingId,
      } = body;
      const errors: string[] = [];
      if (!meetingId) return this.setError(400, errors, "Missing Id");
      if (errors.length) return this.setError(400, errors, "Validation error.");
      const payload = await TranscriptModel.insert({
        words,
        conf_avg,
        end,
        index,
        start,
        transcript,
        transcript_norm,
        meetingId,
      });
      return this.sendJSON({
        code: 201,
        message: "Success add new Transcript.",
        payload,
      });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const TranscriptController = new CTranscript();

export default TranscriptController;

import JokeModel from "@/modules/Joke/services/Transcript.model";
import MeetingModel from "@/modules/Joke/services/meeting/Meeting.model";
import Controller from "@/packages/server/base/Controller";

class CMeeting extends Controller {
  /**
   * Use arrow function to create Controller method.
   * @see https://www.geeksforgeeks.org/arrow-functions-in-javascript/
   * @param req Request
   */
  public index = async () => {
    try {
      const payload = await MeetingModel.all();
      return this.sendJSON({
        code: 200,
        message: "Success get all meetings.",
        payload,
      });
    } catch (err) {
      return this.handleError(err);
    }
  };

  public insert = async (req: Request) => {
    try {
      const body = await req.json();
      const { name, createdAt } = body;
      const errors: string[] = [];
      if (!name) errors.push('field "name" is required.');
      if (errors.length) return this.setError(400, errors, "Validation error.");
      const payload = await MeetingModel.insert({ name, createdAt });
      return this.sendJSON({
        code: 201,
        message: "Success add new Meeting.",
        payload,
      });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const MeetingController = new CMeeting();

export default MeetingController;

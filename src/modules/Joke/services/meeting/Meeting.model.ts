import Model from "@/packages/server/base/Model";

export interface MeetingFields<T = string | number> {
  readonly _id?: T;
  name?: string;
  createdAt: Date;
}

class MMeeting extends Model<MeetingFields> {
  protected collectionName = "meeting";
  public async all(): Promise<MeetingFields<string | number>[]> {
    const collection = await this.connect();
    const data = await collection.find().sort({ createdAt: -1 }).toArray();
    console.log(data);
    return this.withFields(data);
  }
}

const MeetingModel = new MMeeting();

export default MeetingModel;

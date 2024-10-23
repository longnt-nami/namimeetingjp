import Model from "@/packages/server/base/Model";

export interface TranscriptField<T = string | number> {
  readonly _id?: T;
  words: any[];
  // transcript
  conf_avg: number;
  end: number;
  index: number;
  start: number;
  transcript: string;
  transcript_norm: string;
  meetingId: string;
}

class MTranscript extends Model<TranscriptField> {
  protected collectionName = "transcript";
}

const TranscriptModel = new MTranscript();

export default TranscriptModel;

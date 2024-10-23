import dayjs from "dayjs";

export const ListRecords = ({ data }: { data: any }) => {
  return (
    <div>
      {data?.map((item: any, index: number) => (
        <div key={index} className="px-6 py-3">
          <div className="flex items-center gap-2 ">
            <p className="text-[#1C85FF] text-sm font-semibold"></p>
            <p className="text-xs text-gray-400">
              {dayjs(data?.date).format("HH:mm:ss DD/MM/YYYY")}
            </p>
          </div>
          <p
            className="mt-1"
            style={{
              wordWrap: "break-word",
            }}
          >
            {item?.transcript_norm}
          </p>
        </div>
      ))}
    </div>
  );
};

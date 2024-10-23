"use client";

import { ListRecords } from "@/modules/Home/components/ListRecords";
import { Header } from "@/packages/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const MeetingDetail = () => {
  const id = useParams();
  const [data, setData] = useState<any[]>([]);

  const fetchDetail = async () => {
    try {
      const resp = await fetch("/api/transcript" + "?meetingId=" + id);
      const json = await resp.json();
      console.log(json);

      if (json.code === 200) {
        setData(json?.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="px-3 ">
        <div
          className="mt-4 h-full rounded-md"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1",
          }}
        >
          <div
            style={{
              height: "calc(100vh - 200px)",
            }}
            className="overflow-y-auto overflow-x-hidden h-full"
          >
            <ListRecords data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

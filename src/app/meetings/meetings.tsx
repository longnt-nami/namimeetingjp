"use client";

import { Header } from "@/packages/components/Header";
import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Meetings = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/meeting", {
        method: "GET",
      });

      const json = await res.json();

      if (json?.payload) {
        setData(json?.payload);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const columns: ColumnsType<AnyObject> = [
    {
      title: "Name",
      render(value, record, index) {
        return (
          <Link href={"/meeting?meetingId=" + record?._id}>{record?.name}</Link>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-3 ">
        <div
          className="mt-4 h-full rounded-md p-5"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1",
          }}
        >
          <p className="font-bold text-xl mb-3">Meetings</p>
          <Table
            columns={columns}
            loading={loading}
            dataSource={data}
            rowKey={"_id"}
          />
        </div>
      </div>
    </>
  );
};

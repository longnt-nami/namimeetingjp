"use client";
import Image from "next/image";
import { Empty, NoContent } from "@/modules/Home/components/Empty";
import useRecorder from "@/modules/Home/hooks/recorder-hook";
import { ListRecords } from "@/modules/Home/components/ListRecords";
import { Button, Select } from "antd";
import { PauseOutlined } from "@ant-design/icons";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/packages/components/Header";
import { useRouter } from "next/navigation";
function HomePage() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioInput, setAudioInput] = useState<string>("default");
  const [meeting, setMeeting] = useState<any>(null);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((res) => {
      let tempDevices: MediaDeviceInfo[] = [];
      res?.forEach((item: MediaDeviceInfo) => {
        if (item.kind === "audioinput") {
          tempDevices.push(item);
        }
      });
      console.log(tempDevices);
      setDevices(tempDevices);
      setAudioInput("default");
    });
  }, []);

  const [selectedType, setSelectedType] = useState("");
  const [isHandling, setIsHandling] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const wsRef = useRef<any>(null);

  const handleData = (e: any) => {
    console.log(URL.createObjectURL(e.data));
  };

  const handleStreamData = (e: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(e);
    }
  };

  const [isRecording, startRecording, stopRecording, recorder] = useRecorder(
    handleData,
    handleStreamData,
    audioInput
  );

  const insertData = async (data: any) => {
    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataJson = await res.json();

      console.log(dataJson);

      setMeeting(dataJson?.payload?.insertedId);
    } catch (error) {
      console.log(error);
    }
  };

  const createMeeting = async () => {
    const now = new Date().toISOString();

    let inputName = now;
    if (text) {
      inputName = text;
    }
    try {
      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputName,
          createdAt: new Date(),
        }),
      });

      const jsonRes = await res.json();

      console.log(jsonRes);
      return jsonRes;
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const handleRecord = async () => {
    setIsHandling(true);
    if (isRecording) {
      stopRecording();
      wsRef.current.close();
      setData([]);

      router.push("/meeting?meetingId=" + meeting);

      return;
    } else {
      const resp = await createMeeting();
      const id = resp?.payload?.insertedId;
      if (!id) return;
      setMeeting(id);

      startRecording();
      wsRef.current = new WebSocket(process.env.NEXT_PUBLIC_WSS_URL || "");
      wsRef.current.onopen = () => {
        console.log("WebSocket connection opened.");
      };

      wsRef.current.onmessage = async (event: any) => {
        const data = event.data;

        // Append data to current text with new line
        let transcript = JSON.parse(data);
        await insertData({ ...transcript, meetingId: id });
        setData((prev) => [
          {
            ...transcript,
            date: new Date(),
          },
          ...prev,
        ]);
        // transcript = transcript.transcript_norm;
        // setText((prevText) => prevText + transcript + "\n");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed.");
        stopRecording();
      };

      wsRef.current.onerror = (error: any) => {
        console.error("WebSocket error:", error);
      };
    }
  };

  return (
    <div className={""}>
      <Header />

      <div className="px-3 ">
        <div
          className="mt-4 h-full rounded-md"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1",
          }}
        >
          {!isRecording ? (
            <div
              style={{
                height: "calc(100vh - 200px)",
              }}
            >
              <NoContent
                startRecorder={handleRecord}
                name={text}
                setName={setText}
                devices={devices}
                audioInput={audioInput}
                setAudioInput={setAudioInput}
              />
            </div>
          ) : (
            <div>
              {/* <div className="px-5 py-2 flex items-center gap-3">
                <p className="text-center text-sm font-semibold">
                  Audio Input:
                </p>
                <Select
                  options={devices?.map((item) => ({
                    label: item?.label,
                    value: item?.deviceId,
                  }))}
                  value={audioInput}
                  style={{ width: "500px" }}
                  onChange={(v) => setAudioInput(v)}
                />
              </div> */}
              <div
                style={{
                  height: "calc(100vh - 200px)",
                }}
                className="overflow-y-auto overflow-x-hidden h-full"
              >
                <ListRecords data={data} />
              </div>
            </div>
          )}
        </div>
      </div>

      {isRecording && (
        <div className="p-3">
          <Button type="primary" size="large" onClick={handleRecord}>
            <PauseOutlined /> Dừng ghi âm
          </Button>
          {/* {recorder && (
            <LiveAudioVisualizer
              mediaRecorder={recorder}
              width={200}
              height={75}
            />
          )} */}
        </div>
      )}
    </div>
  );
}

export default HomePage;

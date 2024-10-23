import { AudioOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const Empty = () => {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="84.5984"
        cy="79.5633"
        rx="45.2557"
        ry="45.2557"
        fill="#F0F0F0"
      />
      <path
        d="M91.6294 68.8862L134.077 80.8653L129.65 128L78.8691 115.24L91.6294 68.8862Z"
        fill="#D2D2D2"
      />
      <path
        d="M133.817 80.6047L89.2861 69.1465C87.116 72.2715 81.5258 80.3443 76.5259 87.6359C71.5259 94.9275 62.8107 103.868 59.0781 107.427L111.161 122.792C112.116 122.271 116.161 118.469 124.702 107.427C133.244 96.3858 134.338 84.9449 133.817 80.6047Z"
        fill="#F3F3F3"
        stroke="#CCCCCC"
        strokeWidth="0.818293"
      />
      <ellipse
        cx="93.1922"
        cy="81.386"
        rx="2.08331"
        ry="2.08331"
        fill="#C4C4C4"
      />
      <ellipse
        cx="86.9422"
        cy="92.3235"
        rx="2.08331"
        ry="2.08331"
        fill="#C4C4C4"
      />
      <ellipse
        cx="80.6922"
        cy="102.219"
        rx="2.08331"
        ry="2.08331"
        fill="#C4C4C4"
      />
      <path
        d="M68.3061 65.9515C63.7681 75.3244 52.491 79.2438 43.118 74.7058C33.7451 70.1677 29.8257 58.8907 34.3637 49.5177C38.9018 40.1448 50.1788 36.2254 59.5518 40.7634C68.9247 45.3015 72.8442 56.5785 68.3061 65.9515Z"
        fill="#F0F0F0"
        stroke="#D2D2D2"
        strokeWidth="0.818293"
      />
      <rect
        width="10.4166"
        height="1.56248"
        transform="matrix(1 0 0 -1 45.3452 63.2031)"
        fill="#C4C4C4"
      />
      <circle cx="40.3973" cy="54.6097" r="2.86455" fill="#C4C4C4" />
      <circle cx="60.7093" cy="54.6097" r="2.86455" fill="#C4C4C4" />
      <rect
        x="92.2646"
        y="94.1211"
        width="24.9997"
        height="1.04165"
        rx="0.520827"
        transform="rotate(15.5 92.2646 94.1211)"
        fill="#C4C4C4"
      />
      <rect
        x="86.8125"
        y="104.676"
        width="22.6283"
        height="1.04166"
        rx="0.520828"
        transform="rotate(15.5 86.8125 104.676)"
        fill="#C4C4C4"
      />
      <rect
        x="99.1279"
        y="82.9722"
        width="24.9997"
        height="1.04166"
        rx="0.520828"
        transform="rotate(14.5 99.1279 82.9722)"
        fill="#C4C4C4"
      />
    </svg>
  );
};

export const NoContent = ({ startRecorder }: { startRecorder: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Empty />
      <p className="font-semibold">Chưa có bản ghi</p>
      <p className="text-sm">Nhấn Bắt đầu ghi đề tiến hành quá trình ghi</p>
      <Button className="mt-6" type="primary" onClick={startRecorder}>
        <AudioOutlined />
        Bắt đầu ghi âm
      </Button>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div
      className="py-3 px-5 flex items-center gap-8"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Image alt="/" src={"/logo.png"} width={180} height={60} />
      <Link className="hover:text-blue-300" href={"/meetings"}>
        Meetings
      </Link>
      <Link className="hover:text-blue-300" href={"/"}>
        Record
      </Link>
    </div>
  );
};

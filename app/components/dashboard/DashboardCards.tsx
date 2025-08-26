import Image from "next/image";

const cards = [
  {
    title: "Total Claims",
    value: "35,985",
    icon: "plus",
    status: null,
    iconBg: "",
  },
  {
    title: "HMOs",
    value: "17",
    icon: "doc",
    status: null,
    iconBg: "bg-[#027FA31A]",
  },
  {
    title: "Average Response Time",
    value: "2.5mins",
    icon: "clock",
    status: {
      text: "+3%",
      color: "text-[#027FA3] bg-[#027FA31A] text-sm px-2 py-0.5 rounded-full",
    },
    iconBg: "bg-[#027FA31A]",
  },
  {
    title: "Approved Claims",
    value: "29,761",
    icon: "check",
    status: null,
    iconBg: "bg-[#027FA31A]",
  },
  {
    title: "Queried Claims",
    value: "5,429",
    icon: "cross",
    status: null,
    iconBg: "bg-[#027FA31A]",
  },
  {
    title: "Unattended Claims",
    value: "109",
    icon: "alert",
    status: {
      text: "18 Overdue",
      color: "text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs ml-2",
    },
    iconBg: "bg-[#027FA31A]",
  },
];

function getIcon(icon: string) {
  switch (icon) {
    case "plus":
      return (
        <Image
          src="/dashicon/total claims.svg"
          alt="icon"
          width={60}
          height={60}
        />
      );
    case "doc":
      return (
        <Image
          src="/dashicon/HMOs-dashboard.svg"
          alt="icon"
          width={100}
          height={100}
        />
      );
    case "clock":
      return (
        <Image
          src="/dashicon/Avg Response Time.svg"
          alt="icon"
          width={100}
          height={100}
        />
      );
    case "check":
      return (
        <Image
          src="/dashicon/Approved Claims.svg"
          alt="icon"
          width={100}
          height={100}
        />
      );
    case "cross":
      return (
        <Image
          src="/dashicon/Queried Claims.svg"
          alt="icon"
          width={100}
          height={100}
        />
      );
    case "alert":
      return (
        <Image
          src="/dashicon/Unattended claims.svg"
          alt="icon"
          width={100}
          height={100}
        />
      );
    default:
      return null;
  }
}

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 bg-[#ffffff] ">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#ffffff] rounded-xl border-[1px] border-[#EAECF0] p-[16px] flex items-center gap-[12px]"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[#7A7A7A] text-sm ">{card.title}</span>
            </div>
            <div className="text-2xl items-center font-bold text-[#101928] mt-7">
              <span className="mr-2">{card.value}</span>

              {card.status && (
                <span
                  className={
                    typeof card.status.color === "string"
                      ? card.status.color
                      : ""
                  }
                >
                  {card.status.text}
                </span>
              )}
            </div>
          </div>
          <span
            className={`w-12 h-12 p-[11px] flex items-center text-[#027FA3] bg-[#027FA31A] justify-center rounded-full ${card.iconBg}`}
          >
            {getIcon(card.icon)}
          </span>
        </div>
      ))}
    </div>
  );
}

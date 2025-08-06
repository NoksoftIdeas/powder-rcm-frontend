const cards = [
  {
    title: "Total Claims",
    value: "35,985",
    icon: "plus",
    status: null,
    iconBg: "bg-cyan-100",
  },
  {
    title: "HMOs",
    value: "17",
    icon: "doc",
    status: null,
    iconBg: "bg-cyan-100",
  },
  {
    title: "Average Response Time",
    value: "2.5mins",
    icon: "clock",
    status: {
      text: "+3%",
      color: "text-blue-500 bg-[#027FA31A] text-sm px-2 py-0.5 rounded-full",
    },
    iconBg: "bg-cyan-100",
  },
  {
    title: "Approved Claims",
    value: "29,761",
    icon: "check",
    status: null,
    iconBg: "bg-cyan-100",
  },
  {
    title: "Queried Claims",
    value: "5,429",
    icon: "cross",
    status: null,
    iconBg: "bg-cyan-100",
  },
  {
    title: "Unattended Claims",
    value: "109",
    icon: "alert",
    status: {
      text: "18 Overdue",
      color: "text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs ml-2",
    },
    iconBg: "bg-cyan-100",
  },
];

function getIcon(icon: string) {
  switch (icon) {
    case "plus":
      return <img src="/dashicon/Frame.png" alt="icon" />;
    case "doc":
      return <img src="/dashicon/Frame (3).png" alt="icon" />;
    case "clock":
      <img src="/dashicon/Frome (4).png" alt="icon" />;
    case "check":
      return <img src="/dashicon/Frame (1).png" alt="icon" />;
    case "cross":
      return <img src="/dashicon/Frame (2).png" alt="icon" />;
    case "alert":
      return <img src="/dashicon/Frame (5).png" alt="icon" />;
    default:
      return null;
  }
}

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#fff] rounded-xl border-[1px] border-gray-200 p-4 flex items-center gap-[12px]"
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
            className={`w-12 h-12 flex items-center justify-center rounded-full ${card.iconBg}`}
          >
            {getIcon(card.icon)}
          </span>
        </div>
      ))}
    </div>
  );
}

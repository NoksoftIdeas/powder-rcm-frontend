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
    status: { text: "+3%", color: "text-blue-500" },
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
      return (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#06b6d4"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 8v8m-4-4h8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#06b6d4"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" />
          <path d="M8 8h8M8 12h8M8 16h4" strokeWidth="2" />
        </svg>
      );
    case "clock":
      return (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#06b6d4"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#06b6d4"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M8 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "cross":
      return (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#06b6d4"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M9 9l6 6m0-6l-6 6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "alert":
      return (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#f87171"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
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
          className="bg-white rounded-xl shadow-sm border-[1px] border-gray-200 p-4 flex items-center gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm font-semibold">
                {card.title}
              </span>
            </div>
            <div className="text-2xl items-center font-bold text-gray-900 mt-5">
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

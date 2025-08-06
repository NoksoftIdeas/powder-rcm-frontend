"use client";

interface DenialsSummaryCardsProps {
  totalAmount: string;
  unresolved: number;
  resolved: number;
  avgDayOpen: number;
}

const cards = (
  props: DenialsSummaryCardsProps
) => [
  {
    title: "Total amount",
    value: props.totalAmount,
  },
  {
    title: "Unresolved",
    value: props.unresolved,
  },
  {
    title: "Resolved",
    value: props.resolved,
  },
  {
    title: "Average day open",
    value: props.avgDayOpen,
  },
];

export default function DenialsSummaryCards(props: DenialsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards(props).map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl  border border-gray-200 p-6 flex flex-col justify-center"
        >
          <span className="text-[#7A7A7A] text-sm mb-5">{card.title}</span>
          <span className="text-2xl font-bold text-[#101928]">{card.value}</span>
        </div>
      ))}
    </div>
  );
} 
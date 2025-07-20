interface PAStatusBadgeProps {
  status: "new" | "read" | "overdue" | "resolved";
}

export default function PAStatusBadge({ status }: PAStatusBadgeProps) {
  let color = "";
  let label = "";
  switch (status) {
    case "new":
      color = "bg-blue-100 text-blue-700";
      label = "New";
      break;
    case "read":
      color = "bg-gray-100 text-gray-500";
      label = "Read";
      break;
    case "overdue":
      color = "bg-red-100 text-red-600";
      label = "Overdue";
      break;
    case "resolved":
      color = "bg-green-100 text-green-700";
      label = "Resolved";
      break;
    default:
      color = "bg-gray-100 text-gray-500";
      label = status;
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${color}`}>{label}</span>
  );
}

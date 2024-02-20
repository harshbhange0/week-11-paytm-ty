import "../assets/table.css";

export default function TrHistoryItem({ sender, receiver, amount, time }) {
  const date = new Date(time);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  return (
    <>
      <tbody>
        <tr>
          <td>{formattedDate}</td>
          <td>{formattedTime}</td>
          <td>{sender}</td>
          <td>{receiver}</td>
          <td>{amount} Rs</td>
        </tr>
      </tbody>
    </>
  );
}

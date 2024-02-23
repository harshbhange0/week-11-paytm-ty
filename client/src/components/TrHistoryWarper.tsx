import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";
import TrHistoryItem from "./TrHistoryItem";

export default function TrHistoryWarper() {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const data = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);

  const [tr, setTr] = useState([]);
  useEffect(() => {
    getTrHistory();
  }, []);
  const getTrHistory = async () => {
    try {
      if (data) {
        const Jdata = JSON.parse(data);
        const res: any = await axios.get(
          `${baseurl}/transaction-history/${Jdata.id}`,
          {
            headers: { token: Jdata.token },
          }
        );
        setTr(res.data.transaction_history);
        if (res.data.transaction_history.length < 0) {
          setLoading(false);
        } else {
          setTimeout(() => {
            setLoading(true);
          }, 500);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return loading ? (
    <div className="pb-5 px-2 md:px-10 w-full h-full">
      <h1 className="text-2xl mb-3 text-center font-semibold">
        Transaction History
      </h1>
      <table className="blueTable capitalize">
        <thead>
          <tr>
            <th>Time</th>
            <th>Date</th>
            <th>Sender</th>
            <th>Reciver</th>
            <th>Amount</th>
          </tr>
        </thead>
        {tr.map((data, i) => {
          return (
            <TrHistoryItem
              sender={data.sender}
              receiver={data.receiver}
              amount={data.amount}
              time={data.time}
              key={i}
            />
          );
        })}
      </table>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col">
      <LoadingIcon />
    </div>
  );
}

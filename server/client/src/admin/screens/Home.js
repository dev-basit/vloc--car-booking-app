import { userData } from "../../config/inputs";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetSm from "../components/WidgetSm";
import WidgetLg from "../components/WidgetLg";
// import "../admin.css";

import { BsCalendarCheckFill, BsPeople } from "react-icons/bs";
import { AiFillEuroCircle } from "react-icons/ai";

const data = [
  {
    title: "Reservations",
    time: ["Today", "This month", "This year"],
    percentage: "50%",
    number: 10,
    icon: <BsCalendarCheckFill color="pink" className="featuredIcon negative" />,
  },
  {
    title: "Income",
    time: ["Today", "This month", "This year"],
    percentage: "60%",
    number: 4,
    icon: <AiFillEuroCircle color="blue" className="featuredIcon negative" />,
  },
  {
    title: "Customer",
    time: ["Today", "This month", "This year"],
    percentage: "10%",
    number: 7,
    icon: <BsPeople color="red" className="featuredIcon negative" />,
  },
];

export default function Home() {
  return (
    <div className="home">
      <div className="featured">
        {data.map((item, index) => {
          return <FeaturedInfo item={item} key={index} />;
        })}
      </div>

      <Chart data={userData} title="Income" grid dataKey="Income" />
      {/* <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div> */}
    </div>
  );
}

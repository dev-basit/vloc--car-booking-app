import { Link } from "react-router-dom";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";

import { IoPeopleOutline } from "react-icons/io5";
import { AiOutlineCar } from "react-icons/ai";
import { BsCreditCard } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

// import "../admin.css";

const routes = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <LineStyle className="adminSidebarIcon" />,
  },
  {
    title: "Reservaion",
    path: "/admin/reservations",
    icon: <AttachMoney className="adminSidebarIcon" />,
  },
  {
    title: "Clients",
    path: "/admin/clients",
    icon: <IoPeopleOutline className="adminSidebarIcon" />,
  },
  {
    title: "Cars",
    path: "/admin/cars",
    icon: <AiOutlineCar className="adminSidebarIcon" />,
  },
  {
    title: "Payments",
    path: "/admin/payments",
    icon: <BsCreditCard className="adminSidebarIcon" />,
  },
  {
    title: "Configuration",
    path: "/admin/configurations",
    icon: <CiSettings className="adminSidebarIcon" />,
  },
];

export default function Sidebar() {
  return (
    <div className="adminSidebar">
      <div className="adminSidebarWrapper">
        <div className="adminSidebarMenu">
          <ul className="adminSidebarList">
            {/* <h3 className="adminSidebarTitle">Dashboard</h3> */}
            {routes.map((item, index) => {
              return (
                <Link to={item.path} className="link" key={index}>
                  <li
                    className="adminSidebarListItem"
                    id={window.location.pathname === item.path ? "active" : ""}
                    onClick={(e) => {
                      window.location.pathname = item.path;
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

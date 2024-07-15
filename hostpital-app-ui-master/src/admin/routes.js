import Doctors from "admin/views/Doctors";
import AddDoctor from "admin/views/AddDoctor";

import Dashboard from "admin/views/Dashboard.js";
import UserProfile from "admin/views/UserProfile.js";
import TableList from "admin/views/TableList.js";
import Typography from "admin/views/Typography.js";
import Icons from "admin/views/Icons.js";
import Maps from "admin/views/Maps.js";
import Notifications from "admin/views/Notifications.js";
import Upgrade from "admin/views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  {
    path: "/doctors",
    name: "Doctors",
    icon: "nc-icon nc-notes",
    component: Doctors,
    layout: "/admin"
  },
  {
    path: "/add-doctor",
    name: "Add Doctor",
    icon: "nc-icon nc-circle-09",
    component: AddDoctor,
    layout: "/admin"
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;

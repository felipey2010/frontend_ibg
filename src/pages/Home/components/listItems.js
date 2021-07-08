import React from "react";
import "./styles.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import BarChartIcon from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <div>
    {/* Dashboard */}
    <NavLink
      variant="contained"
      color="primary"
      className="link"
      activeStyle={{
        color: "#c11c1c",
      }}
      exact
      to="/home">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>

    {/* Membros */}
    <NavLink
      variant="contained"
      color="primary"
      className="link"
      activeStyle={{
        color: "#c11c1c",
      }}
      exact
      to="/home/membros">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Membros" />
      </ListItem>
    </NavLink>

    {/* Relatórios */}
    <NavLink
      variant="contained"
      color="primary"
      className="link"
      activeStyle={{
        color: "#c11c1c",
      }}
      exact
      to="/home/relatorios">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
      </ListItem>
    </NavLink>

    {/* Future Links */}
    {/* <NavLink
      variant="contained"
      color="primary"
      className="link"
      to="#">
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
    </NavLink> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Misc.</ListSubheader>

    {/* Configuração */}
    <NavLink
      variant="contained"
      color="primary"
      className="link"
      activeStyle={{
        color: "#c11c1c",
      }}
      exact
      to="/home/configuracao">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configuração" />
      </ListItem>
    </NavLink>

    {/* Notificações */}
    <NavLink
      variant="contained"
      color="primary"
      className="link"
      activeStyle={{
        color: "#c11c1c",
      }}
      exact
      to="/home/notificacao">
      <ListItem button>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notificações" />
      </ListItem>
    </NavLink>

    {/* Relatar problemas */}
    <NavLink
      variant="contained"
      color="primary"
      className="link"
      activeStyle={{
        color: "#c11c1c",
      }}
      exact
      to="/home/relatar-problema">
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Relatar problema" />
      </ListItem>
    </NavLink>
  </div>
);

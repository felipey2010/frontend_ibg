import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./components/listItems";
import Copyright from "../../components/Copyright";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ListMembers from "./components/ListMembers";
import Page404 from "../../pages/Page404";
import ProfilePage from "./components/ProfilePage";
import Configuration from "./components/Configuration.js";
import ProblemLog from "./components/ProblemLog.js";
import NotificationPage from "./components/NotificationPage";
import ReportPage from "./components/ReportPage";
import axios from "axios";
import UserButton from "./components/UserButton";
import { useSnackbar } from "notistack";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#c11c1c",
    },
    "& .MuiTypography-colorPrimary": {
      color: "#ce0d0d",
    },
    "& .MuiBadge-colorSecondary": {
      backgroundColor: "#000000",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#c11c1c",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#060606d4",
    },
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#c11c1c",
    },
    "& .MuiCardMedia-root": {
      backgroundSize: "contain",
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // zIndex: 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  footer: {
    position: "absolute",
    bottom: 0,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState([]);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("Painel de Controle");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let location = useLocation();

  async function getMembers() {
    axios
      .get("/membros")
      .then(res => {
        setMembers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function getData() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .post("user/auth/verifyToken/" + token)
        .then(result => {
          if (result.data.success) {
            setUser(result.data.user);
          } else {
            enqueueSnackbar("Acesso Negado", { variant: "error" });
            setUser(null);
          }
        })
        .catch(error => {
          enqueueSnackbar("Erro de Authenticação", { variant: "error" });
          console.log(error);
        });
    } else {
      enqueueSnackbar("Erro de Authenticação", { variant: "error" });
      setUser(null);
    }
  }

  useEffect(() => {
    getData();
    getMembers();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeTitle = title => {
    setTitle(title);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (user) {
    closeSnackbar();
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}>
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}>
                {title}
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <UserButton user={user} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Switch>
                <Route
                  path="/home"
                  exact
                  component={() => {
                    changeTitle("Painel de Controle");
                    return <Dashboard members={members} />;
                  }}
                />
                <Route
                  path="/home/membros"
                  exact
                  component={() => {
                    changeTitle("Membros");
                    return (
                      <ListMembers members={members} setMembers={setMembers} />
                    );
                  }}
                />
                <Route
                  path="/home/perfil"
                  exact
                  component={() => {
                    changeTitle("Perfil");
                    return <ProfilePage user={user} />;
                  }}
                />
                <Route
                  path="/home/relatorios"
                  exact
                  component={() => {
                    changeTitle("Relatórios");
                    return <ReportPage />;
                  }}
                />
                <Route
                  path="/home/configuracao"
                  exact
                  component={() => {
                    changeTitle("Configuração");
                    return <Configuration />;
                  }}
                />
                <Route
                  path="/home/notificacao"
                  exact
                  component={() => {
                    changeTitle("Notificações");
                    return <NotificationPage />;
                  }}
                />
                <Route
                  path="/home/relatar-problema"
                  exact
                  component={() => {
                    changeTitle("Relatar Problema");
                    return <ProblemLog />;
                  }}
                />
                <Route
                  path="/home/*"
                  component={() => {
                    changeTitle("Erro Página");
                    return <Page404 />;
                  }}
                />
              </Switch>

              <Box pt={4}>
                <Copyright className={classes.footer} />
              </Box>
            </Container>
          </main>
        </div>
      </Router>
    );
  } else {
    return (
      <Redirect to={{ pathname: "/", state: { from: location.pathname } }} />
    );
  }
}

/*Complete login tutorial
https://www.youtube.com/watch?v=6sLh_5iFnFc
*/

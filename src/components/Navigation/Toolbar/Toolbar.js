import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Hamburger from "../../UI/Hamburger/Hamburger";

const toolbar = props => (
  <div className={classes.Toolbar}>
    <Hamburger clicked={props.sideDrawerOpened} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </div>
);

export default toolbar;

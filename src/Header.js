import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#000000" }}>
      <Toolbar>
        <img src="https://classmethod.jp/wp-content/themes/classmethod/img/common/logo_classmethod.svg" alt="クラスメソッド株式会社"></img>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

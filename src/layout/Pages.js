import React from "react";

import Dashboard from "../pages/dashboard/Dashboard";
import Order from "../pages/order/Order";
import Stock from "../pages/stock/Stock";
import Administration from "../pages/administration/Administration";
import Reports from "../pages/reports/Reports";

import "./Pages.css";

import { Route, Switch } from "react-router-dom";

const Pages = () => {
  return (
    <main className="layout-pages">
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/order" exact component={Order} />
        <Route path="/stock" exact component={Stock} />
        <Route path="/administration" exact component={Administration} />
        <Route path="/reports" exact component={Reports} />
      </Switch>
    </main>
  );
};

export default Pages;

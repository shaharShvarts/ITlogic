import React from "react";

import Dashboard from "../pages/dashboard/Dashboard";
import Order from "../pages/order/Order";
import Stock from "../pages/stock/Stock";
import Users from "../pages/administration/users/Users";
import Categories from "../pages/administration/categories/Categories";
import Products from "../pages/administration/production/Products";
import Reports from "../pages/reports/Reports";

import "./Pages.css";

import { Route, Switch } from "react-router-dom";

const Pages = () => {
  return (
    <main
      className="layout-pages"
      onDrop={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Switch>
        <Route exact path="/ITlogic" component={Dashboard} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/stock" component={Stock} />
        <Route exact path="/administration/users" component={Users} />
        <Route exact path="/administration/categories" component={Categories} />
        <Route exact path="/administration/products" component={Products} />
        <Route exact path="/reports" component={Reports} />
      </Switch>
    </main>
  );
};

export default Pages;

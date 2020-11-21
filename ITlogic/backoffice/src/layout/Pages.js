import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Order from "../pages/order/Order";
import Stocks from "../pages/stock/Stocks";
import AddStock from "../pages/stock/AddStock";
import StockDetails from "../pages/stock/StockDetails";
import Users from "../pages/administration/users/Users";
import ViewProducts from "../pages/administration/users/ViewProducts";
// import User from "../pages/administration/users/User";
import Categories from "../pages/administration/categories/Categories";
import Products from "../pages/administration/products/Products";
import Reports from "../pages/reports/Reports";
import Page404 from "../pages/404/Page404";

import "./Pages.css";

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
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/stock" component={Stocks} />
        <Route exact path="/stock/addStock" component={AddStock} />
        <Route exact path="/stock/stockDetails/:id" component={StockDetails} />
        <Route exact path="/administration/users" component={Users} />
        <Route
          exact
          path="/administration/users/viewProducts/:id"
          component={ViewProducts}
        />
        <Route exact path="/administration/categories" component={Categories} />
        <Route exact path="/administration/products" component={Products} />
        <Route exact path="/reports" component={Reports} />
        <Route component={Page404} />
      </Switch>
    </main>
  );
};

export default Pages;

import React from "react";
import ReactDOM from "react-dom";
import restProvider from "./dataProvider";
import { Admin, Resource } from "react-admin";
import bills from "./bills";
import companies from "./companies";
import chineseMessages from "ra-language-chinese";
import domainMessages from "./i18n";
import * as serviceWorker from "./serviceWorker";

const messages = {
  cn: { ...chineseMessages, ...domainMessages }
};
const i18nProvider = locale => messages[locale];
const dataProvider = restProvider("http://localhost:8080");
const App = () => (
  <Admin locale="cn" i18nProvider={i18nProvider} dataProvider={dataProvider}>
    <Resource name="bill" {...bills} />
    <Resource name="company" {...companies} />
  </Admin>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

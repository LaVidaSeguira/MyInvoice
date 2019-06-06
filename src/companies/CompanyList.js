import React from "react";
import { Datagrid, List, TextField } from "react-admin";

const CompanyList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <TextField source="tel" />
      <TextField source="bank" />
      <TextField source="account" />
    </Datagrid>
  </List>
);

export default CompanyList;

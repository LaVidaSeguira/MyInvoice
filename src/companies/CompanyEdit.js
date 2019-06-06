import React from "react";
import { DisabledInput, Edit, SimpleForm, TextInput } from "react-admin";

const CompanyEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="address" />
      <TextInput source="bank" />
      <TextInput source="tel" />
      <TextInput source="account" />
    </SimpleForm>
  </Edit>
);

export default CompanyEdit;

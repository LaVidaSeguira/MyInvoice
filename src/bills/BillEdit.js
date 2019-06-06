import React from "react";
import {
  Edit,
  DateInput,
  SimpleForm,
  DisabledInput,
  TextInput,
  NumberInput
} from "react-admin";

const BillEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DateInput source="signdate" />
      <TextInput source="material" />
      <TextInput source="size" />
      <TextInput source="unit" />
      <NumberInput source="num" />
      <NumberInput source="price" />
      <NumberInput source="total" />
    </SimpleForm>
  </Edit>
);

export default BillEdit;

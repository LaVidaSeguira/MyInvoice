import React from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  required,
  TextInput,
  NumberInput
} from "react-admin";
import CompanyReferenceInput from "./CompanyReferenceInput";

const BillCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateInput source="signdate" validate={required()} />
        <TextInput source="material" validate={required()} />
        <TextInput source="size" validate={required()} />
        <TextInput source="unit" validate={required()} />
        <NumberInput source="num" validate={required()} />
        <NumberInput source="price" validate={required()} />
        <NumberInput source="total" validate={required()} />
        <CompanyReferenceInput
          source="pid"
          reference="company"
          validate={required()}
        />
        <CompanyReferenceInput
          source="bid"
          reference="company"
          validate={required()}
        />
      </SimpleForm>
    </Create>
  );
};

export default BillCreate;

import React, { Fragment } from "react";
import { ReferenceInput, AutocompleteInput } from "react-admin";

import CompanyQuickCreateButton from "./CompanyQuickCreateButton";

const CompanyReferenceInput = props => (
  <Fragment>
    <ReferenceInput {...props}>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>

    <CompanyQuickCreateButton />
  </Fragment>
);

export default CompanyReferenceInput;

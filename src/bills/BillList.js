import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField
} from "react-admin";
import DownLoadButton from "./DownLoadButton";

const coloredStyles = {
  first: { color: "green" },
  second: { color: "red" }
};

const ColoredNumberField = withStyles(coloredStyles)(
  ({ classes, ...props }) => (
    <NumberField
      className={classnames({
        [classes.first]: props.record[props.source] < 1000000,
        [classes.second]: props.record[props.source] >= 1000000
      })}
      {...props}
    />
  )
);
ColoredNumberField.defaultProps = NumberField.defaultProps;

const BillList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="signdate" />
      <TextField source="material" />
      <TextField source="size" />
      <TextField source="unit" />
      <NumberField source="num" />
      <NumberField source="price" />
      <ColoredNumberField source="total" />
      <ReferenceField source="pid" reference="company" linkType="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="bid" reference="company" linkType="show">
        <TextField source="name" />
      </ReferenceField>
      <DownLoadButton />
    </Datagrid>
  </List>
);

export default BillList;

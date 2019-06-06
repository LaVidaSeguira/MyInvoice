import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconContentAdd from "@material-ui/icons/Add";
import IconCancel from "@material-ui/icons/Cancel";
import { debounce } from "lodash";
import React, { Component, Fragment } from "react";
import {
  Button,
  crudGetMatching,
  fetchEnd,
  fetchStart,
  REDUX_FORM_NAME,
  SaveButton,
  showNotification,
  SimpleForm,
  TextInput,
  AutocompleteInput,
  Loading,
  required
} from "react-admin";
import { connect } from "react-redux";
import { change, isSubmitting, submit } from "redux-form";
import Query from "./Query";
import { withStyles } from "@material-ui/core/styles";
const MyAutocompleteInput = withStyles(theme => ({
  suggestionsContainerOpen: { zIndex: 3000 }
}))(AutocompleteInput);
class CompanyQuickCreateButton extends Component {
  state = {
    error: false,
    showDialog: false,
    record: {},
    data: [],
    key: "fxfl"
  };

  handleClick = () => {
    this.setState({ showDialog: true });
  };

  handleCloseClick = () => {
    this.setState({ showDialog: false });
  };

  handleSaveClick = () => {
    const { submit } = this.props;

    // Trigger a submit of our custom quick create form
    // This is needed because our modal action buttons are oustide the form
    submit("company-quick-create");
  };

  handleSubmit = values => {
    const {
      change,
      crudGetMatching,
      fetchStart,
      fetchEnd,
      showNotification
    } = this.props;

    // Dispatch an action letting react-admin know a API call is ongoing
    fetchStart();

    // As we want to know when the new post has been created in order to close the modal, we use the
    // dataProvider directly
    const options = {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json"
      }
    };
    fetch("http://localhost:8080/company", options)
      .then(res => {
        return res.json();
      })
      .then(json => {
        // Refresh the choices of the ReferenceInput to ensure our newly created post
        // always appear, even after selecting another post
        crudGetMatching(
          "company",
          "bill@pid",
          { page: 1, perPage: 25 },
          { field: "id", order: "DESC" },
          {}
        );
        crudGetMatching(
          "company",
          "bill@bid",
          { page: 1, perPage: 25 },
          { field: "id", order: "DESC" },
          {}
        );
        // Update the main react-admin form (in this case, the comments creation form)
        change(REDUX_FORM_NAME, "pid", json.id);
        change(REDUX_FORM_NAME, "bid", json.id);
        this.setState({ showDialog: false });
        showNotification("添加成功");
      })
      .catch(error => {
        showNotification(error.message, "error");
      })
      .finally(() => {
        // Dispatch an action letting react-admin know a API call has ended
        fetchEnd();
      });
  };

  handleChange = (e, val) => {
    console.log(val);
    const value = this.data.filter(e => e.id === val)[0];
    this.setState({ record: value });
  };

  handleRender = (data, loading, error) => {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <p>ERROR</p>;
    }
    this.data = data;
    return (
      <MyAutocompleteInput
        label="输入公司"
        source="id"
        choices={data}
        optionValue="id"
        optionText="name"
        setFilter={this.handleFilter}
        onChange={this.handleChange}
      />
    );
  };

  handleFilter = debounce(value => {
    console.log(value);
    if (value.length < 3) return;
    this.setState({ key: value });
  }, 1000);

  render() {
    const { showDialog, record, key } = this.state;
    const { isSubmitting } = this.props;

    return (
      <Fragment>
        <Button onClick={this.handleClick}>
          <IconContentAdd />
        </Button>
        <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick}>
          <DialogTitle>新建公司</DialogTitle>
          <DialogContent>
            <SimpleForm
              // We override the redux-form name to avoid collision with the react-admin main form
              form="company-quick-create"
              resource="company"
              // We override the redux-form onSubmit prop to handle the submission ourselves
              onSubmit={this.handleSubmit}
              // We want no toolbar at all as we have our modal actions
              toolbar={null}
              record={record}
            >
              <Query
                type="GET_MATCH_LIST"
                resource="company"
                payload={{ key: key }}
              >
                {({ data, loading, error }) =>
                  this.handleRender(data, loading, error)
                }
              </Query>
              <Button label="搜索" />
              <TextInput source="name" validate={required()} />
              <TextInput source="id" validate={required()} />
              <TextInput source="address" validate={required()} />
              <TextInput source="bank" validate={required()} />
              <TextInput source="tel" validate={required()} />
              <TextInput source="account" validate={required()} />
            </SimpleForm>
          </DialogContent>
          <DialogActions>
            <SaveButton saving={isSubmitting} onClick={this.handleSaveClick} />
            <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isSubmitting: isSubmitting("company-quick-create")(state)
});

const mapDispatchToProps = {
  change,
  crudGetMatching,
  fetchEnd,
  fetchStart,
  showNotification,
  submit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyQuickCreateButton);

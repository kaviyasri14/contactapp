import React from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Box from "@material-ui/core/Box";
class SimpleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      company: "",
      email: "",
      role: "",
      address: "",
      number: ""
    };
    this.mutatestate = this.mutatestate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose = (value) => {
    this.setState({ open: false });
    let newcnct = {
      Name: value.name,
      Description: value.role,
      Email: value.email,
      Phone_Number: value.number,
      Company: value.company,
      Address: value.address
    };
    this.props.newcnct(newcnct, this.props.selected.id);
  };
  mutatestate(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidMount() {
    this.setState({
      open: true
    });

    if (this.props.mode === "edit") {
      this.setState({
        name: this.props.selected.Name,
        company: this.props.selected.Company,
        email: this.props.selected.Email,
        role: this.props.selected.Description,
        address: this.props.selected.Address,
        number: this.props.selected.Phone_Number
      });
    }
  }
  render() {
    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={(e) => {
            e.preventDefault();
            this.props.closeModal();
            this.setState({ open: false });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.mode.toUpperCase()} contact
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                name: this.state.name,
                company: this.state.company,
                email: this.state.email,
                role: this.state.role,
                address: this.state.address,
                number: this.state.number
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.name) {
                  errors.name = "Contact name is Mandatory..!";
                }
                if (!values.number) {
                  errors.number = "Phone Number Required";
                } else if (!/^[0-9]{8,10}$/i.test(values.number)) {
                  errors.number = "Invalid Contact Number";
                }
                if (!values.company) {
                  errors.company = "Company Name Required";
                }
                return errors;
              }}
              onSubmit={(values) => {
                this.handleClose(values);
              }}
            >
              {({ submitForm, errors, status, touched }) => (
                <Form>
                  <Box margin={1}>
                    <Field
                      fullWidth={true}
                      component={TextField}
                      type="text"
                      label="ContactName"
                      name="name"
                    />
                  </Box>
                  <Box margin={1}>
                    <Field
                      fullWidth={true}
                      component={TextField}
                      type="email"
                      label="email"
                      name="email"
                    />
                  </Box>
                  <Box margin={1}>
                    <Field
                      fullWidth={true}
                      component={TextField}
                      type="text"
                      label="role"
                      name="role"
                    />
                  </Box>
                  <Box margin={1}>
                    <Field
                      fullWidth={true}
                      component={TextField}
                      type="text"
                      label="company"
                      name="company"
                    />
                  </Box>
                  <Box margin={1}>
                    <Field
                      fullWidth={true}
                      component={TextField}
                      type="text"
                      label="number"
                      name="number"
                    />
                  </Box>
                  <Box margin={1}>
                    <Field
                      fullWidth={true}
                      component={TextField}
                      type="textarea"
                      label="address"
                      name="address"
                    />
                  </Box>
                  <Box margin={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.closeModal();
                        this.setState({ open: false });
                      }}
                      color="primary"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default SimpleModal;

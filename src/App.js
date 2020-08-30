import React from "react";
import "./styles.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Addcnct from "./Addcnct";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBalanceScaleLeft,
  faAddressBook
} from "@fortawesome/free-solid-svg-icons";

import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import data from "../public/data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cnctList: data,
      filteredList: data,
      openModal: false,
      mode: "",
      deleteaction: false,
      selectedContacts: [],
      showallchecked: false,
      curuser: {
        id: 1,
        Name: "Kaviya",
        Description: "Software Engineer",
        Email: "kaviyasri14@gmai.com",
        Phone_Number: 9952090402,
        Company: "Virtusa",
        Address: "Periyar Nagar,Chennai-600082"
      }
    };
    this.addcnct = this.addcnct.bind(this);
    this.handleadd = this.handleadd.bind(this);
    this.openModal = this.openModal.bind(this);
    this.editCnct = this.editCnct.bind(this);
    this.fetchColor = this.fetchColor.bind(this);
    this.tableSelect = this.tableSelect.bind(this);
    this.selectContact = this.selectContact.bind(this);
    this.filtercontact = this.filtercontact.bind(this);
    this.selectAllContacts = this.selectAllContacts.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }

  viewCnct(data) {
    this.setState({
      curuser: data
    });
  }
  tableSelect(id) {
    return id === this.state.curuser.id ? "rowselected" : "";
  }
  filtercontact(event) {
    let dumm = this.state.cnctList.filter((obj) => {
      return obj.Name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({
      filteredList: dumm
    });
  }
  deleteContact() {
    if (this.state.selectedContacts.length === this.state.filteredList.length) {
      this.setState({
        deleteaction: false,
        filteredList: [],
        cnctList: [],
        selectedContacts: []
      });
    } else {
      const updatedHeaders = this.state.cnctList.filter((obj, index) => {
        return !this.state.selectedContacts.includes(obj.id);
      });
      this.setState({
        cnctList: updatedHeaders,
        filteredList: updatedHeaders,
        selectedContacts: [],
        deleteaction: false
      });
    }
  }
  deleteConfirm() {
    if (this.state.deleteaction) {
      return (
        <Dialog
          open={this.state.deleteaction}
          onClose={() => {
            this.setState({
              deleteaction: false
            });
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to delete all the selected contacts"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.deleteContact} color="primary">
              Proceed
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  deleteaction: false
                });
              }}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return "";
    }
  }
  selectAllContacts() {
    if (this.state.selectedContacts.length !== this.state.filteredList.length) {
      let allIds = this.state.filteredList.map((list) => {
        return list.id;
      });
      this.setState({
        selectedContacts: allIds,
        showallchecked: true
      });
    } else {
      this.setState({
        selectedContacts: [],
        showallchecked: false
      });
    }
  }
  addcnct(newdata, id) {
    if (this.state.mode === "add") {
      newdata.id = this.state.cnctList.length + 1;
      this.setState({
        openModal: false,
        mode: "",
        cnctList: [...this.state.cnctList, newdata],
        filteredList: [...this.state.filteredList, newdata],
        curuser: newdata
      });
    } else {
      const updatedHeaders = this.state.cnctList.map((obj, index) => {
        return obj.id === id ? newdata : obj;
      });
      this.setState({
        cnctList: updatedHeaders,
        filteredList: updatedHeaders,
        openModal: false,
        mode: "",
        curuser: newdata
      });
    }
  }
  editCnct() {
    this.setState({
      openModal: true,
      mode: "edit"
    });
  }
  handleadd() {
    this.setState({
      openModal: true,
      mode: "add"
    });
  }
  fetchColor(id) {
    let color = [
      "fe6b8b",
      "red",
      "orange",
      "grey",
      "green",
      "purple",
      "pink",
      "orange",
      "grey",
      "blue"
    ];

    return color[id % 10];
  }
  getDateTime() {
    let datearr = new Date().toDateString().split(" ");
    return datearr[2] + " " + datearr[1] + " " + datearr[3];
  }
  selectContact(e, id) {
    e.preventDefault();
    if (this.state.selectedContacts.length === this.state.filteredList.length) {
      let allIds = this.state.filteredList
        .filter((list) => {
          return list.id !== id;
        })
        .map((el) => {
          return el.id;
        });
      this.setState({
        selectedContacts: allIds,
        showallchecked: false
      });
    }
    if (this.state.selectedContacts.includes(id)) {
      this.setState({
        selectedContacts: this.state.selectedContacts.filter((i) => i !== id)
      });
    } else {
      this.setState({
        selectedContacts: [...this.state.selectedContacts, id]
      });
    }
  }
  openModal() {
    if (this.state.openModal) {
      return (
        <Addcnct
          mode={this.state.mode}
          newcnct={this.addcnct}
          closeModal={() => {
            this.setState({
              openModal: false,
              mode: ""
            });
          }}
          selected={this.state.curuser}
        />
      );
    } else {
      return <span></span>;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="root">
          <this.openModal />
          <this.deleteConfirm />
          <Grid container spacing={5}>
            <Grid item xs={12} sm={10}>
              <div className="searchheader">
                {/* <PermContactCalendarIcon fontSize="large" /> */}
                <FontAwesomeIcon
                  icon={faAddressBook}
                  className="balancestyle"
                />
                Contacts
              </div>
              <div className="searchcontent">Welcome to CRM Contact page</div>

              <div className="serchbar">
                <TextField
                  color="secondary"
                  size="small"
                  classess={styles.textsearch}
                  label="Search Contacts"
                  onChange={this.filtercontact}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={this.handleadd}
                  endIcon={<AddIcon className={styles.rightIcon} />}
                >
                  ADD Contact
                </StyledButton>
              </div>
            </Grid>
            <Grid className="lft" item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={6}>
              <table cellSpacing="0" cellPadding="0" className="contacttable">
                <thead>
                  <tr>
                    <th>
                      <Checkbox
                        checked={this.state.showallchecked}
                        onChange={() => {
                          this.selectAllContacts();
                        }}
                        name="checkedA"
                      />
                      {this.state.selectedContacts.length !== 0 ? (
                        <DeleteIcon
                          color="error"
                          onClick={() => {
                            this.setState({
                              deleteaction: true
                            });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </th>
                    <th>Basic info</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredList.map((x) => (
                    <tr key={x.id} className={this.tableSelect(x.id)}>
                      <td>
                        <Checkbox
                          checked={this.state.selectedContacts.includes(x.id)}
                          onChange={(event) => {
                            this.selectContact(event, x.id);
                          }}
                          name="checkedA"
                        />
                      </td>
                      <td>
                        <Cardstyled
                          selected={x.id === this.state.curuser.id}
                          key={x.id}
                          onClick={() => {
                            this.viewCnct(x);
                          }}
                        >
                          <CardHeader
                            avatar={
                              <StyledAvatar
                                dynamiccolor={this.fetchColor(x.id)}
                              >
                                {x.Name.split(" ").length > 1
                                  ? x.Name.split(" ")[0]
                                      .charAt(0)
                                      .toUpperCase() +
                                    x.Name.split(" ")[1].charAt(0).toUpperCase()
                                  : x.Name.charAt(0).toUpperCase()}
                              </StyledAvatar>
                            }
                            title={<b>{x.Name}</b>}
                            subheader={x.Email}
                          />
                        </Cardstyled>
                      </td>
                      <td>{x.Company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
            <Grid item xs={12} sm={6}>
              <EditCard>
                <div className="profileicons">
                  <StyledAvatar
                    dynamiccolor={this.fetchColor(this.state.curuser.id)}
                  >
                    {" "}
                    {this.state.curuser.Name.split(" ").length > 1
                      ? this.state.curuser.Name.split(" ")[0]
                          .charAt(0)
                          .toUpperCase() +
                        this.state.curuser.Name.split(" ")[1]
                          .charAt(0)
                          .toUpperCase()
                      : this.state.curuser.Name.charAt(0).toUpperCase()}
                  </StyledAvatar>{" "}
                  <div className="pencilprofile">
                    <EditIcon
                      fontSize="small"
                      onClick={() => {
                        this.editCnct();
                      }}
                    />
                  </div>
                </div>
                <div className="profile">
                  <span>{this.state.curuser.Name}</span>

                  <span>{this.state.curuser.Description}</span>
                </div>

                <div className="editroot">
                  <table>
                    <tbody>
                      <tr className="editdet">
                        <td>Full Name</td>
                        <td>{this.state.curuser.Name}</td>
                      </tr>
                      <tr className="editdet">
                        <td>Email:</td>
                        <td>{this.state.curuser.Email}</td>
                      </tr>
                      <tr className="editdet">
                        <td>Phone </td>
                        <td>{this.state.curuser.Phone_Number}</td>
                      </tr>
                      <tr className="editdet">
                        <td>Company:</td>
                        <td>{this.state.curuser.Company}</td>
                      </tr>
                      <tr className="editdet">
                        <td>Address:</td>
                        <td>{this.state.curuser.Address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </EditCard>

              <div className="ownerdiv">
                <OwnerCard>
                  <CardHeader
                    avatar={
                      <FontAwesomeIcon
                        icon={faBalanceScaleLeft}
                        className="balancestyle"
                      />
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon className="iconrotate" />
                      </IconButton>
                    }
                    title={<b>Tax Evasion & Payout Notice</b>}
                    subheader={this.getDateTime()}
                  />
                </OwnerCard>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default App;
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textsearch: {
    height: 30,
    color: "pink"
  }
});

const Cardstyled = withStyles({
  root: {
    backgroundColor: (props) => (props.selected ? "#dbe9f1" : "white"),
    maxWidth: 3000,
    boxShadow: "none"
  }
})(Card);
const OwnerCard = withStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "#e1e3e1",
    boxShadow: "none",
    maxWidth: "80%"
  }
})(Card);
const EditCard = withStyles({
  root: {
    backgroundColor: "#e1e3e1",
    boxShadow: "none",
    maxWidth: "80%"
  }
})(Card);
const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 37,
    padding: "0 30px",
    marginLeft: "15px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);
const StyledAvatar = withStyles({
  root: {
    backgroundColor: (props) =>
      props.dynamiccolor ? props.dynamiccolor : "grey"
  }
})(Avatar);

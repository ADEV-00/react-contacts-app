import React from "react";
import { Route } from "react-router-dom";
import { Component } from "react";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  };

  CreateContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }));
    });
  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
          )}
        />

        <Route
          exac
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.CreateContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;

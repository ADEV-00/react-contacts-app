import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

//Stateless Functional Component
//Using this when all the component needs is a render method
//In stateless functional component dont need to use ".this"
class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    //Object Destructuring
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy("name"));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={this.state.query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link to="/create" className="add-contact">
            Add Contact Here
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}

        <ol className="contact-list">
          {/* Looping all in contact array and displaying */}
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;

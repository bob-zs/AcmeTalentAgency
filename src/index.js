import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store, { fetchClients, fetchSkills, fetchClientSkills } from './store';

const App = connect(
  state => state, // component now has access to the state as props
  dispatch => {
    return {
      loadData: () => {
        dispatch(fetchClients()); // fetchClients is a thunk, so it returns a function, which is then dispatched
        dispatch(fetchSkills());
        dispatch(fetchClientSkills());
      }
    }
  }
)(class App extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    const { clients, skills, clientSkills } = this.props; // this is a lifecycle method? He said
    return (
      <div>
        <h1>Acme Talent Agency</h1>
        <main>
          <ul>
            {
              clients.map(client => {
                const count = clientSkills.filter(clientSkill => clientSkill.clientId === client.id).length;
                return (
                  <li key={ client.id }>
                    { client.name } ({ count })
                  </li>
                );
            })
            }
          </ul>
          <ul>
            {
              skills.map(skill => {
                const count = clientSkills.filter(clientSkill => clientSkill.skillId === skill.id).length;
                return (
                  <li key={skill.id}>
                    { skill.name } ({ count })
                  </li>
                );
              })
            }
          </ul>
        </main>
      </div>
    );
  }
});

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><App /></Provider>);
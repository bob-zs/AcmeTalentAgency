import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ clients, skills, clientSkills }) => {
  return (
    <main>
      <ul>
        {
          clients.map(client => {
            const count = clientSkills.filter(clientSkill => clientSkill.clientId === client.id).length;
            return (
              <li key={ client.id }>
                <Link to={`/clients/${client.id}`}>
                  { client.name } ({ count })
                </Link>
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
  );
}


export default connect( state => state )(Home);
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';


const clientsReducer = (state = [], action) => {
  if(action.type === 'SET_CLIENTS') {
    return action.clients;
  }
  return state;
}

const skillsReducer = (state = [], action) => {
  if(action.type === 'SET_SKILLS') {
    return action.skills;
  }
  return state;
}

const clientSkillsReducer = (state = [], action) => {
  if(action.type === 'SET_CLIENT_SKILLS') {
    return action.clientSkills;
  }
  return state;
}



const reducer = combineReducers({
  clients: clientsReducer, // oh these are mini stores, they are state reducers. and each one is an array
  skills: skillsReducer,
  clientSkills: clientSkillsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export const fetchClients = () => { // returns an async function, which that async function dispatches an action
  return async(dispatch) => { // async function
    const clients = (await axios.get('/api/clients')).data;
    dispatch({ type: 'SET_CLIENTS', clients });
  }
}

export const fetchSkills = () => {
  return async(dispatch) => {
    const skills = (await axios.get('/api/skills')).data;
    dispatch({ type: 'SET_SKILLS', skills });
  }
}

export const fetchClientSkills = () => {
  return async(dispatch) => {
    const clientSkills = (await axios.get('/api/clientSkills')).data;
    dispatch({ type: 'SET_CLIENT_SKILLS', clientSkills });
  }
}

export default store;
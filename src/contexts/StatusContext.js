import { createContext, useReducer, useEffect } from 'react';

export const StatusContext = createContext();

export const statusReducer = (state, action) => {

  switch (action.type) {
    case 'SET_STATUS':
      return { status: action.payload };
    default:
      return state;
  }

};

export const StatusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statusReducer, {
    status: {
      settingsCondition: 0,
      board: null,
      players: [],
      messages:[],
      tempMessages:[]
    }
  })

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem('status'));
    console.log('StatusContextProvider status in useEffect: ');
    console.log(status);

    if (status) {

      dispatch({ type: 'SET_STATUS', payload: status });
    }
  }, []);

  /* console.log('StatusContext state is: ', state); */

  return (
    <StatusContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StatusContext.Provider>
  )

};
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from './context/AuthContext'


ReactDOM.render(
  <React.StrictMode>
    {/* wrap entire app in context provider so context API has access to all child components */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
)



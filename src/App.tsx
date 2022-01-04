import React, { FC } from 'react';
import HomePage from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;

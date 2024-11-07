import React from 'react';
import './main.css';
import Header from '../src/components/layouts/Header/Header';
import Footer from '../src/components/layouts/Footer/Footer';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <div className="app__content">
        <MainPage></MainPage>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

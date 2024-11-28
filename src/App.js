import React, {useState} from 'react';
import './main.css';
import Header from '../src/components/layouts/Header/Header';
import Footer from '../src/components/layouts/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Task from './components/Task/Task';
import ModalInfoTask from './components/ModalInfoTask/ModalInfoTask';

function App() {
  const [taskData, setTaskData] = useState(null);

  const handleSolve = () => {
      const data = collectInputData();
      setTaskData(data);
  };

  function collectInputData() {
    const labels = document.querySelectorAll(".modal-info-task__label");
    const inputs = document.querySelectorAll(".modal-info-task__input");

    const values = Array.from(labels).map((label, index) => {
        const input = inputs[index];
        return {
            name: label.textContent.split(':')[0].trim(),
            value: input ? +input.value : null,
        };
    });

    return values;
  }



  return (
    <div className="app">
      <Header></Header>
      <div className="app__content">
        <MainPage></MainPage>
        <HowItWorks></HowItWorks>
        <Task handleSolve={handleSolve} collectInputData={collectInputData} taskData={taskData}></Task>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

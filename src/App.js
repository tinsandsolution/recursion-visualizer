import logo from './logo.svg';
import './App.css';

function App() {
  // a variable that will be used in the return statement
  // it is simply an html that will take up half the page
  const halfPage = <div className="half-page">hey</div>;
  const displayRecursion = <div className="half-page">hey</div>

  return (
    <div className="main">
      {halfPage}
      {displayRecursion}
    </div>
  );
}

export default App;

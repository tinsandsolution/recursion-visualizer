import React, { useState } from 'react';
import './App.css';

function App() {
  const [initialData, setInitialData] = useState("1, 2, 3, 4, 5");
  const [baseCase, setBaseCase] = useState('if (inputArray.length === 0) return 0;');
  const [recursiveCall, setRecursiveCall] = useState('return arr[0] + recursiveCall(arr.slice(1));');

  const turnIntoArray = (rawDataString) => {
    const rawDataArray = rawDataString.split(',');
    // turns that array into a string that looks like [1,2,3,4,5]
    const dataString = `[${rawDataArray}]`;

    return dataString;
  }

  const waitingToReturn = (rawDataString) => {
    // regex that gets everything in the string after "return" and before ";"

    const regex = /(?<=return).*/;

    // then applies that regex to the string
    const codeline = String(rawDataString.match(regex))

    let hackyIndexing = "dasd"

    //regex that gets everything in the string before "recursiveCall"
    const regex2 = /.*(?=recursiveCall)/;




    return codeline.match(regex2);

  }

  const halfPage = (
    <div className="half-page">
      <h1>Code</h1>
      <h2>Input</h2>
        <textarea
          className='code-input'
          value={initialData}
          onChange={(e) => setInitialData(e.target.value)}
        >
        </textarea>
      <h2>Base Case</h2>
        <textarea
          className='code-input'
          value={baseCase}
          onChange={(e) => setBaseCase(e.target.value)}
        >
          if (inputArray.length === 0) return 0;
        </textarea>
      <h2>Recursive Call</h2>
        <textarea
          className='code-input'
          value={recursiveCall}
          onChange={(e) => setRecursiveCall(e.target.value)}
        >
          return arr[0] + recursiveCall(arr.slice(1));
        </textarea>
    </div>
  )
  const displayRecursion = (
    <div className="half-page">
      <h1>Visualizer</h1>
      <h2>Layer 1</h2>
      inputArray is {turnIntoArray(initialData)} <br />
      we are waiting to return {waitingToReturn(recursiveCall)} <br />
    </div>
  )

  return (
    <div className="main">
      {halfPage}
      {displayRecursion}
    </div>
  );
}

export default App;

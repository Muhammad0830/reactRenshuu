import { use } from "react";
import { useState, useEffect } from "react";

const Button = ({ onclick, text }) => {
  return <button onClick={onclick}>{text}</button>;
};

const StatisticLine = ({ text, variable }) => {
  return (
    <table>
      <tr>
        <td>{text}</td>
        <td>{variable}</td>
      </tr>
    </table>
  );
};

const Statistics = ({ good, neutral, bad, all, positive }) => {
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text={"good"} variable={good} />
      <StatisticLine text={"neutral"} variable={neutral} />
      <StatisticLine text={"bad"} variable={bad} />
      <StatisticLine text={"all"} variable={all} />{" "}
      {all === 0 ? (
        <p>no feedback given</p>
      ) : (
        <StatisticLine text={"positive"} variable={positive} />
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    if (good == 0) setPositive(0);
    else setPositive(((good / all) * 100).toFixed(2));
  }, [all]);

  const handleGoodBtn = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAll(updatedGood + neutral + bad);
  };

  const handleNeutralBtn = () => {
    const updatedneutral = neutral + 1;
    setNeutral(updatedneutral);
    setAll(good + updatedneutral + bad);
  };
  const handleBadBtn = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(good + neutral + updatedBad);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onclick={handleGoodBtn} text={"good"} />
      <Button onclick={handleNeutralBtn} text={"neutral"} />
      <Button onclick={handleBadBtn} text={"bad"} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        positive={positive}
      />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import iconDollar from "../src/images/icon-dollar.svg";
import iconPerson from "../src/images/icon-person.svg";

function App() {
  const [bill, setBill] = useState<number | null>(null);
  const [people, setPeople] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);

  const [peopleError, setPeopleError] = useState(false);

  const allRight = bill !== null && people !== null && tip !== null;
  const tipAmount = allRight ? ((bill * tip) / people).toFixed(2) : "0.00";
  const totalPerPerson = allRight
    ? ((bill + bill * tip) / people).toFixed(2)
    : "0.00";
  const showTip = !isNaN(parseFloat(tipAmount));
  const showTotal = !isNaN(parseFloat(totalPerPerson));

  useEffect(() => {
    if (people === 0) {
      setPeopleError(true);
    } else {
      setPeopleError(false);
    }
  }, [people]);

  function handleReset() {
    setBill(null);
    setPeople(null);
    setTip(null);
  }

  return (
    <div className="site -wrapper">
      <h1 className="title-h1">
        <span>spli</span>
        <br />
        <span>tter</span>
      </h1>
      <div className="app">
        <div className="inputs">
          <label htmlFor="bill">Bill</label>
          <div className="input-icons">
            <div className="icon">
              <img src={iconDollar} alt="" />
            </div>
            <input
              className="input-field"
              type="number"
              id="bill"
              value={bill !== null ? bill.toString() : ""}
              onChange={(e) => setBill(parseFloat(e.target.value))}
            />
          </div>
          <h4>Select Tip %</h4>
          <div className="buttons">
            <button className="tip-Perc-btn" onClick={() => setTip(0.05)}>
              5%
            </button>

            <button className="tip-Perc-btn" onClick={() => setTip(0.1)}>
              10%
            </button>

            <button className="tip-Perc-btn" onClick={() => setTip(0.15)}>
              15%
            </button>

            <button className="tip-Perc-btn" onClick={() => setTip(0.25)}>
              25%
            </button>

            <button className="tip-Perc-btn" onClick={() => setTip(0.5)}>
              50%
            </button>
            <input
              className="custom-inp"
              type="number"
              min={0}
              max={100}
              placeholder="Custom"
              id="custom"
              value={tip !== null ? (tip * 100).toString() : ""}
              onChange={(e) => setTip(parseFloat(e.target.value) / 100)}
            />
          </div>
          <label htmlFor="people">Number Of People:</label>
          <div className="input-icons">
            <div className="icon">
              <img src={iconPerson} alt="" />
            </div>
            <input
              className="input-field"
              min={0}
              type="number"
              value={people !== null ? people.toString() : ""}
              id="people"
              onKeyDown={(e) => {
                if (e.key === ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setPeople(Math.trunc(parseFloat(e.target.value)))
              }
            />
          </div>
          <div>{peopleError ? "Can't be zero" : ""}</div>
        </div>
        <div className="result-display">
          <div className="dipslays">
            <div className="tip-displ">
              <p>
                Tip amount
                <br />
                <span className="tip-displ-person">/ person</span>
              </p>
              <p className="tip-displ-amount">
                ${showTip ? tipAmount : "0.00"}
              </p>
            </div>
            <div className="tip-displ">
              <p>
                Total
                <br />
                <span className="tip-displ-person">/ person</span>
              </p>
              <p className="tip-displ-amount">
                ${showTotal ? totalPerPerson : "0.00"}
              </p>
            </div>
          </div>
          <button className="reset-btn" onClick={handleReset}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

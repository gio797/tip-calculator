import { useEffect, useState } from "react";

function App() {
  const [bill, setBill] = useState<number | null>(null);
  const [people, setPeople] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);

  const [peopleError, setPeopleError] = useState(false);

  const allRight = bill !== null && people !== null && tip !== null;
  const tipAmount = allRight ? ((bill! * tip!) / people!).toFixed(2) : "0.00";
  const totalPerPerson = allRight
    ? ((bill! + bill! * tip!) / people!).toFixed(2)
    : "0.00";
  const showTip =
    !isNaN(parseFloat(tipAmount)) && isFinite(parseFloat(tipAmount));
  const showTotal =
    !isNaN(parseFloat(totalPerPerson)) && isFinite(parseFloat(totalPerPerson));

  useEffect(() => {
    if (people === 0) {
      setPeopleError(true);
    } else {
      setPeopleError(false);
    }
  }, [people]);

  return (
    <div className="">
      bill:
      <input
        type="number"
        placeholder="bill"
        name="bill"
        value={bill !== null ? bill.toString() : ""}
        onChange={(e) => setBill(parseFloat(e.target.value))}
      />
      <div className="buttons">
        <button onClick={() => setTip(0.05)}>5%</button>

        <button onClick={() => setTip(0.1)}>10%</button>

        <button onClick={() => setTip(0.15)}>15%</button>

        <button onClick={() => setTip(0.25)}>25%</button>

        <button onClick={() => setTip(0.5)}>50%</button>
        <input
          type="number"
          min={0}
          max={100}
          placeholder="custom"
          name="custom"
          value={tip !== null ? (tip * 100).toString() : ""}
          onChange={(e) => setTip(parseFloat(e.target.value) / 100)}
        />
      </div>
      People:
      <input
        min={0}
        type="number"
        value={people !== null ? people.toString() : ""}
        name="people"
        placeholder="number of people"
        onKeyDown={(e) => {
          if (e.key === ".") {
            e.preventDefault();
          }
        }}
        onChange={(e) => setPeople(Math.trunc(parseFloat(e.target.value)))}
      />
      <div>{peopleError ? "Can't be zero" : ""}</div>
      <div>Tip amount / person ${showTip ? tipAmount : "0.00"}</div>
      <div>Total / person ${showTotal ? totalPerPerson : "0.00"}</div>
    </div>
  );
}

export default App;

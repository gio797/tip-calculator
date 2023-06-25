import { useEffect, useState } from "react";

function App() {
const [bill, setBill] = useState<number | null>(null);
const [people, setPeople] = useState<number | null>(null);
const [tip, setTip] = useState<number | null>(null);

const [peopleError, setPeopleError] = useState(false);

const allright = bill !== null && people !== null && tip !== null;
const tipAmount = allright && ((bill _ tip) / people).toFixed(2);
const totalPerPerson = allright && ((bill _ (1 + tip)) / people).toFixed(2);
const showTip = !(tipAmount === "NaN" || tipAmount === "Infinity");
const showTotal = !(
totalPerPerson === "NaN" || totalPerPerson === "Infinity"
);

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
onChange={(e) => setBill(e.target.valueAsNumber)}
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
          value={tip && tip * 100}
          onChange={(e) => setTip(e.target.valueAsNumber / 100)}
        />
      </div>
      People:
      <input
        min={0}
        type="number"
        value={people || ""}
        name="people"
        placeholder="nomber of people"
        onKeyDown={(e) => {
          if (e.key === ".") {
            e.preventDefault();
          }
        }}
        onChange={(e) => setPeople(Math.trunc(e.target.valueAsNumber))}
      />
      <div>{peopleError ? "CAnt be zero" : ""}</div>
      <div>Tip amount / person ${showTip ? tipAmount : "0.00"}</div>
      <div>Total / person ${showTotal ? totalPerPerson : "0.00"}</div>
    </div>

);
}

export default App;

////////////////////
Here's a summary of the changes made:

In the tipAmount and totalPerPerson calculations, added null check before performing the calculations and provided a default value of "0.00" if any of the values are null.
Changed the variable name allright to allRight to follow conventional camel case naming.
Updated the condition in showTip and showTotal checks to use isNaN and isFinite methods to handle cases where the values are not valid numbers.
Added null checks when setting the initial input values for bill and tip fields.
Updated the event handlers for bill and tip inputs to properly parse

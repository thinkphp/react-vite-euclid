import './App.css';

import React, { useState } from 'react';
import './App.css';

function App() {
    // Declare state variables for the two numbers and the GCD result
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [gcd, setGcd] = useState(null);

    // Euclid's algorithm to calculate GCD
    const calculateGCD = (a, b) => {
        // Ensure that we are dealing with positive integers
        a = Math.abs(a);
        b = Math.abs(b);

        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    // Handle input change for 'a'
    const handleAChange = (event) => {
        setA(event.target.value);
    };

    // Handle input change for 'b'
    const handleBChange = (event) => {
        setB(event.target.value);
    };

    // Handle the click event for calculating the GCD
    const handleCalculate = () => {
        if (a && b) {
            const result = calculateGCD(Number(a), Number(b));
            setGcd(result);
        }
    };

    return (
        <div className="App">
            <h1>GCD Calculator (Euclid's Algorithm)</h1>
            <div>
                <input
                    type="number"
                    value={a}
                    onChange={handleAChange}
                    placeholder="Enter number a"
                />
                <input
                    type="number"
                    value={b}
                    onChange={handleBChange}
                    placeholder="Enter number b"
                />
            </div>
            <button onClick={handleCalculate}>Calculate GCD</button>
            {gcd !== null && <p>The GCD of {a} and {b} is: {gcd}</p>}
        </div>
    );
}

export default App;

import { useState } from 'react';
import './App.css';

const calculateGcd = (first, second) => {
    let a = Math.abs(first);
    let b = Math.abs(second);
    const steps = [];

    while (b !== 0) {
        const quotient = Math.floor(a / b);
        const remainder = a % b;
        steps.push({ dividend: a, divisor: b, quotient, remainder });
        [a, b] = [b, remainder];
    }

    return { value: a, steps };
};

function App() {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [calculation, setCalculation] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = (event) => {
        event.preventDefault();

        if (firstNumber === '' || secondNumber === '') {
            setError('Enter both numbers to calculate their GCD.');
            setCalculation(null);
            return;
        }

        const first = Number(firstNumber);
        const second = Number(secondNumber);

        if (!Number.isSafeInteger(first) || !Number.isSafeInteger(second)) {
            setError('Enter a whole number within the safe integer range.');
            setCalculation(null);
            return;
        }

        if (first === 0 && second === 0) {
            setError('The GCD of 0 and 0 is undefined. Try another pair.');
            setCalculation(null);
            return;
        }

        setError('');
        setCalculation({
            first,
            second,
            ...calculateGcd(first, second),
        });
    };

    const handleNumberChange = (setter) => (event) => {
        setter(event.target.value);
        setCalculation(null);
        setError('');
    };

    const tryExample = () => {
        setFirstNumber('252');
        setSecondNumber('105');
        setError('');
        setCalculation({
            first: 252,
            second: 105,
            ...calculateGcd(252, 105),
        });
    };

    return (
        <div className="site-shell">
            <header className="topbar">
                <a className="brand" href="#home" aria-label="Euclid home">
                    <span className="brand-mark" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                    </span>
                    <span>euclid<span className="brand-period">.</span></span>
                </a>
                <nav className="top-nav" aria-label="Main navigation">
                    <a href="#calculator">Calculator</a>
                    <a href="#method">The method</a>
                    <a className="nav-cta" href="#calculator">
                        Try it out <span aria-hidden="true">↘</span>
                    </a>
                </nav>
            </header>

            <main id="home">
                <section className="hero">
                    <div className="hero-copy">
                        <div className="eyebrow"><span /> A classic algorithm, made tangible</div>
                        <h1>Find the common<br />ground<span className="accent-dot">.</span></h1>
                        <p className="hero-description">
                            A tiny, interactive study of Euclid’s algorithm — a beautifully
                            simple way to find the greatest common divisor of two numbers.
                        </p>
                        <a className="text-link" href="#calculator">
                            Explore the calculator <span aria-hidden="true">↓</span>
                        </a>
                    </div>

                    <div className="hero-visual" aria-label="An example of Euclid’s algorithm">
                        <div className="visual-topline">
                            <span>EUCLID IN ACTION</span>
                            <span className="live-indicator"><i /> 2 NUMBERS</span>
                        </div>
                        <div className="number-pair">
                            <div><span className="number-label">NUMBER A</span><strong>252</strong></div>
                            <span className="pair-symbol">&</span>
                            <div><span className="number-label">NUMBER B</span><strong>105</strong></div>
                        </div>
                        <div className="visual-divider"><span /></div>
                        <div className="visual-equation">
                            <span className="equation-label">KEEP THE REMAINDER</span>
                            <div><b>252</b> <span>÷ 105</span> <span className="equation-equals">=</span> <b>2</b> <span>r</span> <b className="remainder">42</b></div>
                        </div>
                        <div className="visual-foot">
                            <span>Repeat until the remainder is zero.</span>
                            <span className="foot-arrow" aria-hidden="true">↗</span>
                        </div>
                        <div className="visual-orbit orbit-one" />
                        <div className="visual-orbit orbit-two" />
                    </div>
                </section>

                <section className="workspace" id="calculator">
                    <div className="section-heading">
                        <div>
                            <div className="eyebrow"><span /> YOUR TURN</div>
                            <h2>Let’s work it out.</h2>
                        </div>
                        <p>Enter two integers and follow every step<br className="desktop-break" /> to their greatest common divisor.</p>
                    </div>

                    <div className="calculator-layout">
                        <form className="calculator-card" onSubmit={handleCalculate} noValidate>
                            <div className="card-heading">
                                <div>
                                    <span className="card-kicker">GREATEST COMMON DIVISOR</span>
                                    <h3>Start with two numbers</h3>
                                </div>
                                <span className="card-index">01 — 02</span>
                            </div>

                            <div className="input-row">
                                <label className="number-field">
                                    <span>Number A</span>
                                    <input
                                        type="number"
                                        step="1"
                                        value={firstNumber}
                                        onChange={handleNumberChange(setFirstNumber)}
                                        placeholder="e.g. 252"
                                        aria-label="First integer"
                                    />
                                </label>
                                <span className="input-operator" aria-hidden="true">+</span>
                                <label className="number-field">
                                    <span>Number B</span>
                                    <input
                                        type="number"
                                        step="1"
                                        value={secondNumber}
                                        onChange={handleNumberChange(setSecondNumber)}
                                        placeholder="e.g. 105"
                                        aria-label="Second integer"
                                    />
                                </label>
                            </div>

                            <div className="form-actions">
                                <button className="calculate-button" type="submit">
                                    Calculate GCD <span aria-hidden="true">↗</span>
                                </button>
                                <button className="example-button" type="button" onClick={tryExample}>
                                    Try an example
                                </button>
                            </div>
                            {error && <p className="form-error" role="alert">{error}</p>}

                            {calculation && (
                                <div className="result-panel" aria-live="polite">
                                    <div>
                                        <span className="result-label">THE GREATEST COMMON DIVISOR</span>
                                        <p>GCD({calculation.first}, {calculation.second})</p>
                                    </div>
                                    <strong>{calculation.value}</strong>
                                </div>
                            )}
                        </form>

                        <aside className="method-card" id="method">
                            <div className="method-heading">
                                <span className="method-icon" aria-hidden="true">∴</span>
                                <span>THE EUCLIDEAN METHOD</span>
                            </div>
                            <h3>One remainder<br />at a time.</h3>
                            <p>
                                Divide the larger number by the smaller. Then repeat with
                                the divisor and the remainder. When the remainder reaches
                                zero, the last divisor is your answer.
                            </p>
                            <div className="method-rule" />
                            <div className="method-meta">
                                <span>TIME COMPLEXITY</span>
                                <code>O(log min(a, b))</code>
                            </div>
                            <div className="method-meta">
                                <span>ALSO KNOWN AS</span>
                                <span>Euclid’s algorithm</span>
                            </div>
                        </aside>
                    </div>

                    {calculation && (
                        <section className="steps-card" aria-live="polite">
                            <div className="steps-header">
                                <div>
                                    <span className="card-kicker">THE WORK, SHOWN</span>
                                    <h3>Follow the remainders</h3>
                                </div>
                                <span className="steps-count">
                                    {calculation.steps.length === 0
                                        ? 'Already at the answer'
                                        : `${calculation.steps.length} ${calculation.steps.length === 1 ? 'step' : 'steps'}`}
                                </span>
                            </div>
                            {calculation.steps.length > 0 ? (
                                <ol className="step-list">
                                    {calculation.steps.map((step, index) => (
                                        <li className="step-row" key={`${step.dividend}-${step.divisor}-${index}`}>
                                            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="step-equation">
                                                {step.dividend} <span>÷</span> {step.divisor}
                                                <span className="step-equals">=</span> {step.quotient}
                                                <span className="step-remainder">remainder</span>
                                                <b>{step.remainder}</b>
                                            </span>
                                            {step.remainder === 0 && (
                                                <span className="last-divisor">last divisor</span>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="zero-step-note">
                                    One number is already zero, so the absolute value of the other is the GCD.
                                </p>
                            )}
                        </section>
                    )}
                </section>
            </main>

            <footer className="footer">
                <a className="brand footer-brand" href="#home">
                    <span className="brand-mark" aria-hidden="true">
                        <span /><span /><span /><span />
                    </span>
                    <span>euclid<span className="brand-period">.</span></span>
                </a>
                <span>A small exercise in elegant problem-solving.</span>
                <span className="footer-right">BUILT WITH CURIOSITY <span>✳</span></span>
            </footer>
        </div>
    );
}

export default App;

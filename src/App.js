import { useState } from "react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [breakdown, setBreakdown] = useState(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;

    if (
      isNaN(price) ||
      isNaN(down) ||
      isNaN(rate) ||
      isNaN(term) ||
      price <= 0 ||
      down < 0 ||
      rate < 0 ||
      term <= 0 ||
      down > price
    ) {
      setBreakdown(null);
      return;
    }

    const principal = price - down;

    const mortgagePayment =
      rate === 0
        ? principal / term
        : (principal * rate) / (1 - Math.pow(1 + rate, -term));

    const propertyTax = (price * 0.0125) / 12;
    const homeownersInsurance = 130;
    const totalPayment = mortgagePayment + propertyTax + homeownersInsurance;

    setBreakdown({
      mortgagePayment: +mortgagePayment.toFixed(2),
      propertyTax: +propertyTax.toFixed(2),
      homeownersInsurance: +homeownersInsurance.toFixed(2),
      total: +totalPayment.toFixed(2),
    });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Mortgage Calculator
      </h2>

      <label>Home Price ($)</label>
      <input
        type="number"
        value={homePrice}
        onChange={(e) => setHomePrice(e.target.value)}
        placeholder="e.g. 300000"
        style={inputStyle}
      />

      <label>Down Payment ($)</label>
      <input
        type="number"
        value={downPayment}
        onChange={(e) => setDownPayment(e.target.value)}
        placeholder="e.g. 60000"
        style={inputStyle}
      />

      <label>Interest Rate (%)</label>
      <input
        type="number"
        step="0.01"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        placeholder="e.g. 6.5"
        style={inputStyle}
      />

      <label>Loan Term (years)</label>
      <input
        type="number"
        value={loanTerm}
        onChange={(e) => setLoanTerm(e.target.value)}
        placeholder="e.g. 30"
        style={inputStyle}
      />

      <button onClick={calculateMortgage} style={buttonStyle}>
        Calculate
      </button>

      {breakdown && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
            Monthly Payment Breakdown
          </h3>
          <ul style={{ listStyleType: "none", padding: 0, lineHeight: "1.8" }}>
            <li>
              <strong>Principal & Interest:</strong> $
              {breakdown.mortgagePayment}
            </li>
            <li>
              <strong>Property Tax:</strong> ${breakdown.propertyTax}
            </li>
            <li>
              <strong>Homeowners Insurance:</strong> $
              {breakdown.homeownersInsurance}
            </li>
            <li style={{ marginTop: "10px", fontWeight: "bold" }}>
              Total: ${breakdown.total} /mo
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0 20px 0",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "white",
  fontSize: "1rem",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

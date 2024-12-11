import React, { useState } from "react";

const Erc20TokenSupply = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState(null);
  const [error, setError] = useState(null);

  const fetchTokenSupply = async () => {
    try {
      setError(null);
      setTotalSupply(null);

      const apiKey = process.env.REACT_APP_API_KEY; // Replace with your Etherscan API key
      const apiUrl = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== "1") {
        throw new Error(data.result || "Failed to fetch token supply");
      }

      setTotalSupply(data.result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Get ERC20 Token Total Supply</h1>
      <input
        type="text"
        placeholder="Enter ERC20 Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button
        onClick={fetchTokenSupply}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Fetch Total Supply
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {totalSupply && (
        <div style={{ marginTop: "20px" }}>
          <h2>Total Supply</h2>
          <p>{totalSupply}</p>
        </div>
      )}
    </div>
  );
};

export default Erc20TokenSupply;
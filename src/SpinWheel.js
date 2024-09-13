import React, { useState } from 'react';
import './SpinWheel.css';

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);

  const prizes = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Try Again', 'Jackpot'];

  const spin = () => {
    setIsSpinning(true);
    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const randomPrize = prizes[randomPrizeIndex];

    // Set spinning and reset after 3 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setPrize(randomPrize);
    }, 3000); // Spin for 3 seconds
  };

  return (
    <div className="spin-wheel-container">
      <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
        {prizes.map((prize, index) => (
          <div key={index} className="wheel-segment" style={{ '--index': index }}>
            {prize}
          </div>
        ))}
      </div>
      <button onClick={spin} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'SPIN'}
      </button>
      {prize && <h2>You won: {prize}</h2>}
    </div>
  );
};

export default SpinWheel;

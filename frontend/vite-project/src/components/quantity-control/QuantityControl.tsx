import React from 'react';

interface QuantityControlProps {
  counter: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled: boolean;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ counter, onIncrement, onDecrement, disabled }) => {
  return (
    <div className="w-24 h-11 flex items-center justify-between border border-black p-2.5">
      <button onClick={onDecrement} disabled={disabled}>-</button>
      <span>{counter}</span>
      <button onClick={onIncrement} disabled={disabled}>+</button>
    </div>
  );
};

export default QuantityControl;

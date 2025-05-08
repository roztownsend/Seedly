interface QuantityControlProps {
    counter: number;
    onIncrement: () => void;
    onDecrement: () => void;
    disableDecrement?: boolean;
  }
  
  export const QuantityControl: React.FC<QuantityControlProps> = ({
    counter,
    onIncrement,
    onDecrement,
    disableDecrement = false,
  }) => {
    return (
      <div className="w-24 h-11 flex items-center justify-between border border-black p-2.5">
        <button onClick={onDecrement} disabled={disableDecrement}>-</button>
        <span>{counter}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  };
  
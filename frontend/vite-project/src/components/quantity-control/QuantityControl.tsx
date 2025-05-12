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
      <div className="flex gap-3 items-center justify-between border border-black px-3 py-1">
        <button onClick={onDecrement} disabled={disableDecrement}>-</button>
        <span>{counter}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  };
  
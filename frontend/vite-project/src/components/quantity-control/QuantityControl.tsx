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
      <div className="quantity-control">
        <button onClick={onDecrement} disabled={disableDecrement}>-</button>
        <span>{counter}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  };
  
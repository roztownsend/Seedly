import { useState } from "react";
import ProductCardCheckOut from "./ProductCardCheckOut";
import ProductCardCart from "./ProductCardCart";
import ProductCard from "./ProductCard";

const Sample = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      imageUrl: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg",
      seedName: "Banana",
      price: 10,
      quantity: 10
    },
    {
      id: 2,
      imageUrl: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      seedName: "Tomato",
      price: 12,
      quantity: 5
    }
  ]);

  const handleRemove = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div>
        <ProductCard imageUrl={"https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} seedName={"Banana"} price={10} quantity={10} />
        
        {products.map(product => (
        <ProductCardCart
          key={product.id}
          imageUrl={product.imageUrl}
          seedName={product.seedName}
          price={product.price}
          quantity={product.quantity}
          onRemove={() => handleRemove(product.id)}
        />
        ))}     

        {products.map(product => (
        <ProductCardCheckOut
          key={product.id}
          imageUrl={product.imageUrl}
          seedName={product.seedName}
          price={product.price}
          quantity={product.quantity}
          onRemove={() => handleRemove(product.id)}
        />
      ))}    
    </div>
  )
}

export default Sample

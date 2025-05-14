import { useEffect, useState } from 'react';
import { HeroProps } from '../../types/types';
import axios from 'axios';
import ProductCard from '../card-component/ProductCard';
import Hero from '../hero/Hero';

interface Plant {
  id: string;
  product_name: string;
  cycle: 'Annual' | 'Perennial';
  image_url: string;
  price: number;
  edible: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const GridHome = ({ heading, subheading }: HeroProps) => {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [displayedPlants, setDisplayedPlants] = useState<Plant[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useIsMobile();
  const loadStep = isMobile ? 3 : 8;

  useEffect(() => {
    axios.get<{ data: any[] }>('http://localhost:5000/plants')
      .then(response => {
        const normalized: Plant[] = response.data.data.map((plant) => ({
          ...plant,
          edible: plant.isedible === true || plant.isedible === 'true',
        }));

        setAllPlants(normalized);
        setDisplayedPlants(normalized.slice(0, loadStep));
        setShowMore(normalized.length > loadStep);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
        setError('Failed to load plant data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadStep]);

  const handleShowMore = () => {
    const nextPlants = allPlants.slice(0, displayedPlants.length + loadStep);
    setDisplayedPlants(nextPlants);
    setShowMore(nextPlants.length < allPlants.length);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-gray-100">
      <Hero 
        heading={heading}
        subheading={subheading}
        imageUrl={''}
      />
        
      <section>
        <div className="w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {displayedPlants.map((plant) => (
            <div key={plant.id} className="mx-auto">
              <ProductCard
                item={{
                  id: plant.id,
                  product_name: plant.product_name,
                  price: plant.price,
                  image_url: plant.image_url
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {showMore && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={handleShowMore} 
            className="button-primary"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default GridHome;

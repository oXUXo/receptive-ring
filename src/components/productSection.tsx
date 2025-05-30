import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Industrial Bearings",
    category: "industrial",
    description: "High-performance ceramic bearings for extreme temperature applications.",
    image: "https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Thermal Insulators",
    category: "technical",
    description: "Advanced thermal insulation ceramics for aerospace and energy sectors.",
    image: "https://images.pexels.com/photos/5726810/pexels-photo-5726810.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Wear Components",
    category: "industrial",
    description: "Wear-resistant ceramic components for manufacturing equipment.",
    image: "https://images.pexels.com/photos/5726822/pexels-photo-5726822.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Laboratory Crucibles",
    category: "technical",
    description: "High-purity ceramic crucibles for laboratory research and testing.",
    image: "https://images.pexels.com/photos/5726832/pexels-photo-5726832.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Custom Molded Parts",
    category: "custom",
    description: "Custom-designed ceramic components for specialized applications.",
    image: "https://images.pexels.com/photos/5726834/pexels-photo-5726834.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Electrical Insulators",
    category: "technical",
    description: "High-voltage ceramic insulators for electrical power systems.",
    image: "https://images.pexels.com/photos/5726813/pexels-photo-5726813.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const ProductsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Ceramic Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of high-performance industrial ceramic products designed for the most demanding applications.
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center mb-12 space-x-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              activeFilter === 'all' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
          >
            AL2O3
          </button>
          <button 
            onClick={() => setActiveFilter('industrial')}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              activeFilter === 'industrial' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
          >
            SiC
          </button>
          <button 
            onClick={() => setActiveFilter('technical')}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              activeFilter === 'technical' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
          >
            GO2
          </button>
          <button 
            onClick={() => setActiveFilter('custom')}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              activeFilter === 'custom' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
          >
            SiN
          </button>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <button className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-300 flex items-center">
                  View Details
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
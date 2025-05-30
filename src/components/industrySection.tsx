import React from 'react';

interface Industry {
  name: string;
  description: string;
  image: string;
}

const industries: Industry[] = [
  {
    name: "Aerospace",
    description: "High-performance ceramic components for turbine engines, thermal protection systems, and aircraft structures.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Energy",
    description: "Durable ceramics for power generation, including insulators, fuel cells, and components for harsh environments.",
    image: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Manufacturing",
    description: "Wear-resistant components for industrial machinery, including bearings, seals, and cutting tools.",
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Electronics",
    description: "Precision ceramic substrates and insulators for electronic components and semiconductor manufacturing.",
    image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Medical",
    description: "Biocompatible ceramics for medical implants, surgical tools, and diagnostic equipment.",
    image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Defense",
    description: "Ballistic ceramics and specialized components for defense applications and equipment.",
    image: "https://images.pexels.com/photos/163467/war-desert-guns-gunshow-163467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const IndustriesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our ceramic solutions are utilized across a wide range of industries where performance under extreme conditions is essential.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-md h-80"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img 
                  src={industry.image} 
                  alt={industry.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                <p className="text-gray-200 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {industry.description}
                </p>
                <button className="mt-4 text-white font-medium flex items-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Learn More
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
      </div>
    </section>
  );
};

export default IndustriesSection;
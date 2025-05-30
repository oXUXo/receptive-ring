import { type FC } from 'react';
import { Shield, Zap, BarChart3, Atom } from 'lucide-react';
import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Superior Durability",
    description: "Our ceramics maintain structural integrity in the harshest environments, offering exceptional wear resistance and longevity.",
    icon: <Shield className="w-8 h-8 text-gray-900" />
  },
  {
    title: "Thermal Stability",
    description: "Engineered to perform consistently across extreme temperature ranges, from cryogenic to over 1600°C.",
    icon: <Zap className="w-8 h-8 text-gray-900" />
  },
  {
    title: "Precision Engineering",
    description: "Manufactured to exact specifications with tight tolerances for critical applications where accuracy matters.",
    icon: <BarChart3 className="w-8 h-8 text-gray-900" />
  },
  {
    title: "Material Innovation",
    description: "Continuous research into advanced ceramic compositions for next-generation industrial applications.",
    icon: <Atom className="w-8 h-8 text-gray-900" />
  }
];

const FeaturesSection: FC = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
     
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <HoverBorderGradient
              key={index}
              containerClassName='rounded-full'
              className="bg-blue-50 p-4 group flex items-center gap-4"
            >
              <div className="transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
              {/* <p className="text-gray-600">{feature.description}</p> */}
            </HoverBorderGradient>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
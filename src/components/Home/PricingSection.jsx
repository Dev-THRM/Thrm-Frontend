import React from 'react';
import { motion } from 'framer-motion';

import starterPlan from '../../assets/starterplan.jpeg';
import growthPlan from '../../assets/growthplan.jpeg';
import scalePlan from '../../assets/scaleplan.jpeg';
import enterprisePlan from '../../assets/enterpriseplan.jpeg';
import customPlan from '../../assets/customplan.png';

const mainPlans = [
  { name: 'Starter Plan', image: starterPlan },
  { name: 'Growth Plan', image: growthPlan },
  { name: 'Scale Plan', image: scalePlan },
  { name: 'Enterprise Plan', image: enterprisePlan },
];

export default function PricingSection() {
  return (
    <section className="py-24 px-4 lg:px-10 max-w-[1920px] w-full mx-auto text-center" id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
          Our Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Plans</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Choose the right plan to fuel your digital growth.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12 w-full mx-auto mt-8">
        {/* Row 1: 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {mainPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <a href="https://api.whatsapp.com/send/?phone=919004500657&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img 
                  src={plan.image} 
                  alt={plan.name} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Custom Plan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
        >
          <a href="https://api.whatsapp.com/send/?phone=919004500657&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img 
              src={customPlan} 
              alt="Custom Plan" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

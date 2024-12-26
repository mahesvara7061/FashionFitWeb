import React, { Suspense, lazy } from 'react';

// Lazy load components to optimize performance
const Hero = lazy(() => import('../components/Hero'));
const LatestCollection = lazy(() => import('../components/LatestCollection'));
const BestSeller = lazy(() => import('../components/BestSeller'));
const OurPolicy = lazy(() => import('../components/OurPolicy'));
const NewsletterBox = lazy(() => import('../components/NewsletterBox'));

const Home = () => {
  return (
    <div className="home-container">
      {/* Suspense fallback for lazy-loaded components */}
      <Suspense fallback={<div className="text-center py-10">Loading Hero...</div>}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading Latest Collection...</div>}>
        <LatestCollection />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading Best Seller...</div>}>
        <BestSeller />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading Our Policy...</div>}>
        <OurPolicy />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading Newsletter Box...</div>}>
        <NewsletterBox />
      </Suspense>
      
    </div>
  );
};

export default Home;

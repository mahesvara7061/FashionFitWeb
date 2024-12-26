import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="w-full">
      {/* About Us Section */}
      <div className="text-3xl text-center pt-8 border-t">
        <Title text1="About" text2="Us" />
      </div>

      <div className="my-16 flex flex-col md:flex-row gap-12 md:gap-20">
        <img
          src={assets.about_img}
          alt="About us"
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
        />
        <div className="flex flex-col justify-center gap-8 md:w-2/3 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to <b className="text-gray-800">FashionFit</b> – the
            first-ever online store with virtual fitting rooms. We're here to
            revolutionize the way you shop for clothes. It's not just about
            fashion; it's about harnessing technology to bring you a seamless,
            personalized experience.
          </p>
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At FashionFit, we believe that everyone deserves to feel confident
            and beautiful in their outfits. Our mission is to make fashion
            accessible to all, regardless of size, shape, or preferences. We're
            dedicated to helping you find the perfect look with minimal effort.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-4xl text-center py-8">
        <Title text1="WHY" text2="CHOOSE US?" />
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Quality Assurance */}
        <div className="border px-8 md:px-12 py-8 flex flex-col gap-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Quality Assurance
          </h3>
          <p className="text-lg leading-relaxed">
            We ensure that every product we offer meets the highest quality
            standards. Shop with confidence, knowing that your satisfaction is
            our top priority.
          </p>
        </div>
        {/* Convenience */}
        <div className="border px-8 md:px-12 py-8 flex flex-col gap-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Convenience</h3>
          <p className="text-lg leading-relaxed">
            Discover your perfect outfit with just a few clicks on our intuitive
            platform. FashionFit simplifies your shopping journey like never
            before.
          </p>
        </div>
        {/* Customer Service */}
        <div className="border px-8 md:px-12 py-8 flex flex-col gap-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Exceptional Service
          </h3>
          <p className="text-lg leading-relaxed">
            Our team is here to provide you with unparalleled customer support.
            From fit advice to delivery assistance, we’re with you every step
            of the way.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;

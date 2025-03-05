import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About <span className="text-indigo-600">EliteFit</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Revolutionizing Fashion with Cutting-Edge Technology
          </p>
        </div>

        {/* Introduction Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to EliteFit
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                At EliteFit, we believe that fashion should be accessible, personalized, and effortless. Our mission is to redefine your shopping experience by combining the latest advancements in AI and machine learning with a curated collection of stylish, high-quality clothing.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Whether you're looking for the perfect fit or styling inspiration, EliteFit is here to make your journey seamless and enjoyable. Discover how our innovative technologies are transforming the way you shop for clothes.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Fashion Collection"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Our Advanced Technologies
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            EliteFit leverages state-of-the-art AI to deliver a personalized and seamless shopping experience.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Body Sizing and Shape Detection */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-indigo-600">
                Body Sizing and Shape Detection
              </h3>
              <p className="mt-4 text-gray-600">
                Finding the perfect fit has never been easier. With our advanced body sizing and shape detection tool, simply upload a clear, full-body photo, and our AI-powered system will analyze your measurements and body shape to recommend the best size for you.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>Accurate measurements for a perfect fit</li>
                <li>Personalized size recommendations</li>
                <li>No more guesswork—shop with confidence</li>
              </ul>
            </div>

            {/* Smart Outfit Recommendations */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-indigo-600">
                Smart Outfit Recommendations
              </h3>
              <p className="mt-4 text-gray-600">
                Elevate your style with our smart outfit recommendations. When you select an item, such as a black hoodie, our AI-powered system instantly suggests complementary pieces like jackets, jeans, or accessories to help you create the perfect outfit.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-600">
                <li>AI-driven styling suggestions</li>
                <li>Tailored to your style preferences</li>
                <li>Create cohesive looks effortlessly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            To empower you to express your unique style through personalized, high-quality fashion.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-indigo-600">Personalization</h3>
              <p className="mt-4 text-gray-600">
                We use AI to tailor your shopping experience, ensuring every recommendation fits your style and body type.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-indigo-600">Innovation</h3>
              <p className="mt-4 text-gray-600">
                Our cutting-edge technologies make shopping effortless, intuitive, and enjoyable.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-indigo-600">Sustainability</h3>
              <p className="mt-4 text-gray-600">
                We are committed to reducing waste and promoting sustainable fashion practices.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Experience the Future of Fashion
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join the EliteFit community today and discover a smarter, more personalized way to shop.
          </p>
          <div className="mt-8">
            <a
              href="/signup"
              className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
  

export default About

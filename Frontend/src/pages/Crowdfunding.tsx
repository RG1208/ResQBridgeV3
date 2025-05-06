import React from 'react';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';

const Crowdfunding: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Support Our Mission</h1>
            <div className="w-16 h-1 bg-red-500 mx-auto my-4"></div>
            <p className="mt-4 text-lg text-gray-600">
              Help us save more lives by supporting the development and deployment of ResQ-Bridge 
              emergency response systems across the country.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Target className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Our Goal</h3>
                    <p className="text-gray-600">$500,000 to implement ResQ-Bridge in 100 cities</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Supporters</h3>
                    <p className="text-gray-600">Join 2,500+ backers supporting this project</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <TrendingUp className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Progress</h3>
                    <p className="text-gray-600">65% of our goal reached</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-red-500 h-4 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Make a Contribution</h3>
              <div className="space-y-4">
                <button className="w-full py-4 px-6 bg-white rounded-lg border-2 border-gray-200 hover:border-red-500 transition-colors">
                  <div className="text-left">
                    <p className="text-xl font-semibold text-gray-900">$25</p>
                    <p className="text-gray-600">Supporter Package</p>
                  </div>
                </button>
                <button className="w-full py-4 px-6 bg-white rounded-lg border-2 border-gray-200 hover:border-red-500 transition-colors">
                  <div className="text-left">
                    <p className="text-xl font-semibold text-gray-900">$100</p>
                    <p className="text-gray-600">Bronze Sponsor</p>
                  </div>
                </button>
                <button className="w-full py-4 px-6 bg-white rounded-lg border-2 border-gray-200 hover:border-red-500 transition-colors">
                  <div className="text-left">
                    <p className="text-xl font-semibold text-gray-900">$500</p>
                    <p className="text-gray-600">Silver Sponsor</p>
                  </div>
                </button>
                <button className="w-full py-4 px-6 bg-white rounded-lg border-2 border-gray-200 hover:border-red-500 transition-colors">
                  <div className="text-left">
                    <p className="text-xl font-semibold text-gray-900">$1000</p>
                    <p className="text-gray-600">Gold Sponsor</p>
                  </div>
                </button>
              </div>
              <button className="mt-8 w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2" />
                Support Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Crowdfunding;
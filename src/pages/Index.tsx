
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  const handleGetStarted = () => {
    navigate(isLoggedIn ? "/dashboard" : "/signup");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nutriflow-light to-white py-20">
        <div className="nutriflow-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold text-nutriflow-dark leading-tight mb-4">
                Personalized Nutrition Made <span className="text-nutriflow-primary">Simple</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                NutriFlow uses AI to create personalized meal plans based on your unique preferences, dietary restrictions, and health goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGetStarted} 
                  className="bg-nutriflow-primary text-white hover:bg-nutriflow-dark px-8 py-6 text-lg"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img 
                src="/public/lovable-uploads/8fc18456-12ad-4143-9c3d-4b5aa0c2f3b0.png" 
                alt="Healthy meal plate" 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="nutriflow-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-nutriflow-dark mb-4">How NutriFlow Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes nutrition tracking and meal planning effortless while helping you reach your health goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="nutriflow-card flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-full bg-nutriflow-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nutriflow-primary"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Personalized Meal Plans</h3>
              <p className="text-gray-600">
                Tell us your dietary preferences, restrictions, and health goals, and our AI creates personalized meal plans just for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="nutriflow-card flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 rounded-full bg-nutriflow-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nutriflow-primary"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Easy Meal Tracking</h3>
              <p className="text-gray-600">
                Log your meals quickly with our intuitive interface and get instant feedback on your nutritional progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="nutriflow-card flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 rounded-full bg-nutriflow-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nutriflow-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Smart Analytics</h3>
              <p className="text-gray-600">
                Get insights into your nutrition habits with detailed analytics and suggestions to improve your diet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="nutriflow-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-nutriflow-dark mb-4">Simple Steps to Better Nutrition</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              NutriFlow makes it easy to stay on track with your nutrition goals in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-full bg-nutriflow-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Enter your dietary preferences, restrictions, and health goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-full bg-nutriflow-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Get Meal Plan</h3>
              <p className="text-gray-600">
                Our AI generates a personalized meal plan based on your profile.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 rounded-full bg-nutriflow-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Track Your Meals</h3>
              <p className="text-gray-600">
                Log what you eat and get real-time nutritional feedback.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 rounded-full bg-nutriflow-primary text-white flex items-center justify-center mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-nutriflow-dark mb-2">Improve Over Time</h3>
              <p className="text-gray-600">
                AI learns from your feedback to make better meal suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-20 bg-white">
        <div className="nutriflow-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-nutriflow-dark mb-4">Nutrition Tracking Made Simple</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              NutriFlow's intuitive interface makes it easy to monitor your nutrition and progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <img 
              src="/public/lovable-uploads/8312279a-4396-4e7f-9c07-b2aa7ad5fdca.png" 
              alt="Dashboard view" 
              className="rounded-xl shadow-lg w-full h-auto animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            />
            <img 
              src="/public/lovable-uploads/d5fe3217-ac49-41e9-a08b-f79b82274f2d.png" 
              alt="Meal planning screen" 
              className="rounded-xl shadow-lg w-full h-auto animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            />
            <img 
              src="/public/lovable-uploads/652d58ab-1360-46b8-9e22-9970db9441a2.png" 
              alt="Food logging interface" 
              className="rounded-xl shadow-lg w-full h-auto animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="nutriflow-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-nutriflow-dark mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their nutrition with NutriFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="nutriflow-card text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" className="inline-block">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "NutriFlow has completely changed how I approach my diet. The personalized meal plans make healthy eating so easy!"
              </p>
              <p className="font-semibold text-nutriflow-dark">Sarah M.</p>
            </div>

            {/* Testimonial 2 */}
            <div className="nutriflow-card text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" className="inline-block">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "I've lost 15 pounds in 3 months just by following NutriFlow's meal plans and tracking my food intake. Highly recommend!"
              </p>
              <p className="font-semibold text-nutriflow-dark">James K.</p>
            </div>

            {/* Testimonial 3 */}
            <div className="nutriflow-card text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" className="inline-block">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "As someone with multiple food allergies, NutriFlow has been a game-changer. The AI creates meal plans that are safe and delicious!"
              </p>
              <p className="font-semibold text-nutriflow-dark">Emily T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-nutriflow-primary to-nutriflow-accent py-16 text-white">
        <div className="nutriflow-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your nutrition?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have improved their health with personalized nutrition plans and tracking.
            </p>
            <Button 
              onClick={handleGetStarted} 
              className="bg-white text-nutriflow-primary hover:bg-nutriflow-light px-8 py-6 text-lg font-medium"
            >
              Get Started For Free
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

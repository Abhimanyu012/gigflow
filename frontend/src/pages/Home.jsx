import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Briefcase,
  Users,
  Zap,
  Shield,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Clock,
} from 'lucide-react';
import { Button, Card } from '../components/ui';
import heroIllustration from '../assets/images/hero-illustration.svg';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      icon: Briefcase,
      title: 'Post Gigs Easily',
      description: 'Create detailed gig postings in minutes and attract skilled freelancers.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Users,
      title: 'Find Top Talent',
      description: 'Browse bids from verified freelancers and hire the perfect match.',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Streamlined hiring process to get your projects done quickly.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with our secure payment system.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Freelancers', icon: Users },
    { value: '5K+', label: 'Completed Projects', icon: Award },
    { value: '99%', label: 'Client Satisfaction', icon: TrendingUp },
    { value: '24/7', label: 'Support Available', icon: Clock },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-grid-white/10 bg-size-[20px_20px]" />
        <div className="absolute inset-0 bg-linear-to-t from-indigo-600/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Trusted by 10,000+ professionals</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Connect with Top Freelancers
                <span className="block text-indigo-200">Get Things Done</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-indigo-100 mb-8 max-w-xl">
                GigFlow is the premier marketplace connecting talented freelancers with clients
                who need their skills. Post a gig, receive bids, and hire the best.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" variant="secondary" className="min-w-50 shadow-lg">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" variant="secondary" className="min-w-50 shadow-lg">
                        Get Started Free
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/gigs">
                      <Button
                        size="lg"
                        variant="outline"
                        className="min-w-50 border-white text-white hover:bg-white/10"
                      >
                        Browse Gigs
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="hidden lg:block">
              <img 
                src={heroIllustration} 
                alt="Freelancer working" 
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GigFlow?
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Everything you need to hire freelancers or find work, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="text-center p-6" hover>
                <div className={`w-14 h-14 bg-linear-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Post Your Gig',
                description: 'Describe your project, set your budget, and post it for freelancers to see.',
              },
              {
                step: '02',
                title: 'Review Bids',
                description: 'Receive proposals from qualified freelancers and review their profiles.',
              },
              {
                step: '03',
                title: 'Hire & Collaborate',
                description: 'Choose the best freelancer and start working on your project together.',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-indigo-100 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Startup Founder',
                content: 'GigFlow helped us find amazing developers for our MVP. The bidding system made it easy to compare and choose.',
                avatar: 'S',
              },
              {
                name: 'Mike Chen',
                role: 'Freelance Designer',
                content: "As a freelancer, I've landed multiple high-paying projects through GigFlow. The platform is intuitive and professional.",
                avatar: 'M',
              },
              {
                name: 'Emily Davis',
                role: 'Marketing Director',
                content: 'The quality of freelancers on GigFlow is outstanding. We use it for all our content and design needs.',
                avatar: 'E',
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of freelancers and clients already using GigFlow
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="min-w-50">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

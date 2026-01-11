import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="GigFlow" className="h-10 w-10" />
              <span className="text-2xl font-bold text-white">GigFlow</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Connect with talented freelancers or find your next project. GigFlow makes it easy to
              post jobs and find the perfect match for your needs.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Role Based */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gigs" className="text-gray-400 hover:text-white transition-colors">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/gigs/create" className="text-gray-400 hover:text-white transition-colors">
                  Post a Gig
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/my-gigs" className="text-gray-400 hover:text-white transition-colors">
                      My Gigs
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-bids" className="text-gray-400 hover:text-white transition-colors">
                      My Bids
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GigFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

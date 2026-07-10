import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Book, Zap } from 'lucide-react';
import { Card, Input, Button } from '../components/ui';
import { Link } from 'react-router-dom';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Learn the basics of using GigFlow',
      color: 'bg-brand-emerald-light/40 border border-brand-emerald/10 text-brand-emerald',
    },
    {
      icon: Book,
      title: 'Posting Gigs',
      description: 'How to create and manage gigs',
      color: 'bg-brand-emerald-light/40 border border-brand-emerald/10 text-brand-emerald',
    },
    {
      icon: MessageCircle,
      title: 'Bidding',
      description: 'Submit and manage your bids',
      color: 'bg-brand-emerald-light/40 border border-brand-emerald/10 text-brand-emerald',
    },
    {
      icon: HelpCircle,
      title: 'Account & Security',
      description: 'Manage your account settings',
      color: 'bg-brand-emerald-light/40 border border-brand-emerald/10 text-brand-emerald',
    },
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click the "Sign Up" button in the top right corner. Fill in your details, choose whether you\'re a client or freelancer, and verify your email address.',
    },
    {
      question: 'How do I post a gig?',
      answer: 'After logging in as a client, click "Post a Gig" in the navigation. Fill in the gig details including title, description, budget, and deadline, then submit.',
    },
    {
      question: 'How do I submit a bid?',
      answer: 'Browse available gigs and click on one you\'re interested in. Click the "Submit Bid" button, enter your proposed price and cover letter, then submit.',
    },
    {
      question: 'How do I accept a bid?',
      answer: 'As a client, go to your gig details page. You\'ll see all submitted bids. Click "Accept" on the bid you want to hire, and the freelancer will be notified.',
    },
    {
      question: 'Can I change my role from client to freelancer?',
      answer: 'Currently, the role is set during registration. Contact support if you need to change your role.',
    },
    {
      question: 'How do payments work?',
      answer: 'Payments are handled directly between clients and freelancers. We recommend using secure payment methods and releasing payment upon work completion.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-black text-matte-charcoal mb-4 tracking-tight">Help Center</h1>
        <p className="text-lg text-matte-charcoal/60 mb-8">
          How can we help you today?
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matte-charcoal/45 w-5 h-5 z-10" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-3"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <Card.Content className="flex items-start gap-4 py-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${category.color}`}>
                <category.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-matte-charcoal">{category.title}</h3>
                <p className="text-sm text-matte-charcoal/65 mt-0.5">{category.description}</p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-display font-extrabold text-matte-charcoal mb-6 tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Card key={index}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left focus:outline-hidden"
              >
                <Card.Content className="flex items-center justify-between py-4">
                  <span className="font-display font-bold text-sm text-matte-charcoal">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-matte-charcoal/50" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-matte-charcoal/50" />
                  )}
                </Card.Content>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-matte-charcoal/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <Card className="bg-brand-emerald border-brand-emerald-hover text-white">
        <Card.Content className="text-center py-8">
          <h3 className="text-2xl font-display font-extrabold mb-2 tracking-tight">Still need help?</h3>
          <p className="mb-6 text-sm text-white/80 font-medium">Our support team is here to assist you</p>
          <Link to="/contact">
            <Button variant="secondary" className="bg-matte-bone text-brand-emerald hover:bg-matte-bone/90 border-transparent">
              Contact Support
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Help;

import { FileText, Users, Briefcase, CreditCard, AlertTriangle, Scale } from 'lucide-react';
import { Card } from '../components/ui';

const Terms = () => {
  const sections = [
    {
      icon: Users,
      title: 'Account Terms',
      content: `You must be at least 18 years old to use GigFlow. You are responsible for maintaining 
      the security of your account and password. You are responsible for all activities that occur 
      under your account.`,
    },
    {
      icon: Briefcase,
      title: 'Gig Posting Rules',
      content: `Clients must provide accurate descriptions of their gigs. All gigs must be legal and 
      comply with our community guidelines. We reserve the right to remove any gig that violates 
      our terms.`,
    },
    {
      icon: FileText,
      title: 'Bidding Guidelines',
      content: `Freelancers must submit honest bids that reflect their actual capabilities and pricing. 
      Once a bid is accepted, both parties are expected to honor the agreement. Failure to complete 
      work may result in account suspension.`,
    },
    {
      icon: CreditCard,
      title: 'Payments',
      content: `All payments are processed securely through our platform. Clients agree to pay for 
      completed work as agreed. GigFlow may charge service fees for transactions processed through 
      the platform.`,
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Activities',
      content: `Users may not use GigFlow for illegal activities, spam, harassment, or to post 
      misleading content. Any violation may result in immediate account termination without refund.`,
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      content: `In case of disputes between clients and freelancers, GigFlow will provide mediation 
      support. Our decision on disputes is final. We encourage users to communicate openly to 
      resolve issues.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-black text-matte-charcoal mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-xs text-matte-charcoal/50 font-bold uppercase tracking-wider">
          Last updated: January 2026
        </p>
      </div>

      <Card className="mb-8">
        <Card.Content>
          <p className="text-sm text-matte-charcoal/70 leading-relaxed">
            Welcome to GigFlow! These Terms of Service govern your use of our platform and services. 
            By accessing or using GigFlow, you agree to be bound by these terms. If you do not agree 
            to these terms, please do not use our services.
          </p>
        </Card.Content>
      </Card>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <Card.Content className="py-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-emerald-light/40 border border-brand-emerald/10 rounded-xl flex items-center justify-center shrink-0 text-brand-emerald">
                  <section.icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-display font-bold text-matte-charcoal mb-1">{section.title}</h2>
                  <p className="text-sm text-matte-charcoal/70 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <Card.Content className="text-center py-4">
          <p className="text-sm text-matte-charcoal/60 font-medium">
            Questions about our terms?{' '}
            <a href="/contact" className="text-brand-emerald font-bold hover:text-brand-emerald-hover transition-colors">Contact us</a>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Terms;

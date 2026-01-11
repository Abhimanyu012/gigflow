import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';
import { Card } from '../components/ui';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, 
      post a gig, submit a bid, or contact us for support. This includes your name, email address, 
      and any other information you choose to provide.`,
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use the information we collect to provide, maintain, and improve our services, 
      process transactions, send you technical notices and support messages, and respond to your 
      comments and questions.`,
    },
    {
      icon: Shield,
      title: 'Information Security',
      content: `We take reasonable measures to help protect your personal information from loss, 
      theft, misuse, unauthorized access, disclosure, alteration, and destruction. All data is 
      encrypted in transit and at rest.`,
    },
    {
      icon: Lock,
      title: 'Data Retention',
      content: `We retain your information for as long as your account is active or as needed to 
      provide you services. You can request deletion of your account and associated data at any time.`,
    },
    {
      icon: Bell,
      title: 'Communications',
      content: `We may send you emails about your account, transactions, or updates to our services. 
      You can opt out of promotional communications at any time by clicking unsubscribe in our emails.`,
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: `You have the right to access, correct, or delete your personal information. You can 
      also object to processing and request data portability. Contact us to exercise these rights.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600">
          Last updated: January 2026
        </p>
      </div>

      <Card className="mb-8">
        <Card.Content>
          <p className="text-gray-600 leading-relaxed">
            At GigFlow, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform. Please read this 
            privacy policy carefully. By using GigFlow, you agree to the collection and use of 
            information in accordance with this policy.
          </p>
        </Card.Content>
      </Card>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <Card.Content>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <section.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <Card.Content className="text-center">
          <p className="text-gray-600">
            Questions about our privacy policy?{' '}
            <a href="/contact" className="text-indigo-600 hover:underline">Contact us</a>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Privacy;

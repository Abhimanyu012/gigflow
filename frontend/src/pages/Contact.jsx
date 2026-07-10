import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { Card, Button, Input, Textarea } from '../components/ui';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-black text-matte-charcoal mb-4 tracking-tight">Contact Us</h1>
        <p className="text-base text-matte-charcoal/60 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <Card.Header>
            <h2 className="text-lg font-display font-bold text-matte-charcoal">Send us a Message</h2>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <Textarea
                label="Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card.Content>
        </Card>

        {/* Contact Info */}
        <div className="space-y-8">
          <Card>
            <Card.Content className="flex items-start gap-4 py-5">
              <div className="w-11 h-11 bg-brand-emerald-light/40 border border-brand-emerald/10 rounded-xl flex items-center justify-center shrink-0 text-brand-emerald">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-matte-charcoal mb-1">Email</h3>
                <p className="text-sm text-matte-charcoal/65">support@gigflow.com</p>
                <p className="text-sm text-matte-charcoal/65">hello@gigflow.com</p>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="flex items-start gap-4 py-5">
              <div className="w-11 h-11 bg-brand-emerald-light/40 border border-brand-emerald/10 rounded-xl flex items-center justify-center shrink-0 text-brand-emerald">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-matte-charcoal mb-1">Phone</h3>
                <p className="text-sm text-matte-charcoal/65">+1 (555) 123-4567</p>
                <p className="text-sm text-matte-charcoal/65">Mon-Fri 9am-6pm EST</p>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="flex items-start gap-4 py-5">
              <div className="w-11 h-11 bg-brand-emerald-light/40 border border-brand-emerald/10 rounded-xl flex items-center justify-center shrink-0 text-brand-emerald">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-matte-charcoal mb-1">Office</h3>
                <p className="text-sm text-matte-charcoal/65">123 Business Street</p>
                <p className="text-sm text-matte-charcoal/65">New York, NY 10001</p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

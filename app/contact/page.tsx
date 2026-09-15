'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, Loader2, MapPin, Phone } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setLoading(true);

    const submitData = new FormData();
    submitData.append('access_key', 'fa3a2094-8417-4fac-a648-499d0e5958d0');
    submitData.append('subject', formData.subject || 'New Contact Form Message');
    submitData.append('from_name', 'Abhiruchi Website');
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('message', formData.message);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData,
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: 'Message sent!', description: 'We\'ll get back to you within 24 hours.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({ title: 'Failed to send. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Failed to send. Please try again.', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Have a question or need a custom solution? We&apos;re here to help. Reach out and we&apos;ll respond within 24 hours.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-5">
                <Mail className="h-5 w-5 text-violet-deep" />
                <p className="mt-2 text-sm font-semibold text-foreground">Email Us</p>
                <p className="mt-0.5 text-sm text-muted-foreground">hello@abhiruchi.com</p>
                <p className="text-sm text-muted-foreground">support@abhiruchi.com</p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <Phone className="h-5 w-5 text-violet-deep" />
                <p className="mt-2 text-sm font-semibold text-foreground">Call Us</p>
                <p className="mt-0.5 text-sm text-muted-foreground">+1 (888) 555-0192</p>
                <p className="text-xs text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <MapPin className="h-5 w-5 text-violet-deep" />
                <p className="mt-2 text-sm font-semibold text-foreground">Location</p>
                <p className="mt-0.5 text-sm text-muted-foreground">123 Market Street</p>
                <p className="text-sm text-muted-foreground">San Francisco, CA 94103</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-violet-deep" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Send a Message
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                />
                <textarea
                  placeholder="Your message *"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-deep px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-dark disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

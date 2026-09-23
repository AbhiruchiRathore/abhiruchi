'use client';

import { useState, useEffect } from 'react';
import { X, Send, Loader2, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_KEY = 'bafc74e7-1a1e-4a1c-b177-8c632cc325d8';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: '',
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setLoading(true);

    const submitData = new FormData();
    submitData.append('access_key', WEB3FORMS_KEY);
    submitData.append('subject', 'New Contact Query — Svayaa');
    submitData.append('from_name', 'Svayaa Website');
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone || 'Not provided');
    submitData.append('message', formData.query);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData,
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: 'Message sent!', description: "We'll get back to you within 24 hours." });
        setFormData({ name: '', email: '', phone: '', query: '' });
        onClose();
      } else {
        toast({ title: 'Failed to send. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Failed to send. Please try again.', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/30 animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 p-4 pt-[10vh]">
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-violet-deep" />
              <h2 className="font-display text-base font-semibold text-foreground">
                Contact Us
              </h2>
            </div>
            <button onClick={onClose} aria-label="Close">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 p-5">
            <p className="text-sm text-muted-foreground">
              Have a question? Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

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

            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-violet-deep"
            />

            <textarea
              placeholder="Your query *"
              rows={4}
              value={formData.query}
              onChange={(e) => setFormData({ ...formData, query: e.target.value })}
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
  );
}

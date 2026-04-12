import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface Props {
  fields: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
  };
  successMsg: string;
  errorMsg: string;
  externalCta: string;
  externalUrl: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({
  fields,
  successMsg,
  errorMsg,
  externalCta,
  externalUrl,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // EmailJS not configured — redirect to external form
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
      setStatus('idle');
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <div className="w-8 h-px bg-charcoal" />
        <p className="text-base text-charcoal">{successMsg}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-mid">{fields.name}</span>
          <input
            type="text"
            name="from_name"
            placeholder={fields.namePlaceholder}
            required
            className="form-field"
            aria-required="true"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-mid">{fields.email}</span>
          <input
            type="email"
            name="from_email"
            placeholder={fields.emailPlaceholder}
            required
            className="form-field"
            aria-required="true"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium tracking-[0.15em] uppercase text-mid">
          {fields.company}
          <span className="ml-2 normal-case text-mid/60 tracking-normal font-normal">({fields.companyPlaceholder})</span>
        </span>
        <input
          type="text"
          name="company"
          placeholder={fields.companyPlaceholder}
          className="form-field"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium tracking-[0.15em] uppercase text-mid">{fields.message}</span>
        <textarea
          name="message"
          rows={6}
          placeholder={fields.messagePlaceholder}
          required
          className="form-field resize-none"
          aria-required="true"
        />
      </label>

      {status === 'error' && (
        <p className="text-sm text-charcoal bg-border px-4 py-3" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-start gap-5 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? fields.sending : fields.submit}
        </button>

        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-mid hover:text-charcoal underline underline-offset-4 transition-colors self-center"
        >
          {externalCta}
        </a>
      </div>
    </form>
  );
}

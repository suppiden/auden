import { useState, useRef } from 'react';

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
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const WEB3FORMS_ACCESS_KEY = '5323e4f1-3524-4c37-8163-e4b15f8b43cf';

export default function ContactForm({
  fields,
  successMsg,
  errorMsg,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const formData = new FormData(formRef.current!);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New contact form submission — Auden');
    formData.append('from_name', 'Auden Website');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        setStatus('error');
      }
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
      {/* Honeypot anti-spam */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-mid">{fields.name}</span>
          <input
            type="text"
            name="name"
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
            name="email"
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

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? fields.sending : fields.submit}
        </button>
      </div>
    </form>
  );
}

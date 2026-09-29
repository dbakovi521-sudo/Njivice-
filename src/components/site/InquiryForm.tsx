import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Reveal } from '@/components/kit';
import { useLanguage } from '@/i18n/LanguageProvider';
import { APARTMENT_SELECT_EVENT, apartments } from '@/data/site';
import { db } from '@/lib/db';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Validation messages are stored as keys so they follow the language too. */
type ErrorKey = 'name' | 'emailRequired' | 'emailInvalid';
type Errors = Partial<Record<'name' | 'email', ErrorKey>>;

interface FormState {
  name: string;
  email: string;
  phone: string;
  arrival: string;
  departure: string;
  guests: string;
  apartment: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  arrival: '',
  departure: '',
  guests: '2',
  apartment: '',
  message: '',
};

const fieldBase =
  'w-full rounded-xl border bg-white px-3.5 py-3 text-[16px] text-[#13212C] placeholder:text-[#9AA6AE] transition focus:outline-none focus:ring-2 focus:ring-[#0E8F8C]/40 focus:border-[#0E8F8C]';

/**
 * The conversion section. Submissions are saved to the site's contacts through
 * the CRM so the owner can read every inquiry in their dashboard — the apartment,
 * dates, guest count and message ride along as structured details.
 */
const InquiryForm = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  // An apartment card's button pre-selects that apartment here.
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === 'string' && detail.length > 0) {
        setForm((prev) => ({ ...prev, apartment: detail }));
      }
    };
    window.addEventListener(APARTMENT_SELECT_EVENT, handler);
    return () => window.removeEventListener(APARTMENT_SELECT_EVENT, handler);
  }, []);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as 'name' | 'email']) return prev;
      const next = { ...prev };
      delete next[key as 'name' | 'email'];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = 'name';
    if (!form.email.trim()) {
      nextErrors.email = 'emailRequired';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'emailInvalid';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    setErrorText('');

    try {
      const { error } = await db.rpc('crm_submit_contact', {
        p_email: form.email.trim(),
        p_name: form.name.trim(),
        p_phone: form.phone.trim() ? form.phone.trim() : null,
        p_sms_opt_in: false,
        p_source: 'website-inquiry',
        p_metadata: {
          apartment: form.apartment ? t.apartments[form.apartment].name : null,
          arrival: form.arrival || null,
          departure: form.departure || null,
          guests: form.guests,
          message: form.message.trim() || null,
          form: 'one-pager inquiry',
        },
      });

      if (error) throw new Error(error.message);

      (window as any).supercool?.track?.('form_submit', {
        form: 'inquiry',
        apartment: form.apartment || null,
        guests: form.guests,
      });

      setStatus('sent');
    } catch (error) {
      setStatus('error');
      setErrorText(error instanceof Error && error.message ? error.message : '');
    }
  };

  const inputClass = (key: string) =>
    [fieldBase, errors[key as 'name' | 'email'] ? 'border-[#D4483F]' : 'border-border'].join(' ');

  return (
    <section id="contact" className="scroll-mt-24 bg-[#FBFAF7] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-2">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0E8F8C]">
              {t.inquiry.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-[#13212C] sm:text-4xl">
              {t.inquiry.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5C6B76]">{t.inquiry.intro}</p>

            <div className="mt-8 rounded-2xl border border-border bg-[#E6F4F3] p-5">
              <p className="font-display text-[15px] font-semibold text-[#13212C]">
                {t.inquiry.rateLine}
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[#5C6B76]">
                {t.inquiry.rateNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className="rounded-[20px] border border-border bg-white p-5 shadow-[0_4px_28px_rgba(19,33,44,0.06)] sm:p-7">
              {status === 'sent' ? (
                <div className="flex flex-col items-start gap-4 py-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E6F4F3] text-[#0E8F8C]">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#13212C]">
                    {t.inquiry.success.heading}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#5C6B76]">
                    {t.inquiry.success.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY);
                      setStatus('idle');
                    }}
                    className="mt-2 inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-[#13212C] transition hover:border-[#0E8F8C] hover:text-[#0E8F8C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8F8C] focus-visible:ring-offset-2"
                  >
                    {t.inquiry.success.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-[15px] font-medium text-[#13212C]">
                        {t.inquiry.labels.name} <span className="text-[#0E8F8C]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder={t.inquiry.placeholders.name}
                        aria-invalid={Boolean(errors.name)}
                        className={`mt-2 ${inputClass('name')}`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[13px] text-[#D4483F]">
                          {t.inquiry.errors[errors.name]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[15px] font-medium text-[#13212C]">
                        {t.inquiry.labels.email} <span className="text-[#0E8F8C]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder={t.inquiry.placeholders.email}
                        aria-invalid={Boolean(errors.email)}
                        className={`mt-2 ${inputClass('email')}`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[13px] text-[#D4483F]">
                          {t.inquiry.errors[errors.email]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[15px] font-medium text-[#13212C]">
                      {t.inquiry.labels.phone}{' '}
                      <span className="text-[14px] font-normal text-[#5C6B76]">
                        {t.inquiry.labels.optional}
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder={t.inquiry.placeholders.phone}
                      className={`mt-2 ${inputClass('phone')}`}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label htmlFor="arrival" className="block text-[15px] font-medium text-[#13212C]">
                        {t.inquiry.labels.arrival}
                      </label>
                      <input
                        id="arrival"
                        name="arrival"
                        type="date"
                        value={form.arrival}
                        onChange={(e) => update('arrival', e.target.value)}
                        className={`mt-2 ${inputClass('arrival')}`}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="departure"
                        className="block text-[15px] font-medium text-[#13212C]"
                      >
                        {t.inquiry.labels.departure}
                      </label>
                      <input
                        id="departure"
                        name="departure"
                        type="date"
                        value={form.departure}
                        onChange={(e) => update('departure', e.target.value)}
                        className={`mt-2 ${inputClass('departure')}`}
                      />
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-[15px] font-medium text-[#13212C]">
                        {t.inquiry.labels.guests}
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={form.guests}
                        onChange={(e) => update('guests', e.target.value)}
                        className={`mt-2 ${inputClass('guests')}`}
                      >
                        {['1', '2', '3', '4', '5', '6+'].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="apartment" className="block text-[15px] font-medium text-[#13212C]">
                      {t.inquiry.labels.apartment}
                    </label>
                    <select
                      id="apartment"
                      name="apartment"
                      value={form.apartment}
                      onChange={(e) => update('apartment', e.target.value)}
                      className={`mt-2 ${inputClass('apartment')}`}
                    >
                      <option value="">{t.inquiry.selectPlaceholder}</option>
                      {apartments.map((apartment) => (
                        <option key={apartment.id} value={apartment.id}>
                          {t.apartments[apartment.id].name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[15px] font-medium text-[#13212C]">
                      {t.inquiry.labels.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder={t.inquiry.placeholders.message}
                      className={`mt-2 resize-y ${inputClass('message')}`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-[#D4483F]/30 bg-[#FDF3F2] px-4 py-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D4483F]" />
                      <p className="text-[14px] leading-relaxed text-[#8A2F28]">
                        {errorText || t.inquiry.errors.generic}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13px] leading-relaxed text-[#5C6B76]">
                      {t.inquiry.footerNote}
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0E8F8C] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#0B7B78] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8F8C] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t.inquiry.sending}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t.inquiry.submit}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-white/70 px-5 py-4">
              <p className="text-[15px] leading-relaxed text-[#13212C]">{t.inquiry.panelLine}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#5C6B76]">
                {t.inquiry.panelNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;

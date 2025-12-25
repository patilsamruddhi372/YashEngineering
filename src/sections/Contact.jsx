import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  User,
  Building,
  Loader2
} from 'lucide-react';

export default function Contact({
  formData = {
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  },
  setFormData = () => {},
  handleSubmit = () => {},
}) {

  // local fallback
  const [localForm, setLocalForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  });

  // ⛔ previous logic forced controlled mode always
  // ✅ new logic: only controlled if parent actually sends values
  const isControlled =
    formData &&
    Object.keys(formData).some((k) => formData[k] !== '');

  const formState = isControlled ? formData : localForm;
  const updateForm = isControlled ? setFormData : setLocalForm;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['Kupwad MIDC, Sangli', 'Maharashtra, India - 416436'] },
    { icon: Phone, title: 'Call Us', details: ['+91 9518764038', '+91 9325987121'] },
    { icon: Mail, title: 'Email Us', details: ['info@yashengineering.com', 'sales@yashengineering.com'] },
    { icon: Clock, title: 'Working Hours', details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'] },
  ];

  const formFields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'User', icon: User, required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 9518764038', icon: Phone, required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'user@example.com', icon: Mail, required: true },
    { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company (Optional)', icon: Building, required: false },
  ];

  // WhatsApp sender (unchanged)
  const sendToWhatsApp = () => {
    const number = "919518764038";  //msg will send on this number

    const message = `
New Contact Enquiry

Name: ${formState.name}
Phone: ${formState.phone}
Email: ${formState.email}
Company: ${formState.company || "—"}
Message: ${formState.message}
    `;

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // submit (kept)
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await handleSubmit(e);
      sendToWhatsApp();
      setSubmitStatus('success');

      updateForm({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
      });

    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>

        {/* info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, i) => (
            <div key={i} className="group bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-yellow-400 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-yellow-50 text-yellow-600 group-hover:bg-gray-900 group-hover:text-yellow-500 transition-all duration-300">
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
              {info.details.map((d, j) => (
                <p key={j} className="text-gray-600 text-sm">{d}</p>
              ))}
            </div>
          ))}
        </div>

        {/* grid */}
        <div className="grid lg:grid-cols-5 gap-12">

          {/* map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
              <div className="aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30543.931498582955!2d74.61063848316932!3d16.876318121252556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc122dba88f97d3%3A0x363b3473824a0f15!2sMIDC%20Kupwad%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1766638038139!5m2!1sen!2sus"
                  className="absolute inset-0 pointer-events-none"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Location Map"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                <p className="text-sm text-gray-600">Kupwad MIDC, Sangli</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-white border-2 border-yellow-500">
              <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-300 mb-6">
                Our team is available during business hours.
              </p>

              <a href="tel:+919518764038" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-white transition duration-300">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 md:p-10 relative z-10">

              <form onSubmit={onSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  {formFields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      <div className="relative">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === field.name ? 'text-yellow-600' : 'text-gray-400'}`}>
                          <field.icon className="w-5 h-5" />
                        </div>

                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formState[field.name] || ''}
                          required={field.required}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => updateForm({ ...formState, [field.name]: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <div className={`absolute left-4 top-4 ${focusedField === 'message' ? 'text-yellow-600' : 'text-gray-400'}`}>
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    <textarea
                      rows="5"
                      placeholder="Tell us about your project requirements..."
                      value={formState.message || ''}
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => updateForm({ ...formState, message: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                    />
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    Message sent successfully!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    Something went wrong — please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

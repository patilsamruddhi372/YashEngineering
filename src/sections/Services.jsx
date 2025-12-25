import { 
  Wrench,
  Settings,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  FileText,
  Clock,
  Users,
  Award,
  TrendingUp,
  Lightbulb,
  ClipboardCheck,
  Headphones,
  Star,
  ChevronRight,
  CircleDot,
  Factory,
  Target,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { services } from '../data/Services';

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  const processSteps = [
    { icon: Phone, title: 'Consultation', description: 'Discuss your requirements with our expert team' },
    { icon: ClipboardCheck, title: 'Site Assessment', description: 'Detailed on-site evaluation and feasibility study' },
    { icon: Lightbulb, title: 'Design & Planning', description: 'Custom solution design with technical drawings' },
    { icon: Settings, title: 'Implementation', description: 'Professional installation by certified engineers' },
    { icon: CheckCircle, title: 'Testing & Handover', description: 'Rigorous testing and comprehensive documentation' },
    { icon: Headphones, title: 'Support', description: '24/7 ongoing maintenance and technical support' }
  ];

  const whyChooseUs = [
    { icon: Award, text: 'ISO 9001:2015 Certified' },
    { icon: Users, text: '50+ Expert Engineers' },
    { icon: Shield, text: 'Quality Guaranteed' },
    { icon: Clock, text: 'On-Time Delivery' }
  ];

  return (
    <section id="services" className="relative py-16 md:py-24 bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6">
            <Wrench className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-900">What We Do</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Industrial Solutions
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From design to installation and maintenance, we provide end-to-end electrical 
            and automation solutions for industries across Maharashtra.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                className={`group relative bg-white rounded-xl shadow-sm border-2 transition-all duration-300 h-full flex flex-col ${
                  isActive
                    ? 'shadow-lg border-yellow-400'
                    : 'border-gray-200 hover:border-yellow-400 hover:shadow-lg'
                }`}
              >
                {/* Content */}
                <div className="relative p-6 lg:p-8 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-50 rounded-lg mb-4 group-hover:bg-yellow-100 transition-colors duration-300">
                    <Icon className="h-7 w-7 text-yellow-600" />
                  </div>

                  {service.badge && (
                    <div className="absolute top-6 right-6">
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
                        {service.badge}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.stats && (
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          {service.stats.rating || '5.0'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {service.stats.projects || '100+'} Projects
                      </div>
                    </div>
                  )}

                  {/* CTA Button — stays at bottom */}
                  <button className="w-full bg-gray-900 hover:bg-yellow-500 text-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Our Work Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Work Process
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach ensuring quality, efficiency, and client satisfaction at every step
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="relative group">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-200 z-0" />
                  )}

                  <div className="relative bg-white border-2 border-gray-200 hover:border-yellow-400 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {index + 1}
                    </div>

                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4 group-hover:bg-yellow-50 transition-colors">
                      <Icon className="h-6 w-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h4>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white mb-20 border-4 border-yellow-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-500/20 rounded-lg mb-6">
              <Target className="h-7 w-7 text-yellow-500" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Yash Engineering?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Three decades of excellence, innovation, and unwavering commitment to quality
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-yellow-500/50 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-yellow-500" />
                  </div>
                  <p className="font-semibold text-base">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-yellow-500/20">
            {[
              { num: '30+', label: 'Years Experience' },
              { num: '500+', label: 'Projects Completed' },
              { num: '100+', label: 'Happy Clients' },
              { num: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  {stat.num}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white border-2 border-gray-900 rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-semibold text-gray-900">Get Started Today</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Power Your Business?
            </h3>

            <p className="text-lg text-gray-600 mb-8">
              Let our experts design the perfect electrical solution for your industrial needs. 
              Get a free consultation and quote today!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group bg-yellow-500 hover:bg-gray-900 text-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all">
                <span className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  Get Free Quote
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a
                href="tel:+919876543210"
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs opacity-60">Call Us Now</div>
                  <div className="text-sm font-bold">+91 98765 43210</div>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-200">
              {[
                { icon: Shield, text: 'Quality Guaranteed' },
                { icon: Clock, text: 'On-Time Delivery' },
                { icon: Award, text: 'ISO Certified' },
                { icon: Headphones, text: '24/7 Support' }
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <Icon className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-sm">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

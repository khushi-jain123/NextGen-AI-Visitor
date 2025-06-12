import React, { useState } from 'react';
import { useAISimulation } from '../contexts/AISimulationContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  CheckCircle,
  Brain,
  Sparkles
} from 'lucide-react';

const Contact: React.FC = () => {
  const { currentVisitor, addBehavior } = useAISimulation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Personalized contact info based on current visitor
  const getPersonalizedMessage = () => {
    if (!currentVisitor) return "Get in touch with our team";
    
    const hasBusinessInterest = currentVisitor.interests.some(interest => 
      ['Business', 'Marketing', 'Sales'].includes(interest)
    );
    const hasTechInterest = currentVisitor.interests.some(interest => 
      ['Technology', 'AI', 'Software'].includes(interest)
    );
    
    if (hasBusinessInterest) {
      return "Ready to transform your business with AI analytics?";
    } else if (hasTechInterest) {
      return "Let's discuss how our AI technology can help you";
    }
    
    return "Discover how AI visitor simulation can benefit you";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form interaction behavior
    if (currentVisitor) {
      addBehavior({
        id: Math.random().toString(36).substr(2, 9),
        visitorId: currentVisitor.id,
        action: 'form_interaction',
        target: 'contact-form',
        duration: 120,
        timestamp: new Date()
      });
    }
    
    setIsSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {currentVisitor && (
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Personalized for {currentVisitor.name}
            </div>
          )}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {getPersonalizedMessage()}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our AI-powered visitor simulation platform? 
            Our team of experts is here to help you unlock the potential of intelligent analytics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for your interest. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your needs and how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">hello@aivisitorsim.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Office</div>
                    <div className="text-gray-600">
                      123 AI Innovation Drive<br />
                      San Francisco, CA 94105
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-bold">Support Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-white/80 text-sm mt-4">
                For urgent technical issues, our 24/7 emergency support is available for enterprise customers.
              </p>
            </div>

            {/* AI Demo */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-bold">Live AI Demo</h3>
              </div>
              <p className="text-gray-300 mb-4">
                See our AI visitor simulation in action with a personalized demo tailored to your industry.
              </p>
              <button className="group inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200">
                Schedule Demo
                <Brain className="h-4 w-4 ml-2 group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our AI visitor simulation platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How realistic are the AI-generated visitor personas?",
                answer: "Our AI algorithms create highly realistic personas based on real demographic data, behavioral psychology principles, and industry analytics patterns. Each persona includes authentic interests, device preferences, and engagement behaviors."
              },
              {
                question: "Can I integrate this with my existing analytics tools?",
                answer: "Yes! Our platform offers RESTful APIs, MongoDB integration, and real-time webhooks that seamlessly connect with popular analytics tools like Google Analytics, Adobe Analytics, and custom dashboards."
              },
              {
                question: "What makes your personalization engine different?",
                answer: "Our AI considers multiple factors including demographics, interests, device type, and real-time behavior to deliver truly dynamic content adaptation. The system learns and improves from each interaction."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes! We offer a 14-day free trial with full access to our AI simulation features, analytics dashboard, and personalization engine. No credit card required to get started."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
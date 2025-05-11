import { useState } from 'react';
import { MessageSquare, Phone, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I add a new vehicle to my fleet?',
    answer: 'Go to Fleet Management, click on "Add Vehicle" button, and fill in the required information.',
  },
  {
    question: 'What do I do if I receive an emergency alert?',
    answer: 'Check the Incident Alerts page for details, contact the driver, and follow emergency protocols.',
  },
  {
    question: 'How can I update driver information?',
    answer: 'Navigate to Driver Management, find the driver, and click the edit button to update their details.',
  },
];

export default function Support() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', { ticketSubject, ticketMessage });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support & Help</h1>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Phone className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">Contact Support</h2>
          </div>
          <div className="grid gap-4">
            <div>
              <h3 className="font-medium">Phone Support</h3>
              <p className="text-gray-600">24/7 Emergency: (800) 123-4567</p>
              <p className="text-gray-600">Technical Support: (800) 234-5678</p>
            </div>
            <div>
              <h3 className="font-medium">Email Support</h3>
              <p className="text-gray-600">support@resqbridge.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">Submit a Ticket</h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                className="w-full p-2 border rounded-lg h-32"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Submit Ticket
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
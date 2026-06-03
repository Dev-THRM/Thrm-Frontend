import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ChevronDown, User, Bot } from 'lucide-react';
import tara from "../../assets/chat-icon.webp"

// --- PREDEFINED FAQ DATA ---
const faqs = [
  {
    id: 'q1',
    question: "What is SEO?",
    answer: "SEO (Search Engine Optimization) is the process of optimizing your website to rank higher in search engine results pages (SERPs) like Google, increasing organic (free) traffic to your site."
  },
  {
    id: 'q2',
    question: "Can SEO harm my website?",
    answer: "White-hat SEO (following search engine guidelines) will only help your site. However, black-hat tactics (like keyword stuffing or buying bad links) can result in severe penalties from Google, harming your rankings."
  },
  {
    id: 'q3',
    question: "How do you measure SEO success?",
    answer: "We measure success through key performance indicators (KPIs) like organic traffic growth, keyword rankings for target search terms, conversion rates from organic traffic, and overall return on investment (ROI)."
  },
  {
    id: 'q4',
    question: "What is digital marketing?",
    answer: "Digital marketing encompasses all marketing efforts that use an electronic device or the internet. It includes SEO, social media marketing, email marketing, pay-per-click advertising, and content marketing."
  },
  {
    id: 'q5',
    question: "Do you offer social media management?",
    answer: "Yes! We create engaging content, manage your community, and run targeted ad campaigns across platforms like Instagram, LinkedIn, Facebook, and Twitter to build your brand and drive sales."
  }
];

export default function TaraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: "Hi there! I'm Tara, your digital assistant. How can I help you today?" }
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  const handleQuestionClick = (faq) => {
    // Add user's question to the chat
    setChatHistory(prev => [...prev, { type: 'user', text: faq.question }]);
    
    // Simulate a brief typing delay before the bot answers
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'bot', text: faq.answer }]);
    }, 600);
  };

  const handleResetChat = () => {
    setChatHistory([
      { type: 'bot', text: "Hi there! I'm Tara, your digital assistant. How can I help you today?" }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b]/80 border-b border-white/10">
              <div className="flex items-center gap-3">
                {/* Tara Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center overflow-hidden shrink-0">
                   {/* Replace this Bot icon with an <img> tag pointing to your Tara avatar image if you have one */}
                   <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Ask Tara</h3>
                  <p className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold">Digital Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-[#02040a]/50 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white/10 text-white/90 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Reset Button (only show if chat is long enough) */}
              {chatHistory.length > 3 && (
                 <div className="flex justify-center pt-2">
                    <button 
                      onClick={handleResetChat}
                      className="text-xs text-white/40 hover:text-white/80 transition-colors flex items-center gap-1"
                    >
                      Reset Conversation
                    </button>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Questions Selection Area */}
            <div className="p-4 bg-[#02040a]/80 border-t border-white/10">
              <p className="text-xs text-white/50 font-medium mb-3 uppercase tracking-wider">Suggested Questions</p>
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {faqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleQuestionClick(faq)}
                    className="text-left w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-white transition-all duration-200"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING TRIGGER BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 p-1 pr-5 rounded-full bg-[#1e293b]/90 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-[#334155] transition-all duration-300"
        aria-label="Toggle chat"
      >
        {/* Avatar/Icon side */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-inner overflow-hidden shrink-0 relative">
          {/* If you have the Tara image, use this img tag instead of the MessageSquare icon: */}
          <img src= {tara} />
          <MessageSquare className="w-5 h-5 text-white" />
          
          {/* Online Indicator */}
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1e293b]" />
        </div>
        
        {/* Text side */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-white/60 font-medium group-hover:text-white/80 transition-colors">Chat with our</span>
          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">AI Assistant Tara</span>
        </div>

        {/* Arrow Indicator */}
        <ChevronDown className={`w-4 h-4 text-white/40 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

    </div>
  );
}
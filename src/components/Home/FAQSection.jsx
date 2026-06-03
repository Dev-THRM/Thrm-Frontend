import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import faq from "../../assets/Home/home-faqs.png"

// FAQ Data exactly matching your screenshot, with professional placeholder answers
const faqData = [
  {
    category: "SEO",
    questions: [
      {
        q: "What is SEO, and how does it benefit my business?",
        a: "SEO (Search Engine Optimization) improves your website's visibility on search engines. It drives organic, high-intent traffic to your site, leading to increased brand awareness, qualified leads, and sustainable revenue growth."
      },
      {
        q: "How long does it take to see results from SEO?",
        a: "Typically, noticeable improvements take 3 to 6 months. SEO is a long-term compounding strategy. As search engines index and trust your optimized content, your rankings and traffic will exponentially increase over time."
      },
      {
        q: "What types of SEO services do you provide?",
        a: "We provide comprehensive SEO including On-Page optimization, Technical SEO (site speed, architecture), Off-Page SEO (high-authority link building), and Local SEO to dominate your specific market."
      },
      {
        q: "Can SEO harm my website?",
        a: "Only if done incorrectly using 'black-hat' tactics. At THRM, we strictly adhere to search engine guidelines (white-hat SEO), ensuring your site builds sustainable, penalty-free authority."
      },
      {
        q: "How do you measure SEO success?",
        a: "We track key performance indicators (KPIs) such as organic traffic growth, keyword ranking improvements, conversion rates, and overall return on investment (ROI) using advanced analytics tools."
      }
    ]
  },
  {
    category: "Digital Marketing",
    questions: [
      {
        q: "What is digital marketing, and how does it support business growth?",
        a: "Digital marketing encompasses all online efforts to promote your brand. It supports growth by allowing you to target precise demographics, measure results in real-time, and scale campaigns efficiently."
      },
      {
        q: "How do you develop a digital marketing strategy?",
        a: "We start with a deep-dive audit of your brand, competitors, and target audience. Then, we engineer a custom multi-channel approach aligning SEO, content, and paid media with your specific revenue goals."
      },
      {
        q: "Which platforms do you focus on for social media marketing?",
        a: "We are data-driven; we focus on where your audience lives. This typically includes LinkedIn for B2B, and a mix of Instagram, TikTok, Facebook, and X (Twitter) for B2C consumer engagement."
      },
      {
        q: "How do you measure the success of digital marketing campaigns?",
        a: "Success is measured strictly by ROI. We look past vanity metrics to focus on Cost Per Acquisition (CPA), Lead Quality, Conversion Rates, and total revenue generated from our campaigns."
      },
      {
        q: "Can digital marketing be customized to fit my industry?",
        a: "Absolutely. We don't believe in copy-paste strategies. Every campaign is meticulously tailored to your industry's specific pain points, regulatory environment, and consumer psychology."
      }
    ]
  },
  {
    category: "About THRM Digital Marketing Agency",
    questions: [
      {
        q: "What is THRM Digital Marketing Agency known for?",
        a: "THRM is known for bridging the gap between bold, creative visual storytelling and rigorous, data-driven performance marketing to engineer predictable growth for our clients."
      },
      {
        q: "How experienced is the team at THRM?",
        a: "Our team consists of industry veterans, technical SEO specialists, and creative directors with years of proven experience scaling brands across highly competitive digital landscapes."
      },
      {
        q: "What sets THRM apart from other marketing agencies?",
        a: "Transparency and ownership. We operate as an extension of your team, providing complete visibility into our strategies and taking absolute accountability for your growth metrics."
      },
      {
        q: "Who are THRM's typical clients?",
        a: "We partner with ambitious brands, from scaling startups to established enterprises, who are ready to dominate their market share and require a high-level strategic partner to get them there."
      }
    ]
  },
  {
    category: "Results",
    questions: [
      {
        q: "What kind of results can I expect from working with THRM?",
        a: "Expect measurable growth. While timelines vary by industry, our clients typically see a massive increase in organic visibility, higher conversion rates, and a significantly stronger brand footprint."
      },
      {
        q: "Can you provide examples of successful campaigns?",
        a: "Yes, our portfolio includes multi-million view UGC campaigns, local businesses scaling to national dominance via SEO, and comprehensive rebrands. (Check our Case Studies section for detailed breakdowns)."
      },
      {
        q: "How do you measure the success of a campaign?",
        a: "We define success by your bottom line. We track the entire funnel from the first click to the final sale, ensuring every marketing dollar spent provides a positive return on investment."
      },
      {
        q: "How often will I receive performance reports?",
        a: "We provide comprehensive, easy-to-understand performance reports on a monthly basis, alongside real-time dashboard access and quarterly strategic review meetings."
      }
    ]
  }
];

// Reusable Accordion Item Component
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className="text-[0.95rem] font-medium text-white/80 group-hover:text-blue-400 transition-colors pr-6">
          {question}
        </span>
        <div className="shrink-0 text-white/40 group-hover:text-blue-400 transition-colors">
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pt-1 text-sm text-white/50 leading-relaxed pr-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden text-white">
      
      {/* Ambient Space Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* The Image */}
      <img 
        src={faq} 
        alt=""
        className="w-full h-full object-cover select-none" 
      />
      </div>
      {/* Dark overlay to ensure text readability against the image */}
      <div className="absolute inset-0 bg-[#02040a]/60 z-0" />

      <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-14">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,4vw,3.5rem)] font-black tracking-tighter"
          >
            FAQ'S
          </motion.h2>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {faqData.map((categoryData, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white/3 border border-white/10 rounded-4xl p-8 md:p-10 backdrop-blur-xl"
            >
              {/* Category Title */}
              <div className="mb-6 pb-4 border-b border-white/20">
                <h3 className="text-xl font-bold tracking-wide text-white">
                  {categoryData.category}
                </h3>
              </div>

              {/* Questions List */}
              <div className="flex flex-col">
                {categoryData.questions.map((item, qIdx) => (
                  <AccordionItem 
                    key={qIdx} 
                    question={item.q} 
                    answer={item.a} 
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-64 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/70 to-[#02040a]" />
        <div className="absolute inset-0 backdrop-blur-md opacity-40" />
      </div>
    </section>
  );
}
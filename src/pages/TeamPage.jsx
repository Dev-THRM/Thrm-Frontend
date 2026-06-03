import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Users, ArrowRight, Compass } from "lucide-react";
import Gunjan from "../../src/assets/TeamImages/Founder.jpeg";
import Khushi from "../../src/assets/TeamImages/khushi.jpeg";
import Mahek from "../../src/assets/TeamImages/mahek.jpeg";
import Manas from "../../src/assets/TeamImages/manas.jpeg";
import Sunny from "../../src/assets/TeamImages/sunny.png";
import Omkar from "../../src/assets/TeamImages/omkar.jpeg";
import Sujal from "../../src/assets/TeamImages/sujal.png";

// --- TEAM DATA (All descriptions restored) ---
const teamMembers = [
  {
    id: 1,
    name: "Ms. Gunjan Shidame",
    designation: "Co-Founder & CMO",
    description: "The dynamic founder and Chief Marketing Officer of THRM Digital Marketing Agency. At just 20 years old, Gunjan is proud to be the youngest leader in the industry, bringing a fresh perspective to the digital marketing world. Her entrepreneurial journey is driven by a passion for innovation, creativity, and delivering exceptional results. Gunjan leads the THRM team with a focus on empowering businesses through social media marketing, website development, and impactful ad campaigns. Under her leadership, the agency continues to set new standards in the digital space. Her commitment to excellence ensures THRM is a trusted partner for clients worldwide. Gunjan's visionary approach and unwavering dedication to her craft have earned her recognition as a trailblazer in the digital marketing arena. She inspires her team to push boundaries, fostering a culture of innovation and growth at THRM Digital Marketing Agency.",
    image: Gunjan,
  },
  {
    id: 2,
    name: "Mr. Sunny Sharma",
    designation: "CO-Founder & CEO",
    description: "Meet the visionary behind THRM Digital Marketing Agency, a dynamic leader who brings creativity, innovation, and strategy to the forefront of our operations. As the Co-Founder, they have been instrumental in shaping THRM into a 360° digital marketing powerhouse, known for delivering impactful results and building strong, lasting relationships with clients. With a sharp eye for detail and a passion for helping brands thrive in the digital space, they have spearheaded countless successful campaigns across diverse industries. Their expertise spans social media management, performance marketing, influencer collaborations, and content creation—always with a focus on authenticity and measurable outcomes. Their leadership and dedication inspire our team to push boundaries, embrace innovation, and deliver excellence in every project. At THRM Digital Marketing Agency, their vision drives us to go above and beyond, ensuring that our clients achieve success in the ever-evolving digital world.",
    image: Sunny,
  },
  {
    id: 3,
    name: "Mr. Manas Patil",
    designation: "Director IT",
    description: "Manas Patil is a passionate and innovative full stack developer, dedicated to crafting seamless digital experiences. With a strong foundation in both frontend and backend technologies, Manas specializes in building dynamic web applications that combine functionality with aesthetic appeal. His expertise spans JavaScript, React.js, Node.js, Express.js, and MongoDB, enabling him to deliver robust and scalable solutions. Manas’s commitment to continuous learning and his problem-solving mindset empower him to tackle complex challenges with precision and creativity. As a forward-thinking developer, Manas thrives in collaborative environments, ensuring each project exceeds expectations. His dedication to excellence and ability to transform ideas into impactful digital products make him a valuable asset in today’s fast-evolving tech landscape.",
    image: Manas,
  },
  {
    id: 4,
    name: "Mr. Omkar Jadhav",
    designation: "Deputy Director Creative Department",
    description: "Omkar, our Creative Video Editor at THRM Digital Marketing Agency, is the creative mind who turns ideas into cinematic experiences. With a sharp eye for detail and a natural flair for storytelling, he transforms raw footage into compelling visual narratives that engage audiences and strengthen brand identity. His expertise lies in blending crisp editing, smooth transitions, and impactful sound design to create videos that don’t just inform, but inspire. From dynamic social media reels to high-end promotional campaigns, Omkar ensures each project reflects both creativity and strategy. His strong command over editing tools, along with his ability to align visuals with brand messaging, makes him a key driver of THRM’s content success. Beyond technical skill, Omkar brings passion, patience, and originality to every frame—turning ordinary visuals into extraordinary stories that leave a lasting impression.",
    image: Omkar,
  },
  {
    id: 5,
    name: "Mr. Sujal Kanojiya",
    designation: "Creative video editor",
    description: "Sujal Kanojiya, our Jr. Creative Video Editor at THRM Digital Marketing Agency, brings fresh creativity, sharp visual instincts, and a passion for storytelling to every project he works on. With a strong understanding of pacing, transitions, and visual flow, Sujal transforms raw clips into engaging videos that capture attention and deliver the message with impact. As an emerging talent, Sujal combines technical skill with youthful innovation—ensuring every reel, short, or campaign video feels modern, energetic, and aligned with brand goals. He constantly experiments with new editing styles, effects, and trends to keep THRM’s content ahead of the curve. Focused, dedicated, and always eager to learn, Sujal contributes to the team with new ideas and a strong commitment to quality. With his growing expertise and passion for visual storytelling, he is on a path to becoming a key creative force in THRM’s video production team.",
    image: Sujal,
  },
  {
    id: 6,
    name: "Ms. Khushi Verma",
    designation: "Deputy Director Content Department",
    description: "Khushi Verma, our Digital Marketing Associate at THRM Digital Marketing Agency, brings creativity, enthusiasm, and a results-focused mindset to every campaign she works on. With a passion for social media trends, content marketing, and brand storytelling, Khushi ensures that every project captures attention and drives engagement. Her role involves supporting the execution of digital strategies, managing campaigns across platforms, and analyzing performance to optimize results. Khushi’s attention to detail and proactive approach make her an essential part of THRM’s marketing team. Always eager to learn and innovate, she brings fresh perspectives and energy that keep our digital initiatives dynamic and impactful. With Khushi on board, THRM continues to deliver marketing that connects, engages, and converts.",
    image: Khushi,
  },
  {
    id: 7,
    name: "Ms. Mahek Bhagwani",
    designation: "Deputy Director Social Department",
    description: "Mahek Bhagwani, our Digital Marketing Associate at THRM Digital Marketing Agency, is known for her strategic thinking and creative flair. She plays an integral role in planning and executing campaigns that enhance brand awareness and engagement across digital platforms. With a strong understanding of social media trends, content strategy, and audience behavior, Mahek ensures that every campaign resonates with its target audience. Her curiosity and commitment to staying updated with the latest marketing techniques make her a valuable contributor to THRM’s growing success. Focused, driven, and passionate about delivering results, Mahek helps THRM craft digital experiences that not only attract attention but also build meaningful brand connections.",
    image: Mahek,
  },
  {
    id: 8,
    name: "Vedant Patil",
    designation: "Client Success Manager",
    description: "The primary bridge between our agency and your brand. Vedant ensures that every project milestone is hit on time, communication is transparent, and expectations are consistently exceeded. Dedicated to understanding the unique goals of every client, he works tirelessly to ensure that our internal creative and technical outputs align perfectly with your business vision. By streamlining processes, resolving queries proactively, and fostering deep professional relationships, Vedant helps maintain the high standards of satisfaction that THRM is known for. His approachable nature and commitment to accountability make him a cornerstone of the client-agency dynamic, ensuring your path to digital growth is smooth, efficient, and highly productive.",
    image: "", 
  }
];

export default function TeamPage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main ref={containerRef} className="bg-[#02040a] text-white min-h-screen relative overflow-hidden">
      
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50" />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full" />
        <div className="star-drift opacity-40" />
        <div className="star-drift star-drift-2 opacity-20" />
      </div>

      <header className="relative z-10 pt-40 pb-20 lg:pt-32 px-6 lg:px-14 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Users className="w-4 h-4 text-white" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#B0B0B0]">
              The Collective
            </span>
          </div>

          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            The Minds Behind <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Your Digital Success.
            </span>
          </h1>
        </motion.div>
      </header>

      <section className="relative z-10 px-6 lg:px-14 pb-32 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-24 lg:gap-32">
          {teamMembers.map((member, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article 
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col gap-10 lg:gap-16 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    {member.name}
                  </h2>
                  <p className="text-lg text-white/70 leading-relaxed mb-8 text-justify">
                    {member.description}
                  </p>
                  <div className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full text-sm md:text-base transition-all hover:bg-gray-200">
                    {member.designation}
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-4/5 w-full max-w-[500px] mx-auto overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        loading="lazy"
                        className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">Photo Unavailable</div>
                    )}
                    <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-14 max-w-[1000px] mx-auto text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-8">Want to be part of the vision?</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            We are always looking for passionate creators, developers, and marketers who are ready to redefine the digital landscape.
          </p>
          <button className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200">
            View Open Positions <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>
    </main>
  );
}
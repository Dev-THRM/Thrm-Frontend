import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Users, ArrowRight, Compass } from "lucide-react";
import Gunjan from "../assets/TeamImages/Founder.jpeg";
import Sunny from "../assets/TeamImages/sunny.png";
import Omkar from "../assets/TeamImages/omkar.JPG";
// import Kaustubh from "../assets/TeamImages/kaustubh.jpg";
import Sagar from "../assets/TeamImages/Sagar.JPG";
import Hanisha from "../assets/TeamImages/hanisha.JPG";
// import Manmeet from "../assets/TeamImages/manmeet.JPG";
import Vedant from "../assets/TeamImages/vedant.JPG"
import Mitali from "../assets/TeamImages/mitali.JPG";
import Sneha from "../assets/TeamImages/sneha.JPG"
import Manilal from "../assets/TeamImages/manilal.jpeg"
import Sahil from "../assets/TeamImages/sahil.jpg"
import Diya from "../assets/TeamImages/diya.jpg"
import Prapti from "../assets/TeamImages/prapti.png"
import Kalpana from "../assets/TeamImages/kalpana.jpg"

// --- TEAM DATA (All descriptions restored) ---
const teamMembers = [
  {
    id: 1,
    name: "Ms. Gunjan Shidame",
    designation: "Co-Founder & CMO",
    description:
      "The dynamic founder and Chief Marketing Officer of THRM Digital Marketing Agency. At just 20 years old, Gunjan is proud to be the youngest leader in the industry, bringing a fresh perspective to the digital marketing world. Her entrepreneurial journey is driven by a passion for innovation, creativity, and delivering exceptional results. Gunjan leads the THRM team with a focus on empowering businesses through social media marketing, website development, and impactful ad campaigns. Under her leadership, the agency continues to set new standards in the digital space. Her commitment to excellence ensures THRM is a trusted partner for clients worldwide. Gunjan's visionary approach and unwavering dedication to her craft have earned her recognition as a trailblazer in the digital marketing arena. She inspires her team to push boundaries, fostering a culture of innovation and growth at THRM Digital Marketing Agency.",
    image: Gunjan,
  },

  {
    id: 2,
    name: "Mr. Sunny Sharma",
    designation: "CO-Founder & CEO",
    description:
      "Meet the visionary behind THRM Digital Marketing Agency, a dynamic leader who brings creativity, innovation, and strategy to the forefront of our operations. As the Co-Founder, they have been instrumental in shaping THRM into a 360° digital marketing powerhouse, known for delivering impactful results and building strong, lasting relationships with clients. With a sharp eye for detail and a passion for helping brands thrive in the digital space, they have spearheaded countless successful campaigns across diverse industries. Their expertise spans social media management, performance marketing, influencer collaborations, and content creation—always with a focus on authenticity and measurable outcomes. Their leadership and dedication inspire our team to push boundaries, embrace innovation, and deliver excellence in every project. At THRM Digital Marketing Agency, their vision drives us to go above and beyond, ensuring that our clients achieve success in the ever-evolving digital world.",
    image: Sunny,
  },
  {
    id: 3,
    name: "Mr.Manilal",
    designation: "CHO",
    description:
      "Meet our Chief Happiness Officer (CHO), the calmest and most loved member of the team. Known for spending most of the day peacefully napping, our office cat has mastered the art of creating a relaxed and positive workplace. Whether quietly supervising from a cozy corner or greeting everyone with a gentle stretch, the CHO reminds us to slow down, recharge, and enjoy the little moments that make every workday better.",
    image: Manilal
  },
   {
    id: 4,
    name: "Mr. Vedant Patil",
    designation: "Admin & HR",
    description:
      "Vedant Patil, our Admin & HR professional at THRM Digital Marketing Agency, is the driving force behind smooth internal operations and a well-organized workplace. With strong organizational skills and a people-first approach, he manages the day-to-day administrative and HR activities that keep the team connected, productive, and supported. From coordinating recruitment and onboarding to maintaining employee records and handling attendance, documentation, and internal communication, Vedant ensures that every process runs efficiently. His ability to communicate effectively and coordinate across teams helps create a positive and professional work environment. Beyond managing processes, Vedant plays an important role in understanding employee needs, supporting team members, and ensuring that company policies and procedures are followed. His attention to detail, reliability, and approachable nature make him an essential part of THRM’s operations, helping build a workplace where both people and processes can grow together.",
    image: Vedant, 
  },
  {
    id: 5,
    name: "Mr. Omkar Jadhav",
    designation: "Deputy Director Creative Department",
    description:
      "Omkar, our Creative Video Editor at THRM Digital Marketing Agency, is the creative mind who turns ideas into cinematic experiences. With a sharp eye for detail and a natural flair for storytelling, he transforms raw footage into compelling visual narratives that engage audiences and strengthen brand identity. His expertise lies in blending crisp editing, smooth transitions, and impactful sound design to create videos that don’t just inform, but inspire. From dynamic social media reels to high-end promotional campaigns, Omkar ensures each project reflects both creativity and strategy. His strong command over editing tools, along with his ability to align visuals with brand messaging, makes him a key driver of THRM’s content success. Beyond technical skill, Omkar brings passion, patience, and originality to every frame—turning ordinary visuals into extraordinary stories that leave a lasting impression.",
    image: Omkar, 
  },
   {
    id: 6,
    name: "Mr. Sagar Bhuwad",
    designation: "Creative Designer Manager",
    description:
      "Sagar Bhuwad, our Creative Designer at THRM Digital Marketing Agency, is responsible for crafting visually engaging designs that strengthen brand identity and communication. As a skilled graphic designer, he creates compelling creatives for digital marketing campaigns, social media platforms, advertisements, and branding materials. With a strong understanding of design principles, color theory, and visual storytelling, Sagar transforms ideas into impactful designs that capture attention and leave a lasting impression. His creativity, attention to detail, and commitment to excellence help ensure that every visual asset aligns with client objectives and maintains the highest standards of quality. Through his innovative approach and passion for design, Sagar plays a key role in enhancing the visual presence and success of THRM's clients.",
    image: Sagar, 
  },
   {
    id: 7,
    name: "Ms. Sneha Dewani",
    designation: "Senior Full Stack Developer",
    description:
      "Sneha Dewani is a passionate and driven Full Stack Developer with a strong foundation in modern web technologies and software development. With expertise in both frontend and backend development, she specializes in creating responsive, user-friendly, and scalable web applications that deliver exceptional user experiences. Her technical skill set includes React.js, JavaScript, PHP Laravel, MySQL, HTML, CSS, and Bootstrap, enabling her to develop robust solutions from concept to deployment.Having gained hands-on experience through professional internships and real-world projects, Sneha combines technical proficiency with a problem-solving mindset to build efficient and innovative digital products. She is committed to continuous learning, staying updated with emerging technologies, and applying best practices to every project she undertakes.Known for her dedication, adaptability, and collaborative approach, Sneha thrives in dynamic environments where creativity and technology intersect. Her ability to transform complex requirements into practical, high-quality solutions makes her a valuable contributor to any development team and a promising professional in the ever-evolving technology industry.",
    image: Sneha,
  },
  {
    id: 8,
    name: "Mr. Sahil Bijlani",
    designation: "Full Stack Developer",
    description: "Sahil Bijlani is a passionate and results-driven Full Stack Developer with a strong foundation in software engineering and modern web technologies. He specializes in building scalable, secure, and user-centric web applications, with hands-on experience across both frontend and backend development. His technical expertise includes React.js, Next.js, Node.js, Express.js, JavaScript, Java, PHP, MySQL, PostgreSQL, HTML, CSS, Bootstrap, and RESTful APIs, enabling him to deliver end-to-end solutions from design to deployment. Through internships and real-world projects, Sahil has developed applications involving authentication, database management, API integration, and responsive user interfaces. He enjoys solving complex problems, writing clean and maintainable code, and building applications that are both efficient and intuitive. His projects demonstrate a strong understanding of software architecture, database design, and modern development practices.",
    image: Sahil
  },
  {
    id: 9,
    name: "Ms. Prapti Jagtap",
    designation: "Content Creator",
    description:
      "Prapti Jagtap, a Content Creator and Model at THRM Digital Marketing Agency, brings creativity, confidence, and a strong visual sense to the content created for both THRM and its clients. She contributes to developing engaging social media content, helping create ideas, concepts, and on-camera content that connect brands with their audiences. Her experience in modeling adds a strong understanding of presentation, styling, expressions, and visual storytelling, allowing her to bring a distinctive presence to brand content. Prapti works closely with the creative team to plan and produce content that reflects each brand’s identity while staying relevant to current social media trends. Her creativity, adaptability, and confidence in front of the camera enable her to create authentic and engaging content that captures attention and strengthens the online presence of both THRM and its clients.",
    image: Prapti, 
  },
  {
    id: 10,
    name: "Ms. Hanisha Murjani",
    designation: "Social Media Manager",
    description:
      "Hanisha Murjani, our Social Media Manager at THRM Digital Marketing Agency, plays a vital role in building and maintaining a strong digital presence for our clients. She is responsible for managing social media accounts across various platforms, ensuring consistent brand communication and audience engagement. With a deep understanding of social media trends, content planning, and community management, Hanisha develops strategies that help clients grow their online reach and strengthen their connection with their target audience. Her proactive approach to monitoring performance, responding to audience interactions, and optimizing content ensures that every social media campaign delivers meaningful results. Dedicated, creative, and detail-oriented, Hanisha contributes significantly to enhancing brand visibility and driving client success in the digital space.",
    image: Hanisha, 
  },
  {
    id: 11,
    name: "Ms. Kalpana Singh",
    designation: "Social Media Manager",
    description:
      "Kalpana Singh, our Social Media Manager at THRM Digital Marketing Agency, plays an important role in developing and managing social media strategies that strengthen our clients’ online presence. She oversees social media accounts across various platforms, ensuring consistent communication, engaging content, and meaningful audience interaction. With a strong understanding of social media trends, content planning, and audience behavior, Kalpana works closely with the creative team to develop strategies that align with each client’s brand identity and goals. Her ability to coordinate content, monitor social media performance, and adapt strategies based on audience engagement helps improve brand visibility and build stronger digital communities. Creative, organized, and proactive, Kalpana contributes to the success of THRM’s social media initiatives by helping brands connect with their audiences and establish a consistent and impactful online presence.",
    image: Kalpana, 
  },
];

export default function TeamPage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main
      ref={containerRef}
      className="bg-[#02040a] text-white min-h-screen relative overflow-hidden"
    >
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-white transform origin-left z-50"
      />

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
            The Minds Behind <br className="hidden md:block" />
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
                className={`flex flex-col gap-10 lg:gap-16 items-center lg:items-start ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
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
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        Photo Unavailable
                      </div>
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
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-8">
            Want to be part of the vision?
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            We are always looking for passionate creators, developers, and
            marketers who are ready to redefine the digital landscape.
          </p>
          <button className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200">
            View Open Positions{" "}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>
    </main>
  );
}

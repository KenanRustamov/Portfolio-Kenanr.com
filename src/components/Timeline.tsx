import React from 'react';
import { motion } from 'framer-motion';


interface WorkExperience {
  company: string;
  position: string;
  description: string;
  url: string;
  dates: string;
  location: string;
  skills: string[];
}

interface TimelineProps {
  title: string;
  experiences: WorkExperience[];
}

const Timeline: React.FC<TimelineProps> = ({ title, experiences }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    }
  };

  return (
    <motion.div
      className="
        w-full max-w-5xl mx-auto text-gray-900 dark:text-gray-100
      "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="text-center mb-20">
        <h2 className="
          section-title in-view
          text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl font-bold mb-3
          relative inline-block tracking-tight drop-shadow-lg
        ">
          {title}
        </h2>
      </div>
      
      <div
        className="
          relative max-w-4xl w-11/12 mx-auto 
          pl-10.5 md:pl-22.5 pr-5 pb-10
          before:content-[''] before:absolute before:w-0.5 
          before:bg-gradient-to-b before:from-blue-600 before:to-blue-600/30
          before:top-2 before:bottom-0 before:left-4 md:before:left-12 before:rounded-sm
          before:shadow-md before:shadow-blue-600/30
        "
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={`${experience.company}-${index}`}
            className="
              relative py-6 flex items-start gap-3 md:gap-6
              before:content-[''] before:absolute before:w-3.5 before:h-3.5
              before:bg-blue-600 before:border-2 before:border-white/90
              before:rounded-full before:top-8 before:-left-8 md:before:-left-12 before:z-10
              before:shadow-lg before:shadow-blue-600/20
              hover:before:scale-125 hover:before:shadow-xl hover:before:shadow-blue-600/30
              before:transition-all before:duration-300
              first:pt-0 first:before:top-2
            "
            variants={itemVariants}
          >
            <div className="
              text-blue-600 dark:text-blue-400 text-xs font-bold
              uppercase tracking-wide w-10 md:w-24 text-center
              mt-2 flex-shrink-0 pointer-events-none
              drop-shadow-md
            ">
              {experience.dates}
            </div>
            <div className="timeline-card">
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group timeline-company-link text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 text-xl sm:text-2xl font-bold mb-2 inline-block relative leading-tight tracking-tight"
                style={{
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
               >
                {experience.company}
                <span className="
                  absolute -bottom-0.5 left-0 w-0 h-0.5
                  bg-gradient-to-r from-blue-600 to-blue-400
                  dark:from-blue-400 dark:to-blue-300
                  transition-all duration-300 ease-out
                  group-hover:w-full
                "></span>
              </a>
              <div className="
                text-blue-600 dark:text-blue-400 text-sm font-semibold mb-1
                normal-case leading-snug opacity-90
                uppercase tracking-wide
              ">
                {experience.position}
              </div>
              <div className="
                text-gray-500 dark:text-gray-400 text-xs font-medium mb-3.5
                normal-case leading-snug opacity-80
              ">
                {experience.location}
              </div>
              <p className="
                text-gray-800 dark:text-gray-200 leading-relaxed text-sm
                m-0 opacity-95 font-normal
              ">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="
                      bg-white/30 dark:bg-white/10 text-gray-800 dark:text-gray-200 
                      border border-white/20 dark:border-white/20 px-3 py-1.5 rounded-xl
                      text-xs font-medium cursor-default tracking-wide opacity-90
                      backdrop-blur-sm
                      hover:bg-white/50 dark:hover:bg-white/20 hover:border-blue-600/30
                      hover:opacity-100 hover:-translate-y-0.5
                    "
                    style={{
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Timeline; 
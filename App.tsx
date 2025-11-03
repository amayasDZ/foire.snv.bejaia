import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import { GalleryImage } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const sections = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    events: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof sections) => {
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const titles = {
      fr: 'Foire SNV Béjaïa - Club Scientifique Universitaire',
      en: 'Foire SNV Bejaia - University Science Club',
      ar: 'معرض علوم الطبيعة والحياة بجاية - نادي علمي جامعي'
    };
    document.title = titles[language];
    
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sectionRefs = Object.values(sections);
    sectionRefs.forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    });

    return () => {
      sectionRefs.forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      });
    };
  }, []);

  const t = translations[language];

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-gray-300 font-sans leading-relaxed transition-colors duration-300">
      <Header 
        scrollToSection={scrollToSection} 
        t={t.header}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
      <main>
        <div ref={sections.home}><Hero t={t.hero} /></div>
        <div ref={sections.about} className="section"><About t={t.about} /></div>
        <div ref={sections.projects} className="section"><Projects t={t.projects} projectsData={t.projectsData} /></div>
        <div ref={sections.team} className="section"><Team t={t.team} teamData={t.teamData} /></div>
        <div ref={sections.gallery} className="section"><Gallery onImageClick={setSelectedImage} t={t.gallery} images={t.gallery.images} /></div>
        <div ref={sections.events} className="section"><Events t={t.events} eventsData={t.eventsData} language={language} /></div>
      </main>
      <Footer t={t.footer} />
      {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default App;
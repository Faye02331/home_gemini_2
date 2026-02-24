
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import WorkSection from './components/work/WorkSection';
import SidebarNav from './components/SidebarNav';
import Header from './components/Header';
import ScrollIndicator from './components/ScrollIndicator';
import DiffuseBlob from './components/DiffuseBlob';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'work' | 'contact'>('home');

  // Handle background color transition based on active section
  const bgColor = activeSection === 'home' ? 'bg-white' : 'bg-black';
  const textColor = activeSection === 'home' ? 'text-black' : 'text-white';

  return (
    <div className={`relative min-h-screen w-full ${bgColor} ${textColor} font-sans transition-colors duration-700 overflow-x-hidden`}>
      {/* Background Effect - Only for Home */}
      {activeSection === 'home' && <DiffuseBlob />}
      
      {/* UI Chrome Overlay */}
      <Header invert={activeSection !== 'home'} />
      <SidebarNav activeSection={activeSection} setActiveSection={setActiveSection} invert={activeSection !== 'home'} />
      
      {activeSection === 'home' && <ScrollIndicator />}

      {/* Main Content Area */}
      <main className={`relative w-full z-10 ${activeSection === 'home' ? 'h-screen flex items-center justify-center p-6 md:p-12' : ''}`}>
        {activeSection === 'home' && <Home />}
        {activeSection === 'about' && <About />}
        {activeSection === 'work' && <WorkSection />}
        {activeSection === 'contact' && <Contact />}
      </main>
    </div>
  );
};

export default App;

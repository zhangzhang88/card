import React, { useState, useEffect } from 'react';
import './App.css';
import TemplateList from './components/TemplateList';
import CardEditor from './components/CardEditor';
import PropertyPanel from './components/PropertyPanel';

const systemTemplates = [
  { key: 'classic', name: '经典', color: 'linear-gradient(128deg, #185491 0%, #a72f6d 100%)', cardWidth: 557, contentBgOpacity: 53 },
  { key: 'rainbow', name: '彩虹', color: 'linear-gradient(90deg, #ff5e62 0%, #ff9966 25%, #f9d423 50%, #a8ff78 75%, #43cea2 100%)' },
  { key: 'neon', name: '霓虹', color: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' },
  { key: 'aurora', name: '极光', color: 'linear-gradient(135deg, #00c3ff 0%, #ffff1c 100%)' },
  { key: 'fire', name: '火焰', color: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)' },
  { key: 'ice', name: '冰蓝', color: 'linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)' },
  { key: 'forest', name: '绿野', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }
];

const systemTemplateKeys = [
  'classic', 'rainbow', 'neon', 'aurora', 'fire', 'ice', 'forest'
];

const allSystemTemplateKeys = systemTemplates.map(t => t.key);

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const systemTemplatesInit = [
      { key: 'classic' }, { key: 'rainbow' }, { key: 'neon' }, { key: 'aurora' }, { key: 'fire' }, { key: 'ice' }, { key: 'forest' }
    ];
    const allSystemTemplateKeys = systemTemplatesInit.map(t => t.key);
    const saved = localStorage.getItem('selectedTemplate');
    if (saved && allSystemTemplateKeys.includes(saved)) {
      return saved;
    }
    return 'classic';
  });
  const [showDate, setShowDate] = useState(true);
  const [showAuthor, setShowAuthor] = useState(true);
  const [showCount, setShowCount] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);
  const [customBgType, setCustomBgType] = useState('template');
  const [customBgColor, setCustomBgColor] = useState('#3A8DDE');
  const [customBgGradient, setCustomBgGradient] = useState({
    from: '#3A8DDE',
    to: '#F357A8',
    angle: 135
  });
  const [contentBgOpacity, setContentBgOpacity] = useState(53);
  const [customTemplates, setCustomTemplates] = useState(() => {
    const saved = localStorage.getItem('customTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [cardWidth, setCardWidth] = useState(557);
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem('userAvatar') || null;
  });

  useEffect(() => {
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
  }, [customTemplates]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    const allTemplateKeys = [
      ...systemTemplates.map(t => t.key),
      ...customTemplates.map(t => t.key)
    ];
    const saved = localStorage.getItem('selectedTemplate');
    if (!allTemplateKeys.includes(saved)) {
      localStorage.setItem('selectedTemplate', 'classic');
      setSelectedTemplate('classic');
    }
  }, [customTemplates, systemTemplates]);

  useEffect(() => {
    if (avatar) {
      localStorage.setItem('userAvatar', avatar);
    }
  }, [avatar]);

  const handleDeleteCustomTemplate = (key) => {
    setCustomTemplates(prev => prev.filter(t => t.key !== key));
    if (selectedTemplate === key) {
      setSelectedTemplate('classic');
    }
  };

  const handleSaveTemplate = () => {
    let color = '';
    let name = `自定义${customTemplates.length + 1}`;
    if (customBgType === 'color') {
      color = customBgColor;
    } else if (customBgType === 'gradient') {
      color = `linear-gradient(${customBgGradient.angle}deg, ${customBgGradient.from} 0%, ${customBgGradient.to} 100%)`;
    } else {
      color = 'linear-gradient(135deg, #7b2ff2 0%, #f357a8 100%)';
    }
    const key = 'custom_' + Date.now();
    setCustomTemplates(prev => [...prev, { 
      key, 
      name, 
      color, 
      bgType: customBgType, 
      bgColor: customBgColor, 
      bgGradient: customBgGradient,
      cardWidth: cardWidth,
      contentBgOpacity: contentBgOpacity
    }]);
    setSelectedTemplate(key);
    setCustomBgType('template');
  };

  const allTemplates = [...systemTemplates, ...customTemplates];

  const handleSelectTemplate = (key) => {
    setSelectedTemplate(key);
    const found = customTemplates.find(t => t.key === key);
    if (found) {
      if (found.bgType === 'color') {
        setCustomBgType('color');
        setCustomBgColor(found.bgColor);
      } else if (found.bgType === 'gradient') {
        setCustomBgType('gradient');
        setCustomBgGradient(found.bgGradient);
      } else {
        setCustomBgType('template');
      }
      if (found.cardWidth) {
        setCardWidth(found.cardWidth);
      }
      if (found.contentBgOpacity !== undefined) {
        setContentBgOpacity(found.contentBgOpacity);
      }
    } else {
      setCustomBgType('template');
      setCardWidth(557);
      setContentBgOpacity(53);
      if (key === 'classic') {
        setCustomBgType('gradient');
        setCustomBgGradient({ from: '#185491', to: '#a72f6d', angle: 128 });
        setCardWidth(557);
        setContentBgOpacity(53);
      }
    }
  };

  return (
    <div className="app-layout">
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        pointerEvents: 'auto'
      }}>
        <a 
          href="https://pub-8d9c7b440bdc4316a94cd1a6ec45d0ce.r2.dev/card_chrome.zip" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#4285f4',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3367d6'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285f4'}
        >
          Google插件下载
        </a>
      </div>
      <aside className="sidebar sidebar-left">
        <div className="sidebar-title">模板</div>
        <TemplateList selected={selectedTemplate} onSelect={handleSelectTemplate} templates={allTemplates} onDeleteCustom={handleDeleteCustomTemplate} customTemplates={customTemplates} />
      </aside>
      <main className="main-content">
        <div className="card-preview">
          <CardEditor
            template={selectedTemplate}
            showDate={showDate}
            showAuthor={showAuthor}
            showCount={showCount}
            showAvatar={showAvatar}
            customBgType={customBgType}
            customBgColor={customBgColor}
            customBgGradient={customBgGradient}
            cardWidth={cardWidth}
            contentBgOpacity={contentBgOpacity}
            onSaveTemplate={handleSaveTemplate}
            avatar={avatar}
            onAvatarChange={setAvatar}
          />
        </div>
      </main>
      <aside className="sidebar sidebar-right">
        <div className="sidebar-title">属性</div>
        <PropertyPanel
          showDate={showDate} setShowDate={setShowDate}
          showAuthor={showAuthor} setShowAuthor={setShowAuthor}
          showCount={showCount} setShowCount={setShowCount}
          showAvatar={showAvatar} setShowAvatar={setShowAvatar}
          customBgType={customBgType} setCustomBgType={setCustomBgType}
          customBgColor={customBgColor} setCustomBgColor={setCustomBgColor}
          customBgGradient={customBgGradient} setCustomBgGradient={setCustomBgGradient}
          cardWidth={cardWidth} setCardWidth={setCardWidth}
          contentBgOpacity={contentBgOpacity} setContentBgOpacity={setContentBgOpacity}
        />
      </aside>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import TemplateList from './components/TemplateList';
import CardEditor from './components/CardEditor';
import PropertyPanel from './components/PropertyPanel';

const systemTemplates = [
  { key: 'default', name: '默认', color: 'linear-gradient(135deg, #7b2ff2 0%, #f357a8 100%)' },
  { key: 'rainbow', name: '彩虹', color: 'linear-gradient(90deg, #ff5e62 0%, #ff9966 25%, #f9d423 50%, #a8ff78 75%, #43cea2 100%)' },
  { key: 'neon', name: '霓虹', color: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' },
  { key: 'aurora', name: '极光', color: 'linear-gradient(135deg, #00c3ff 0%, #ffff1c 100%)' },
  { key: 'fire', name: '火焰', color: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)' },
  { key: 'ice', name: '冰蓝', color: 'linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)' },
  { key: 'forest', name: '绿野', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [showDate, setShowDate] = useState(true);
  const [showAuthor, setShowAuthor] = useState(true);
  const [showCount, setShowCount] = useState(true);
  const [customBgType, setCustomBgType] = useState('template');
  const [customBgColor, setCustomBgColor] = useState('#3A8DDE');
  const [customBgGradient, setCustomBgGradient] = useState({
    from: '#3A8DDE',
    to: '#F357A8',
    angle: 135
  });
  const [contentBgOpacity, setContentBgOpacity] = useState(0);
  const [customTemplates, setCustomTemplates] = useState(() => {
    const saved = localStorage.getItem('customTemplates');
    return saved ? JSON.parse(saved) : [];
  });
  const [cardWidth, setCardWidth] = useState(420);

  useEffect(() => {
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
  }, [customTemplates]);

  const handleDeleteCustomTemplate = (key) => {
    setCustomTemplates(prev => prev.filter(t => t.key !== key));
    if (selectedTemplate === key) {
      setSelectedTemplate('default');
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
      cardWidth: cardWidth 
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
    } else {
      setCustomBgType('template');
      setCardWidth(420);
    }
  };

  return (
    <div className="app-layout">
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
            customBgType={customBgType}
            customBgColor={customBgColor}
            customBgGradient={customBgGradient}
            cardWidth={cardWidth}
            contentBgOpacity={contentBgOpacity}
            onSaveTemplate={handleSaveTemplate}
          />
        </div>
      </main>
      <aside className="sidebar sidebar-right">
        <div className="sidebar-title">属性</div>
        <PropertyPanel
          showDate={showDate} setShowDate={setShowDate}
          showAuthor={showAuthor} setShowAuthor={setShowAuthor}
          showCount={showCount} setShowCount={setShowCount}
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

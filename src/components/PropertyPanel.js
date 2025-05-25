import React from 'react';
import './PropertyPanel.css';

export default function PropertyPanel({ showDate, setShowDate, showAuthor, setShowAuthor, showCount, setShowCount, showAvatar, setShowAvatar, customBgType, setCustomBgType, customBgColor, setCustomBgColor, customBgGradient, setCustomBgGradient, cardWidth, setCardWidth, contentBgOpacity, setContentBgOpacity }) {
  return (
    <div className="property-panel">
      <div className="property-title">显示/隐藏元素</div>
      <label className="property-item">
        <input type="checkbox" checked={showDate} onChange={e => setShowDate(e.target.checked)} /> 日期
      </label>
      <label className="property-item">
        <input type="checkbox" checked={showAuthor} onChange={e => setShowAuthor(e.target.checked)} /> 作者
      </label>
      <label className="property-item">
        <input type="checkbox" checked={showCount} onChange={e => setShowCount(e.target.checked)} /> 字数
      </label>
      <label className="property-item">
        <input type="checkbox" checked={showAvatar} onChange={e => setShowAvatar(e.target.checked)} /> 头像
      </label>

      <div className="property-title" style={{marginTop: 24}}>自定义背景</div>
      <div className="property-bgtype-group">
        <label><input type="radio" name="bgtype" value="template" checked={customBgType==='template'} onChange={()=>setCustomBgType('template')} /> 模板</label>
        <label><input type="radio" name="bgtype" value="color" checked={customBgType==='color'} onChange={()=>setCustomBgType('color')} /> 纯色</label>
        <label><input type="radio" name="bgtype" value="gradient" checked={customBgType==='gradient'} onChange={()=>setCustomBgType('gradient')} /> 渐变</label>
      </div>
      {customBgType==='color' && (
        <div className="property-item">
          <input type="color" value={customBgColor} onChange={e=>setCustomBgColor(e.target.value)} />
          <span style={{marginLeft:8}}>{customBgColor}</span>
        </div>
      )}
      {customBgType==='gradient' && (
        <div className="property-gradient-group">
          <div className="property-item">
            <span>起色</span>
            <input type="color" value={customBgGradient.from} onChange={e=>setCustomBgGradient({...customBgGradient, from: e.target.value})} />
            <span style={{marginLeft:8}}>{customBgGradient.from}</span>
          </div>
          <div className="property-item">
            <span>止色</span>
            <input type="color" value={customBgGradient.to} onChange={e=>setCustomBgGradient({...customBgGradient, to: e.target.value})} />
            <span style={{marginLeft:8}}>{customBgGradient.to}</span>
          </div>
          <div className="property-item">
            <span>角度</span>
            <input type="number" min="0" max="360" value={customBgGradient.angle} onChange={e=>setCustomBgGradient({...customBgGradient, angle: Number(e.target.value)})} style={{width:60,marginLeft:8}} />°
          </div>
        </div>
      )}

      <div className="property-title" style={{marginTop: 24}}>卡片宽度</div>
      <div className="property-opacity-group">
        <input
          type="range"
          min={260}
          max={600}
          step={1}
          value={cardWidth}
          onChange={e => setCardWidth(Number(e.target.value))}
          style={{ width: 160 }}
        />
        <input
          type="number"
          min={260}
          max={600}
          step={1}
          value={cardWidth}
          onChange={e => setCardWidth(Number(e.target.value))}
          style={{ width: 60, marginLeft: 8, background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 4, textAlign: 'center' }}
        /> px
      </div>

      <div className="property-title" style={{marginTop: 24}}>内容框背景</div>
      <div className="property-opacity-group">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={contentBgOpacity}
          onChange={e => setContentBgOpacity(Number(e.target.value))}
          style={{ width: 160 }}
        />
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={contentBgOpacity}
          onChange={e => setContentBgOpacity(Number(e.target.value))}
          style={{ width: 60, marginLeft: 8, background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 4, textAlign: 'center' }}
        /> %
      </div>
    </div>
  );
} 

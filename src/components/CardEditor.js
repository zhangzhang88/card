import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './CardEditor.css';
import AvatarUpload from './AvatarUpload';

// 获取当天日期字符串
function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function CardEditor({ template, showDate = true, showAuthor = true, showCount = true, showAvatar = true, customBgType, customBgColor, customBgGradient, cardWidth = 420, contentBgOpacity = 18, onSaveTemplate, avatar, onAvatarChange }) {
  const [date, setDate] = useState(getTodayStr());
  const [content, setContent] = useState('讲一个笑话：说社会上最危险的两群人相遇了，带着红领巾的小明同学，扶起了摔倒了老奶奶。老奶奶拉着小明说，是你把我撞倒的，要赔我钱。小明反手就掐住了老奶奶的脖子说，老太婆，我今年9岁了，如果我跟他们说，你想拐卖我，并且要伤害我，我在情急之下还了手，结果把你掐死了，你觉得我能判几年？');
  const [author, setAuthor] = useState('赛博牛马');
  const cardRef = useRef(null);
  const wrapperRef = useRef(null);

  const wordCount = content.replace(/\s/g, '').length;

  // 处理粘贴事件，清除格式
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // 计算自定义背景样式
  let customStyle = {};
  if (customBgType === 'color') {
    customStyle.background = customBgColor;
  } else if (customBgType === 'gradient') {
    customStyle.background = `linear-gradient(${customBgGradient.angle}deg, ${customBgGradient.from} 0%, ${customBgGradient.to} 100%)`;
  }

  // 内容框背景色
  const innerBg = `rgba(0,0,0,${contentBgOpacity / 100})`;

  // 导出图片
  const handleExport = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
    const link = document.createElement('a');
    link.download = 'card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // 复制图片
  const handleCopy = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new window.ClipboardItem({ 'image/png': blob })
        ]);
        alert('图片已复制到剪贴板！');
      } catch (e) {
        alert('复制失败，请使用导出功能');
      }
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="card-editor-toolbar">
        <button className="card-btn" onClick={handleExport}>导出图片</button>
        <button className="card-btn" onClick={handleCopy}>复制图片</button>
        {onSaveTemplate && (
          <button className="card-btn" onClick={onSaveTemplate}>保存为模板</button>
        )}
      </div>
      <div ref={wrapperRef} style={{display:'inline-block'}}>
        <div
          ref={cardRef}
          className={`cyber-card card-${template}`}
          style={{ ...(customBgType !== 'template' ? customStyle : {}), width: cardWidth }}
        >
          <div className="card-inner" style={{ background: innerBg }}>
            {showAvatar && (
              <AvatarUpload 
                avatar={avatar}
                onAvatarChange={onAvatarChange}
              />
            )}
            {showDate && (
              <div className="cyber-date" contentEditable suppressContentEditableWarning onBlur={e => setDate(e.target.innerText)}>{date}</div>
            )}
            <div
              className="cyber-content"
              contentEditable
              suppressContentEditableWarning
              onBlur={e => setContent(e.target.innerText)}
              onPaste={handlePaste}
            >{content}</div>
            <div className="cyber-footer">
              {showAuthor && (
                <span className="cyber-author" contentEditable suppressContentEditableWarning onBlur={e => setAuthor(e.target.innerText)}>{author}</span>
              )}
              {showCount && (
                <span className="cyber-count">字数: {wordCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

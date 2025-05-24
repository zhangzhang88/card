import React from 'react';
import './TemplateList.css';

export default function TemplateList({ selected, onSelect, templates, onDeleteCustom, customTemplates }) {
  // 系统模板分组（含"默认"）
  const systemTemplates = templates.filter(t => !t.key.startsWith('custom_'));
  // 自定义模板分组
  const customTemplatesList = templates.filter(t => t.key.startsWith('custom_'));

  return (
    <div className="template-list">
      <div className="template-group">
        <div className="template-group-title">系统模板</div>
        {systemTemplates.map(t => (
          <div
            key={t.key}
            className={`template-item${selected === t.key ? ' selected' : ''}`}
            style={{ background: t.color, border: t.border || 'none', position: 'relative' }}
            onClick={() => onSelect && onSelect(t.key)}
          >
            <div className="template-name">{t.name}</div>
          </div>
        ))}
      </div>
      {customTemplatesList.length > 0 && (
        <>
          <div className="template-divider" />
          <div className="template-group">
            <div className="template-group-title">自定义模板</div>
            {customTemplatesList.map((t, idx) => (
              <div
                key={t.key}
                className={`template-item${selected === t.key ? ' selected' : ''}`}
                style={{ background: t.color, border: t.border || 'none', position: 'relative' }}
                onClick={() => onSelect && onSelect(t.key)}
              >
                <div className="template-name">{`自定义${idx + 1}`}</div>
                {onDeleteCustom && (
                  <span className="template-delete" title="删除" onClick={e => { e.stopPropagation(); onDeleteCustom(t.key); }}>×</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 
import React from 'react';
import './AvatarUpload.css';

export default function AvatarUpload({ avatar, onAvatarChange }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请上传图片文件');
        return;
      }
      
      // 检查文件大小（限制为2MB）
      if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过2MB');
        return;
      }
      
      // 转换为base64
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="avatar-upload"
      />
      <label htmlFor="avatar-upload">
        <div className="avatar-container">
          {avatar ? (
            <img src={avatar} alt="用户头像" className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">
              <span>上传头像</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
} 
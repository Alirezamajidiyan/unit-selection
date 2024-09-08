// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // برای نسخه‌های جدید React
import { BrowserRouter } from 'react-router-dom'; // برای مسیریابی
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // اطمینان از لود شدن فایل جاوا اسکریپت صحیح
import './style.css';

// ایجاد ریشه و رندر کردن اپلیکیشن با استفاده از BrowserRouter
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

// تنظیم عنوان سند HTML
document.title = 'برنامه کلاسی';

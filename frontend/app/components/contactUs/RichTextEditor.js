"use client"; // Add this at the top of the file to make it a Client Component
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from '@/app/styles/RichTextEditor.module.css'; // Optional: Add your custom styles
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const RichTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <div className={styles.editorContainer}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your message here..."
      />
    </div>
  );
};

export default RichTextEditor;


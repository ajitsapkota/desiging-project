import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { validateFile } from '../utils/fileHandlers';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: { file: File; title: string; description: string }) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (file: File) => {
    try {
      validateFile(file);
      setFile(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Please provide both an image and a title');
      return;
    }
    onUpload({ file, title, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Pin</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center
              ${dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300'}
              ${file ? 'border-solid' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg">Drag and drop or click to upload</p>
                  <p className="text-sm text-gray-500">Recommendation: Use high-quality .jpg files</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                >
                  Choose File
                </button>
              </div>
            ) : (
              <img src={preview} alt="Preview" className="max-h-[500px] mx-auto rounded-lg" />
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Add a title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Tell everyone what your Pin is about"
                rows={3}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 disabled:opacity-50"
                disabled={!file || !title}
              >
                Create Pin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
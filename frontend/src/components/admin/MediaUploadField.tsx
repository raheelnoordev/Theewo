import { Loader, Upload } from 'lucide-react';
import api from '../../utils/api';

type MediaType = 'image' | 'video';

interface MediaUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  type?: MediaType;
  uploading: boolean;
  onUploadingChange: (v: boolean) => void;
}

export default function MediaUploadField({
  label,
  value,
  onChange,
  type = 'image',
  uploading,
  onUploadingChange,
}: MediaUploadFieldProps) {
  const endpoint = type === 'video' ? '/upload/video' : '/upload/image';
  const accept = type === 'video' ? 'video/mp4,video/webm' : 'image/*';

  const handleFile = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    try {
      onUploadingChange(true);
      const res = await api.post(endpoint, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      onChange(res.data.url);
    } catch {
      alert(`${type === 'video' ? 'Video' : 'Image'} upload failed. Try again.`);
    } finally {
      onUploadingChange(false);
    }
  };

  return (
    <div className="sm:col-span-2">
      <label className="admin-label">{label}</label>
      {value ? (
        <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          {type === 'image' ? (
            <img src={value} alt="Preview" className="w-20 h-20 rounded-lg object-cover border border-slate-200" />
          ) : (
            <video src={value} className="w-32 h-20 rounded-lg object-cover border border-slate-200" muted playsInline />
          )}
          <div className="flex-grow min-w-0">
            <p className="text-xs text-muted truncate">{value}</p>
            <button type="button" onClick={() => onChange('')} className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700">
              Remove & upload new
            </button>
          </div>
        </div>
      ) : (
        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-brand-50/50 transition-colors">
          <Upload className="w-6 h-6 text-muted mb-2" />
          <span className="text-sm font-medium text-ink">Click to upload {type === 'video' ? 'video' : 'image'}</span>
          <span className="text-xs text-muted mt-1">{type === 'video' ? 'MP4 or WebM, max 50MB' : 'JPG, PNG, WebP, max 5MB'}</span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = '';
            }}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
              <Loader className="w-6 h-6 text-brand-600 animate-spin" />
            </div>
          )}
        </label>
      )}
    </div>
  );
}

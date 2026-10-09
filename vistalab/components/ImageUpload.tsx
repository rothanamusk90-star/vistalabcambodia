import React, { useState } from 'react';

function compressImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) return Promise.reject(new Error('Choose an image file.'));
  if (file.size > 12 * 1024 * 1024) return Promise.reject(new Error('Choose an image smaller than 12 MB.'));

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const maxSide = 720;
      const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Could not process this image.'));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/webp', 0.7);
      URL.revokeObjectURL(objectUrl);
      if (dataUrl.length > 280_000) {
        reject(new Error('This image is still too large after compression. Try a smaller image.'));
        return;
      }
      resolve(dataUrl);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read this image.'));
    };
    image.src = objectUrl;
  });
}

export function ImageUpload({ label, image, lang, onChange }: { label: string; image?: string; lang: 'EN' | 'KH'; onChange: (image: string) => void }) {
  const [error, setError] = useState('');

  return (
    <div className="space-y-2 sm:col-span-2">
      <label className="block text-xs font-bold text-slate-700">
        {label}
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full rounded-xl border border-slate-300 p-2 text-xs"
          onChange={async (event) => {
            const input = event.currentTarget;
            const file = input.files?.[0];
            if (!file) return;
            setError('');
            try { onChange(await compressImage(file)); }
            catch (uploadError) {
              const message = uploadError instanceof Error ? uploadError.message : 'Image upload failed.';
              setError(lang === 'KH' ? (message.includes('12 MB') ? 'សូមជ្រើសរើសរូបភាពដែលមានទំហំតូចជាង ១២ MB។' : message.includes('image file') ? 'សូមជ្រើសរើសឯកសាររូបភាព។' : 'មិនអាចបញ្ចូលរូបភាពនេះបានទេ។') : message);
            }
            input.value = '';
          }}
        />
      </label>
      {image && (
        <div className="flex items-center gap-3">
          <img src={image} alt="Upload preview" className="h-16 w-20 rounded-lg border border-slate-200 object-cover" />
          <button type="button" onClick={() => onChange('')} className="text-xs font-semibold text-red-700 hover:underline">{lang === 'KH' ? 'លុបរូបភាព' : 'Remove image'}</button>
        </div>
      )}
      {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
    </div>
  );
}

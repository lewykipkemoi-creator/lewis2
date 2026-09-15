"use client";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#12121b] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-[15px]">{title}</div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-lg leading-none">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

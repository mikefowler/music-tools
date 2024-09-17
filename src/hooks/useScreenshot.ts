import html2canvas from 'html2canvas';
import { useCallback } from 'react';

const useScreenshot = (ref: React.RefObject<HTMLElement>) => {
  const save = useCallback(async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current);
    const jpg = canvas.toDataURL();

    const link = document.createElement('a');
    link.href = jpg;
    link.download = `fretboard-${Date.now().valueOf()}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [ref]);

  const copy = useCallback(async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current);
    const jpg = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      });
    });
    navigator.clipboard.write([new ClipboardItem({ 'image/png': jpg })]);
  }, [ref]);

  return {
    save,
    copy,
  };
};

export default useScreenshot;

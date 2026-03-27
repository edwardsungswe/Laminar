import { useCallback, useRef } from "react";

interface HtmlEmailRendererProps {
  html: string;
}

export function HtmlEmailRenderer({ html }: HtmlEmailRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;

    const height = iframe.contentDocument.body.scrollHeight;
    iframe.style.height = `${height}px`;
  }, []);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      onLoad={handleLoad}
      title="Email content"
      className="w-full rounded-lg border-0"
      style={{ minHeight: 200 }}
    />
  );
}

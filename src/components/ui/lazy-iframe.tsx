"use client";

import * as React from 'react';

type Props = React.IframeHTMLAttributes<HTMLIFrameElement> & {
  placeholder?: React.ReactNode;
};

export default function LazyIframe({ src, title, width = '100%', height = '400', placeholder, style, ...rest }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      });
    }, { rootMargin: '250px' });

    obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width }} className="w-full">
      {visible ? (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          style={style}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          {...rest}
        />
      ) : (
        <div className="h-full w-full rounded-lg bg-muted/30 border border-muted/20 flex items-center justify-center">
          {placeholder ?? <div className="text-sm text-muted-foreground">Đang tải nội dung...</div>}
        </div>
      )}
    </div>
  );
}

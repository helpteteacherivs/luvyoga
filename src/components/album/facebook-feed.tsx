'use client';

export default function FacebookFeed() {
  const facebookPageUrl = "https://www.facebook.com/LuvYoga.Official";
  const encodedUrl = encodeURIComponent(facebookPageUrl);

  return (
    <div className="w-full max-w-xl">
        <iframe
            src={`https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
            width="500"
            height="800"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
    </div>
  );
}

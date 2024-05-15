let extractYoutubeUrls = () => {
  const iframes = document.getElementsByTagName('iframe');
  const urls = [];
  for (let iframe of iframes) {
      if (iframe.src.includes('youtube.com/embed/')) {
          const url = new URL(iframe.src);
          const videoId = url.pathname.split('/')[2];
          urls.push(`https://youtu.be/${videoId}`);
      }
  }
  return urls.length > 0 ? urls : null;
}

export default extractYoutubeUrls;

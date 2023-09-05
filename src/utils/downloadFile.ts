/**
 * Get the file name based on the file url
 * @param url file url
 */
function getFileName(url) {
  const num = url.lastIndexOf('/') + 1;
  let fileName = url.substring(num);
  //Separate parameters from filename
  fileName = decodeURI(fileName.split('?')[0]);
  return fileName;
}

/**
 * Download the file according to the file address
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName,
}: {
  url: string;
  target?: '_self' | '_blank';
  fileName?: string;
}): Promise<boolean> {
  // Is it homologous
  const isSameHost = new URL(url).host == location.host;
  return new Promise<boolean>((resolve, reject) => {
    if (isSameHost) {
      const link = document.createElement('a');
      link.href = url;
      link.target = target;

      if (link.download !== undefined) {
        link.download = fileName || getFileName(url);
      }

      if (document.createEvent) {
        const e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return resolve(true);
      }

      if (url.indexOf('?') === -1) {
        url += '?download';
      }

      window.open(url, target);
      return resolve(true);
    } else {
      const canvas = document.createElement('canvas');
      const img = document.createElement('img');
      img.setAttribute('crossOrigin', 'Anonymous');
      img.src = url;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d')!;
        context.drawImage(img, 0, 0, img.width, img.height);
        // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
        // saveAs(imageDataUrl, 'attachment');
        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          // @ts-ignore
          link.href = window.URL.createObjectURL(blob);
          link.download = getFileName(url);
          link.click();
          URL.revokeObjectURL(link.href);
          resolve(true);
        }, 'image/jpeg');
      };
      img.onerror = (e) => reject(e);
    }
  });
}

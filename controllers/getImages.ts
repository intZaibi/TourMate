async function getImages(keywords:string[]) {
  if (keywords.length>0) {
    
    try {
      let images: string[] = []
      keywords.forEach(async (keyword:string) => {
        const response = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap ${keyword}&gsrnamespace=6&prop=imageinfo&iiprop=url|user|extmetadata&format=json`)
        const imageData = await response.json();
        Object.values(imageData.query.pages).forEach((image:any) => {
          const title = image.title.toLowerCase();
          const url = image.imageinfo[0]?.url.toLowerCase();
        
          if (title.includes('islamabad') && (url?.endsWith('.jpg') || url?.endsWith('.png'))) {
            images.push(image.imageinfo[0]?.url);
          }
        });
        
      });
      
      return images
    } catch (error) {
      
      return `error fetching images: ${error}`
    }
  }
}
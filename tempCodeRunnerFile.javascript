async function fetchIslamabadImages() {
  // const categoryUrl = 'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Islamabad&cmtype=file&cmlimit=10&format=json&origin=*';
  // const categoryResp = await fetch(categoryUrl);
  const categorymembers = [
    {
      "pageid": 118609075,
      "ns": 6,
      "title": "File:\" image of Cox’s Bazar Islamabad Union village pahashiakhali.jpg"
    },
    {
      "pageid": 61923404,
      "ns": 6,
      "title": "File:20150515 113328 Richtone(HDR) (17480760570).jpg"
    },
    {
      "pageid": 61923403,
      "ns": 6,
      "title": "File:20150517 183231 Richtone(HDR) (17588902308).jpg"
    },
    {
      "pageid": 66666815,
      "ns": 6,
      "title": "File:68 of 'The Earth and its Inhabitants. The European section of the Universal Geography by E. Reclus. Edited by E. G. Ravenstein. Illustrated by ... engravings and maps' (11126545734).jpg"
    },
    {
      "pageid": 58411233,
      "ns": 6,
      "title": "File:98765 our journey.jpg"
    },
    {
      "pageid": 73260516,
      "ns": 6,
      "title": "File:A rainy day during the month of Ramadan in Islamabad, Pakistan.jpg"
    },
    {
      "pageid": 79661472,
      "ns": 6,
      "title": "File:Afterburn (21089957098).jpg"
    },
    {
      "pageid": 68994521,
      "ns": 6,
      "title": "File:Another view of Capital city.jpg"
    },
    {
      "pageid": 144528332,
      "ns": 6,
      "title": "File:AyubBurkiIslamabad.png"
    },
    {
      "pageid": 58510548,
      "ns": 6,
      "title": "File:Beautifil flowers in centurus islamabad.jpg"
    }
  ]

  const fileTitles = categorymembers.map(item => item.title).join('|');

  // const imageInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitles)}&prop=imageinfo&iiprop=url|user|extmetadata&format=json&origin=*`;
  // const imageResp = await fetch(imageInfoUrl);
  // const imageData = await imageResp.json();

  console.log(fileTitles);
}

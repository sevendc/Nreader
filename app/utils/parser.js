import { DOMParser } from 'react-native-html-parser'

export function parseRRS(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  const titles = xmlDoc.getElementsByTagName("title")
  return [].slice.call(titles)
  //return titles ? titles : ['not found']
}

export function removeCDATA(text) {
  return text.replace("<![CDATA[", "").replace("]]>", "");
}

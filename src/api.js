import { tsvToData } from "./mapper";
/*
  An update we could make is define the order
*/
export const fetchTsvAttractions = async () => {
    const tsvResponse = await fetch('data1.tsv');
    const tsvData = await tsvResponse.text();
    return tsvToData(tsvData);
}

export const fetchJsonAttractions = async () => {
    const jsonResponse = await fetch('data2.json');
    return await jsonResponse.json();
}

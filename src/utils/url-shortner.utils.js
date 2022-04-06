import axios from "axios";

export const createShortenLink = async (uid,link,additionalInformation={}) => {
    if( !uid ) throw new Error("User ID is not present");

    const {ref1,ref2} = additionalInformation;
    const UTM_SOURCE = "utm_source=ambassador";
    const UTM_MEDIUM = "utm_medium=affiliate";
    const UTM_CAMPAIGN = `utm_campaign=${uid}`;
    const UTM_CONTENT = `utm_content=${ref1}`;
    const UTM_TERM = `utm_content=${ref2}`;

    const url = `${link}?${UTM_SOURCE}&${UTM_MEDIUM}&${UTM_CAMPAIGN}${ref1 ? "&"+UTM_CONTENT :""}${ref2 ? "&"+UTM_TERM :""}`
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

    }
    return url
    const {data} = await axios.post("https://url.carsome.com/api/generate",{
        url
    },{
        headers,
        withCredentials: true
    })
    if(!data||!data.generated.url){
        throw new Error("Didn't get shorten link")
    }
    return data.generated.url;
}
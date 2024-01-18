import OpenAI from "openai";
import axios from 'axios';
import dotenv from 'dotenv';
import SocialPost from 'social-post-api';

dotenv.config();

const social = new SocialPost(process.env.AYRSHARE_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function generateImage(prompt) {
try{
  const image = await openai.images.generate({ 
    prompt: prompt,
    n:1,
    size:"1024x1024",
    model:"dall-e-3"
  });

  uploadImage(image.data[0].url);
    return image.data[0].url;

} catch (error) {
    console.error('Erreur lors de la génération de l\'image avec OpenAI :', error);
    generatePrompt();
}
}

const getTrends = async () => {  
    const encodedParams = new URLSearchParams();
    encodedParams.set('woeid', '23424819');

    const options = {
    method: 'POST',
    url: 'https://twitter-trends5.p.rapidapi.com/twitter/request.php',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    },
    data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.trends);
        
        const top20Trends = Object.keys(response.data.trends).slice(0, 10).map(key => {
          console.log(response.data.trends[key].name);
          return response.data.trends[key].name;
        });
        

        return top20Trends 
    } catch (error) {
        console.error(error);
    }
}

const generatePrompt = async () => {
    const trends = await getTrends();
  
    const prompt = `Create a prompt for an image related to the following array: ${trends.join(', ')}`;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": prompt}],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0].message.content);
        return {url: await generateImage(completion.choices[0].message.content)}

      
    } catch (error) {
      console.error('Erreur lors de la génération du prompt avec OpenAI :', error);
    }
};

const uploadImage = async (url) => {
    try{
        const title = `🤖 Image générée par l'IA #GPT4, reflétant les tendances Twitter en France 🇫🇷 à la date du ${new Date().toLocaleDateString()}. #IA #TendancesDuJour`;
            const post = await social.post({
            "post": title,
            "platforms": ["twitter"],
            "mediaUrls": [url],
      }).catch(console.error);
    console.log(title)
    }catch(error){
        console.error('Erreur lors de l\'upload de l\'image :', error);
    }
}
  
const executeScript = async () => {
    const image = await generatePrompt();
    console.log(image);
    return image;
}

    
module.exports = executeScript
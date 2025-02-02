import OpenAI from "openai";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateTextAndImage() {
let promptTextBody = "deportation"; // placeholder

const textCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a worldly-announced academic writer." },
        {
            role: "user",
            content: `Write a 40 word horror story about ${promptTextBody}.`,
        },
    ],
});

console.log(textCompletion.choices[0].message);


if (textCompletion.choices && textCompletion.choices.length > 0 && textCompletion.choices[0].message) {
    let promptBody = textCompletion.choices[0].message.content; 
    let refinedImagePrompt = `${promptBody} (illustration without text, absolutely)(in cute, cartoon style)`;

    const translationCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a worldly-announced translator." },
            {
                role: "user",
                content: `Translate ${promptBody} to mandarin.`,
            },
        ],
    });
    
    console.log(translationCompletion.choices[0].message);

    // Generate image
    const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: refinedImagePrompt,
        size: "1024x1024",
        quality: "standard",
        n: 1,
    });

    if (imageResponse.data && imageResponse.data.length > 0) {
        console.log(imageResponse.data[0].url); // Print the URL of the generated image
    } else {
        console.log("No image generated.");
    }
} else {
    console.log("No valid text generated to use for image creation.");
}
}

generateTextAndImage().catch(console.error);
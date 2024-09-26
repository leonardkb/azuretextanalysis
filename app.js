
require('dotenv').config();
const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');
const readlineSync = require('readline-sync');

const aiEndpoint = process.env.AI_SERVICE_ENDPOINT;
const aiKey = process.env.AI_SERVICE_KEY;

const client = new TextAnalyticsClient(aiEndpoint, new AzureKeyCredential(aiKey));

async function getLanguage(text) {
    try {
        const results = await client.detectLanguage([text]);
        return results[0].primaryLanguage.name;
    } catch (error) {
        console.error('Error detecting language:', error);
        throw error;  // Re-throw the error after logging it
    }
}

async function main() {
    let userText = '';

    while (userText.toLowerCase() !== 'quit') {
        userText = readlineSync.question('\nEnter some text ("quit" to stop)\n');

        if (userText.toLowerCase() !== 'quit') {
            try {
                const language = await getLanguage(userText);
                console.log('Language:', language);
            } catch (err) {
                console.error('Error in main function:', err);
            }
        }
    }
}

main().catch(err => {
    console.error('Error in main function:', err);
});

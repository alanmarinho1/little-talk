import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-vxCHLRJGsnv1St2sa9DIQCpE",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const response: OpenAIApi = await openai.listEngines();

export default openai;
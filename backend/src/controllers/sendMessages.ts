import { Request, Response } from "express"
import { axiosInstance } from "../services/axios"

const ResponseGpt = {
    id: String,
    object: String,
    created: Number,
    choices: [{
      index: Number,
      message: {
        role: String,
        content: String,
      },
      finish_reason: String
    }],
    usage: {
      prompt_tokens: Number,
      completion_tokens: Number,
      total_tokens: Number
    }
  }

export class SendMessageController {
    async handle(req: Request, res: Response) {
        const {message} = req.body

        try {
            const result = await axiosInstance.post('/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: message}]
            })
    
            const response = result.data as typeof ResponseGpt

            const choices = response.choices.map(choice => {
                return {
                    text: choice.message.content
                }
            })

            console.log(choices)
            
            return res.json({
                response: choices.map(item => item.text).join(' ')
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
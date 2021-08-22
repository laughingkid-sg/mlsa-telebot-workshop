const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics")
const axios = require("axios")

const endpoint_url = ""

const textAnalyticsClient = new TextAnalyticsClient(
    endpoint_url,
    new AzureKeyCredential(process.env["TA_TOKEN"]))

exports.qnamaker = async (msg) => {

    const config = {
        method: "post",
        url: "" + "/qnamaker/knowledgebases/" + process.env["QnA_PATH"] + "/generateAnswer",
        headers: {
            "Authorization": process.env["QnA_TOKEN"],
            "Content-type": "application/json"
        },
        data: {
            "question": msg
        }
    }

    const respond = await axios(config)
    // console.log(respond.data)
    return respond.data.answers[0].answer == "No good match found in KB."
        ? "Opps I didn't understand that 😕"
        : respond.data.answers[0].answer
}

exports.textanalytic = async (msg) => {

    const sentimentResult = await textAnalyticsClient.analyzeSentiment([msg])
    //console.log(sentimentResult)
    
    sentimentResult.forEach(document => {
        console.log(`ID: ${document.id}`)
        console.log(`\tDocument Sentiment: ${document.sentiment}`)
        console.log(`\tDocument Scores:`)
        console.log(`\t\tPositive: ${document.confidenceScores.positive.toFixed(2)} \tNegative: ${document.confidenceScores.negative.toFixed(2)} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`)
        console.log(`\tSentences Sentiment(${document.sentences.length}):`)
        document.sentences.forEach(sentence => {
            console.log(`\t\tSentence sentiment: ${sentence.sentiment}`)
            console.log(`\t\tSentences Scores:`)
            console.log(`\t\tPositive: ${sentence.confidenceScores.positive.toFixed(2)} \tNegative: ${sentence.confidenceScores.negative.toFixed(2)} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`)
        })
    })

}
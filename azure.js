const axios = require('axios');

exports.qnamaker = async (msg) => {

    const config = {
        method: 'post',
        url: 'https://msla-telebot-demo-cs.azurewebsites.net/qnamaker/knowledgebases/' + process.env['QnA_PATH'] + '/generateAnswer',
        headers: {
            'Authorization': process.env['QnA_TOKEN'],
            'Content-type': 'application/json'
        },
        data: {
            'question' : msg
        }
    }

    const respond = await axios(config)
    // console.log(respond.data)
    return respond.data.answers[0].answer == 'No good match found in KB.'
        ? "Opps I didn't understand that 😕"
        : respond.data.answers[0].answer
}

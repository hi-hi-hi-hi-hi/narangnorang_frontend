export default request => {
    request = request.replace(/(?:\r\n|\r|\n)/g, '')

    let response = []
    data.forEach(d => {
        d.input.forEach(i => {
            if (request.search(i) > -1) {
                response = [...response, ...d.target]
            }
        })
    })

    if (response.length > 0) {
        return response[Math.floor(Math.random() * response.length)]
    }
    return '무슨 말인지 모르겠어'
}

const data = [
    {
        input: ['반가워', '즐겁'],
        target: ['나도 그래', '즐거워', '나도 반가워']
    },
    {
        input: ['씨', '썅'],
        target: ['욕하지 마세요!', '탈퇴시킬 거예요!']
    },
    {
        input: ['우울', '자살'],
        target: ['https://www.youtube.com/watch?v=wYOKtTIYcIU!']
    }
]

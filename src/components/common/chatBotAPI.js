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
    return '무슨 말인지 모르겠어요'
}

const data = [
  // 인사
  {
    input: ['안녕', '하이', '반가워', '헬로'],
    target: ['안녕하세요! 오늘은 기분이 어때요?', '반갑습니다! 오늘은 기분이 어때요?']
  },
  // 긍정
  // 기쁨
  {
    input: ['즐거', '즐겁', '행복', '신나', '좋아'],
    target: ['우와! 무슨일이 있었는지 말해줄 수 있어요?', '좋아 보여요! 무슨일이 있었는지 말해줄 수 있어요?']
  },
  // 사랑
  {
    input: ['사랑해'],
    target: ['나도 사랑해~']
  },
  // 감사
  {
    input: ['고마워', '감사'],
    target: ['데헷']
  },
  // #1
  {
    input: ['당첨', '다퉜'],
    target: ['우와!', '축하해요!']
  },
  // 부정
  // 욕
  {
    input: ['시발', 'ㅅㅂ', '병신', 'ㅄ', '썅', '바보', '멍청', '꺼져'],
    target: ['욕하지 마세요!', '너무해!', '하지마!', '욕 흐즈믈르그', '욕 멈춰!']
  },
  // 분노
  {
    input: ['짜증', '화나', '화가나', '나빠', '안좋아'],
    target: ['무슨일이 있었는지 말해줄 수 있어요?']
  },
  // 슬픔
  {
    input: ['슬퍼', '슬픈', '우울'],
    target: ['ㅠㅠㅠ 무슨일이 있었는지 말해줄 수 있어요?']
  },
  // #1
  {
    input: ['싸웠', '다퉜'],
    target: ['ㅠㅠㅠ 속상하시겠어요', '저런... 괜찮아요?']
  },
  // 역질문
  {
    input: ['뭐해', '모해', '머ㅜ해'],
    target: ['너 생각~ 너는?', '당신 생각이요! 당신은요?']
  }
]

const qnaList1 = [
	{
		question: '1) 지난 일주일간 나는, 아무렇지도 않던 일들이 괴롭고 귀찮게 느껴졌다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '2) 지난 일주일간 나는, 먹고 싶지 않고 식욕이 없다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '3) 지난 일주일간 나는, 어느 누가 도와준다 하더라도 나의 울적한 기분을 떨쳐 버릴 수 없을 것 같다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '4) 지난 일주일간 나는, 무슨 일을 하던 정신을 집중하기가 힘들었다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '5) 지난 일주일간 나는, 비교적 잘 지냈다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 3
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 2
			},
			{
				text: '종종 있었다(3~4일)',
				value: 1
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 0
			}
		]
	},
	{
		question: '6) 지난 일주일간 나는, 상당히 우울했다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '7) 지난 일주일간 나는, 모든 일들이 힘들게 느껴졌다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '8) 지난 일주일간 나는, 앞일이 암담하게 느껴졌다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '9) 지난 일주일간 나는, 지금까지의 내 인생은 실패작이라는 생각이 들었다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '10) 지난 일주일간 나는, 적어도 보통 사람들만큼의 능력은 있었다고 생각한다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 3
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 2
			},
			{
				text: '종종 있었다(3~4일)',
				value: 1
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 0
			}
		]
	},
	{
		question: '11) 지난 일주일간 나는, 잠을 설쳤다(잠을 잘 이루지 못했다).',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '12) 지난 일주일간 나는, 두려움을 느꼈다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '13) 지난 일주일간 나는, 평소에 비해 말수가 적었다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '14) 지난 일주일간 나는, 세상에 홀로 있는 듯 한 외로움을 느꼈다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '15) 지난 일주일간 나는, 큰 불만 없이 생활했다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 3
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 2
			},
			{
				text: '종종 있었다(3~4일)',
				value: 1
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 0
			}
		]
	},
	{
		question: '16) 지난 일주일간 나는, 사람들이 나에게 차갑게 대하는 것 같았다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '17) 지난 일주일간 나는, 갑자기 울음이 나왔다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '18) 지난 일주일간 나는, 마음이 슬펐다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '19) 지난 일주일간 나는, 사람들이 나를 싫어하는 것 같았다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	},
	{
		question: '20) 지난 일주일간 나는, 도무지 뭘 해 나갈 엄두가 나지 않았다.',
		answer: [
			{
				text: '극히 드물다(1일 미만)',
				value: 0
			},
			{
				text: '가끔 있었다(1~2일)',
				value: 1
			},
			{
				text: '종종 있었다(3~4일)',
				value: 2
			},
			{
				text: '대부분 그랬다(5일 이상)',
				value: 3
			}
		]
	}
]

export default qnaList1

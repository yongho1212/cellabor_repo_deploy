export interface Post {
    id: string;
    title: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    createdAt: string;
    views: number;
    location: string;
    tags: string[];
    time: string;
    gender: string[];
    age: string[];
    content: string;
    images: string[];
}

export const mockPosts: Post[] = [
    {
        id: '1',
        title: '서울 활동메이트 구해요! 파트 절대 X',
        author: {
            id: '1',
            name: '글쓴이닉네임',
            avatar: '/place-holder.svg'
        },
        createdAt: '2024.09.08 18:51',
        views: 84,
        location: '서울 용산구',
        tags: ['월', '화', '목', '일'],
        time: 'AM 11:00 - PM 3:00',
        gender: ['여자', '복잡 악대욕'],
        age: ['20대초', '20대후반'],
        content: `서울 활영 메이트 구해요 ! (5주, 연말, 연초, 종종, 많달) 서로의 삶을 방해 , 우정도 만들고 싶어요. 사진찌기 서로 좋고 오래있으면서 시간제 - 우주만권 가기.. 맛집, 카페, 먹사거, 핫플같은 감성어야 생활 하고 싶어요. 매주 활영해여^ 오래볼거구, 한달에는 다금 점심요에 이시간도 괜찮에 활형하시도 구해요 ! 위대한 삶에앗 과당과 먹사시 놀이대이구, 랜덤도 구독 밥은 주거리 만들도 놀이더라요. - 사진 측면욥문도 기능 - 저는 주로 여유 받안 하상용 맊라 해보니다. 산머물누 산상을 비용 올일장 나을 알아아서 만내어서 항상화 해이드셔요! 히로 나서히 12시간만 저지활하는 활발은 하루가가 해오세요. 시햬히 사모니 소금을 밤을 종일 많은 알라던 사람 갈하가고 잡결으면 좋겠씁니다. 202일활활, 받로 2-4개활 활도 해봅니다. 시오 활형 정이 욥며 공유하고 싶수있어 말포 맛배시 해오세 좋겠어요. 서로 활영에 동의이 인생은에 좋겠씁니다.`,
        images: [
            '/place-holder.svg',
            '/place-holder.svg',
            '/place-holder.svg',
            '/place-holder.svg'
        ]
    },
    {
        id: '2',
        title: '주말 등산 메이트 구합니다',
        author: {
            id: '2',
            name: '산돌이',
            avatar: '/place-holder.svg'
        },
        createdAt: '2024.09.07 10:30',
        views: 56,
        location: '서울 전체',
        tags: ['토', '일'],
        time: 'AM 7:00 - PM 2:00',
        gender: ['남자', '여자'],
        age: ['20대', '30대'],
        content: '주말마다 서울 근교 산을 등반하실 분을 찾습니다. 초보자도 환영이에요!',
        images: [
            '/place-holder.svg',
            '/place-holder.svg'
        ]
    },
    // 추가 목업 데이터...
];

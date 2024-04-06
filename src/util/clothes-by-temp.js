export function getClothes({temp}){
    console.log(temp);
    switch(temp){
        case temp<=5:     
            return "두꺼운 패딩 코디가 권장됩니다.";
        case temp>5 && temp<=10:
            return "경량패딩, 코트를 활용하여 스타일과 따뜻함을 모두 챙겨보는건 어떤가요?.";
        case temp >10 && temp <=15:

            return "바람막이를 이용한 고프코어나 편안한 워크웨어 테마로 활동적인 하루를 보내봅시다.";
        case temp >15 && temp <=25:
            return "오늘은 후드티나 얇은 자켓을 활용한 캐주얼 코디는 어떤가요?";
        case temp > 20 :  
            return "세련된 그래픽이 들어간 반팔 코디가 권장됩니다.";
        default:
            return null;
    }
}
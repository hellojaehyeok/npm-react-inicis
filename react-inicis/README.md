# React KG Inicis

이니시스 홈페이지에는 javascript로 만들어진 개발 가이드가 없기 때문에 직접 만들어 구현하였습니다.


## Tutorial
해당 라이브러리는 프론트엔드 쪽만 작성하였으며 백엔드 로직은 따로 구현해야 합니다.      

이니시스 결제의 큰 틀을 보자면 아래와 같습니다.      
1. 결제 페이지에서 구매자가 정보를 입력합니다.
2. 입력한 정보들을 토대로 결제창을 활성화합니다.
3. 이니시스에서는 결제 로직을 처리 후 retunUrl로 데이터를 넘깁니다.
4. 백엔드는 넘겨받은 데이터를 분기 처리 후 프론트로 리디렉션 시킵니다.

<br /><br />

## Installation
```
npm install @@hellojh/react-inicis
```

<br /><br />

## Components
|이름   | 설명 |
|------|-----|
|`<ReactInicis />`|결제창을 활성화하는 컴포넌트입니다.|
|`<CloseInicis/>`|결제창을 닫기 위한 컴포넌트입니다.|


<br /><br />

## Main Props
`<ReactInicis />`에 넘겨야하는 props들입니다.


### payData
결제데이터를 넘겨줍니다.

|key   | value |
|------|-----|
|productName|물건 이름|
|productPrice|물건 가격|
|buyerName|구매자 이름|
|buyerTel|구매자 번호|
|buyerEmail|구매자 이메일|
|payStatus|결제 수단 (0-카드, 1-무통장, 2-핸드폰, 3-계좌이체)|
|returnUrl|리턴받을 url|
|closeUrl|결제창을 닫기 위한 url|


ex)
```
const payData = {
    productName:"flower",
    productPrice:"2000",
    buyerName:"sjh",
    buyerTel:"01011112222",
    buyerEmail:"test@test.com",
    payStatus:0, 
    returnUrl:"http://localhost:3000",
    closeUrl:"http://localhost:3000/closeInicis",
}
```

* returnUrl

결제를 요청하는 페이지의 도메인과 동일해야합니다.
도메인앞에 www도 신경써주셔야하며 포트번호 또한 주의하셔야합니다.

로컬에서 테스트를 할때는 실서버에 올려 포트번호를 숨긴 다음 `실서버:서버포트번호`로 returnUrl을 넣습니다.







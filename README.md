# React KG Inicis

이니시스 홈페이지에는 React.js로 만들어진 개발 가이드가 없기 때문에 직접 만들어 구현하였습니다.

![pc](https://user-images.githubusercontent.com/62782245/145717586-f99cb956-debd-4cd4-bb8e-b32b66266144.gif)

<img src="https://user-images.githubusercontent.com/62782245/145717716-91c4b5a9-55e6-4dc5-9859-6d3b579d038a.gif" width="50%"/>


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
npm install @hellojh/react-inicis
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

|Key   | Description |
|------|-----|
|productName|물건 이름|
|productPrice|물건 가격|
|buyerName|구매자 이름|
|buyerTel|구매자 번호|
|buyerEmail|구매자 이메일|
|payStatus|결제 수단 (0-카드, 1-무통장, 2-핸드폰, 3-계좌이체)|
|returnUrl|리턴받을 url|
|closeUrl|결제창을 닫기 위한 url|
|telStatus|휴대폰결제 필수 [1:컨텐츠, 2:실물]|
|mKey| (* 실서비스) 발급받은 mKey를 넣어줍니다. (isTest가 true일 때는 넣지 않아도 됩니다.) |
|mid|  (* 실서비스) 클라이언트의 id를 넣습니다. (isTest가 true일 때는 넣지 않아도 됩니다.) |


ex)
```javascript
const payData = {
    productName:"flower",
    productPrice:"2000",
    buyerName:"sjh",
    buyerTel:"01011112222",
    buyerEmail:"test@test.com",
    payStatus:2, 
    returnUrl:"http://localhost:3000",
    closeUrl:"http://localhost:3000/close",
    telStatus:1,
    mKey:"---",
    mid:"---",
}
```

* returnUrl

결제를 요청하는 페이지의 도메인과 동일해야 합니다.      
도메인 앞에 www도 신경 써주셔야하며 포트 번호 또한 주의하셔야합니다.       

로컬에서 테스트를 할 때는 실서버에 올려 포트 번호를 숨긴 다음        
`실서버:서버포트번호`로 returnUrl을 넣습니다.      
       
백엔드는 리턴받은 데이터를 분기처리 후 프론트쪽으로 리디렉션 시켜줍니다.    

<br />

* closeUrl

이니시스 결제창을 닫기 위한 페이지를 만들어 줍니다.       
`return문` 안에 `<CloseInicis/>`를 불러와줍니다.
ex)
```javascript
import { CloseInicis } from '@hellojh/react-inicis';
import React from 'react';

const Close = () => <CloseInicis /> ;
export default Close;
```


### isPurchase

결제창을 활성화시키기 위한 props입니다.      
isPurchase 값이 증가 되는 순간 결제창이 나옵니다.      


### isTest

테스트 환경일 때 true 값을 전달해 줍니다.        
이 환경에서는 payData의 mKey와 mid를 넣지 않아도 됩니다.      


<br /><br />

## Sample Code
```jsx
import { ReactInicis } from '@hellojh/react-inicis';
import React, {useState} from 'react';

const Inicis = () => {
    
    const [isPurchase, setIsPurchase] = useState(0);

    const payData = {
        productName:"물건이름",
        buyerName:"홍길동",
        buyerTel:"01011112222",
        buyerEmail:"test@test.com",
        productPrice:1000,
        payStatus:0,
        returnUrl:"http://localhost:3000/",
        closeUrl:"http://localhost:3000/close",
    }

    return(
        <div className="App">
            <button onClick={() => setIsPurchase(isPurchase+1)}>결제</button>
            <ReactInicis payData={payData} isPurchase={isPurchase} isTest />
        </div>
    )
};

export default Inicis;
```



<strong>이 코드로 인해 발생되는 문제에 대하여는 책임지지 않습니다.</strong>
import React, {useState, useEffect, useRef} from 'react';
import SHA256 from '../utils/SHA256';
import MakeTimeStamp from '../utils/makeTimeStamp';
import RandomStringFunc from '../utils/randomStringFunc';

const testURL = "https://stgstdpay.inicis.com/stdjs/INIStdPay.js";
const releaseURL = "https://stdpay.inicis.com/stdjs/INIStdPay.js";

// PC 결제수단 반환
const payServerText = (index) => {
    if(index == 0){
        return "Card"; // 카드
    }else if(index == 1){
        return "VBank"; // 무통장
    }else if(index == 2){
        return "HPP"; // 핸드폰
    }else if(index == 3){
        return "DirectBank"; // 계좌이체
    }
}

// Mobile 결제수단 반환
const payServerTextMb = (index) => {
    if(index == 0){
        return "CARD"; // 카드
    }else if(index == 1){
        return "VBANK"; // 무통장
    }else if(index == 2){
        return "MOBILE"; // 핸드폰
    }else if(index == 3){
        return "BANK"; // 계좌이체
    }
}


const ReactInicis = ({payData, isPurchase, isTest}) => {
    const mobilePurchaseRef = useRef();
    const [timestamp, setTimestamp] = useState(0);
    const [oid, setOid] = useState(0);

    useEffect(() => {
        if(!isPurchase){return}
        onClickPurchase();
    }, [isPurchase])

    // 구매하기 버튼 클릭
    const onClickPurchase = () => {
        const _timeStamp = MakeTimeStamp();
        setTimestamp(_timeStamp);
        setOid(_timeStamp + RandomStringFunc(7));
        const body = document.querySelector("body");

        // PC
        if(body.offsetWidth > 1024){
            var agt = navigator.userAgent.toLowerCase();
            const script = document.createElement("script");
            script.src = isTest?testURL:releaseURL;
            document.head.appendChild(script);
            script.onload = e => {
                if( (navigator.appName == 'Netscape' && agt.indexOf('trident') != -1) || (agt.indexOf("msie") != -1) ||  agt.indexOf('edge')) {
                    e.srcElement.ownerDocument.defaultView.INIStdPay.pay('SendPayForm_id');
                }else{
                    e.path[3].defaultView.INIStdPay.pay('SendPayForm_id');
                }
            }
        }else{ // MOBILE
            mobilePurchaseRef.current.action = "https://mobile.inicis.com/smart/payment/";
            mobilePurchaseRef.current.target = "_self";
            mobilePurchaseRef.current.submit(); 
        }
    }

    return(
        <div style={{display:"none"}}>

            {/* 이니시스 PC 결제 폼 */}
            <form id="SendPayForm_id" name="" method="Post">
                <input type="text"   readOnly name="goodname" value={payData.productName} />
                <input type="text"   readOnly name="buyername" value={payData.buyerName} />
                <input type="text"   readOnly name="buyertel" value={payData.buyerTel} />
                <input type="text"   readOnly name="buyeremail" value={payData.buyerEmail} /> 
                <input type="text"   readOnly name="price" value={payData.productPrice} />
                <input type="hidden" readOnly name="mid" value={isTest?"INIpayTest":payData.mid} /> 
                <input type="hidden" readOnly name="gopaymethod" value={payServerText(payData.payStatus)} />  
                <input type="hidden" readOnly name="mKey" value={
                    isTest?
                    "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33"
                    :
                    SHA256(payData.mKey)
                    } /> 
                <input type="hidden" readOnly name="signature" value={SHA256(`oid=${oid}&price=${payData.productPrice}&timestamp=${timestamp}`)} /> 
                <input type="hidden" readOnly name="oid" value={oid} /> 
                <input type="hidden" readOnly name="timestamp" value={timestamp} />  
                <input type="hidden" readOnly name="version" value="1.0" /> 
                <input type="hidden" readOnly name="currency" value="WON" /> 
                
                {payData.payStatus==2&&<input type="hidden" readOnly name="acceptmethod" value={`HPP(${payData.telStatus})`} />}

                <input
                    type="hidden"
                    readOnly
                    name="returnUrl"
                    value={payData.returnUrl}
                /> 

                <input
                    type="hidden"
                    readOnly
                    name="closeUrl"
                    value={payData.closeUrl}
                />
            </form>
        
            {/* 이니시스 MOBILR 결제 폼 */}
            <form name="mobileweb" method="post" acceptCharset="euc-kr" ref={mobilePurchaseRef}> 
                <input type="text" readOnly name="P_NEXT_URL" value={payData.returnUrl}/>
                <input type="text" readOnly name="P_INI_PAYMENT" value={payServerTextMb(payData.payStatus)}/>
                <input type="text" readOnly name="P_MID" value={isTest?"INIpayTest":payData.mid}/> 
                <input type="text" readOnly name="P_OID" value={oid}/>  
                <input type="text" readOnly name="P_GOODS" value={payData.productName}/> 
                <input type="text" readOnly name="P_AMT" value={payData.productPrice}/> 
                <input type="text" readOnly name="P_UNAME" value={payData.buyerName}/> 

                {/* 휴대폰결제 필수 [1:컨텐츠, 2:실물] */}
                {payData.payStatus==2&&<input type="text" readOnly name="P_HPP_METHOD" value={payData.telStatus}/>}
            </form> 


            <button onClick={onClickPurchase}>구매하기 버튼</button>
        </div>
        
        
    )
};

export default ReactInicis;
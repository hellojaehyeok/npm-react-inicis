import React, { useEffect } from 'react';

const CloseInicis = (props) => {
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
          "https://stgstdpay.inicis.com/stdjs/INIStdPay_close.js";
        document.head.appendChild(script);
    }, []);

    return(
        <></>
    )
};

export default CloseInicis;
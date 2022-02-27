"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var testURL = "https://stgstdpay.inicis.com/stdjs/INIStdPay.js";
var releaseURL = "https://stdpay.inicis.com/stdjs/INIStdPay.js"; // 타임스탭프 제작

function makeTimeStamp() {
  var newTimestamp = null;
  newTimestamp = +new Date();
  return newTimestamp;
} // 랜덤 문자열 (oid 생성시 필요)


function randomStringFunc(index) {
  // 대문자 영문 
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ'; // 반환받을 문자열의 수

  var stringLength = index;
  var randomstring = '';

  for (var i = 0; i < stringLength; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
} // SHA256 (mKey, signature 생성시 필요)


function SHA256(s) {
  try {
    var chrsz = 8;
    var hexcase = 0;

    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    }

    function S(X, n) {
      return X >>> n | X << 32 - n;
    }

    function R(X, n) {
      return X >>> n;
    }

    function Ch(x, y, z) {
      return x & y ^ ~x & z;
    }

    function Maj(x, y, z) {
      return x & y ^ x & z ^ y & z;
    }

    function Sigma0256(x) {
      return S(x, 2) ^ S(x, 13) ^ S(x, 22);
    }

    function Sigma1256(x) {
      return S(x, 6) ^ S(x, 11) ^ S(x, 25);
    }

    function Gamma0256(x) {
      return S(x, 7) ^ S(x, 18) ^ R(x, 3);
    }

    function Gamma1256(x) {
      return S(x, 17) ^ S(x, 19) ^ R(x, 10);
    }

    function core_sha256(m, l) {
      var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
      var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
      var W = new Array(64);
      var a, b, c, d, e, f, g, h, i, j;
      var T1, T2;
      m[l >> 5] |= 0x80 << 24 - l % 32;
      m[(l + 64 >> 9 << 4) + 15] = l;

      for (var i = 0; i < m.length; i += 16) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];

        for (var j = 0; j < 64; j++) {
          if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
          T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
          T2 = safe_add(Sigma0256(a), Maj(a, b, c));
          h = g;
          g = f;
          f = e;
          e = safe_add(d, T1);
          d = c;
          c = b;
          b = a;
          a = safe_add(T1, T2);
        }

        HASH[0] = safe_add(a, HASH[0]);
        HASH[1] = safe_add(b, HASH[1]);
        HASH[2] = safe_add(c, HASH[2]);
        HASH[3] = safe_add(d, HASH[3]);
        HASH[4] = safe_add(e, HASH[4]);
        HASH[5] = safe_add(f, HASH[5]);
        HASH[6] = safe_add(g, HASH[6]);
        HASH[7] = safe_add(h, HASH[7]);
      }

      return HASH;
    }

    function str2binb(str) {
      var bin = Array();
      var mask = (1 << chrsz) - 1;

      for (var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32;
      }

      return bin;
    }

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode(c >> 6 | 192);
          utftext += String.fromCharCode(c & 63 | 128);
        } else {
          utftext += String.fromCharCode(c >> 12 | 224);
          utftext += String.fromCharCode(c >> 6 & 63 | 128);
          utftext += String.fromCharCode(c & 63 | 128);
        }
      }

      return utftext;
    }

    function binb2hex(binarray) {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";

      for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 0xF);
      }

      return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  } catch (_unused) {
    console.error("[React Inicis Error] - mKey 혹은 productPrice를 확인해주세요.");
  }
} // PC 결제수단 반환


var payServerText = function payServerText(index) {
  if (index == 0) {
    return "Card"; // 카드
  } else if (index == 1) {
    return "VBank"; // 무통장
  } else if (index == 2) {
    return "HPP"; // 핸드폰
  } else if (index == 3) {
    return "DirectBank"; // 계좌이체
  }
}; // Mobile 결제수단 반환


var payServerTextMb = function payServerTextMb(index) {
  if (index == 0) {
    return "CARD"; // 카드
  } else if (index == 1) {
    return "VBANK"; // 무통장
  } else if (index == 2) {
    return "MOBILE"; // 핸드폰
  } else if (index == 3) {
    return "BANK"; // 계좌이체
  }
};

var ReactInicis = function ReactInicis(_ref) {
  var payData = _ref.payData,
      isPurchase = _ref.isPurchase,
      isTest = _ref.isTest;
  var mobilePurchaseRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      timestamp = _useState2[0],
      setTimestamp = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      oid = _useState4[0],
      setOid = _useState4[1];

  (0, _react.useEffect)(function () {
    if (!isPurchase) {
      return;
    }

    onClickPurchase();
  }, [isPurchase]); // 구매하기 버튼 클릭

  var onClickPurchase = function onClickPurchase() {
    setTimestamp(makeTimeStamp());
    setOid(makeTimeStamp() + randomStringFunc(7));
    var body = document.querySelector("body"); // PC

    if (body.offsetWidth > 1024) {
      var agt = navigator.userAgent.toLowerCase();
      var script = document.createElement("script");
      script.src = isTest ? testURL : releaseURL;
      document.head.appendChild(script);

      script.onload = function (e) {
        if (navigator.appName == 'Netscape' && agt.indexOf('trident') != -1 || agt.indexOf("msie") != -1 || agt.indexOf('edge')) {
          e.srcElement.ownerDocument.defaultView.INIStdPay.pay('SendPayForm_id');
        } else {
          e.path[3].defaultView.INIStdPay.pay('SendPayForm_id');
        }
      };
    } else {
      // MOBILE
      mobilePurchaseRef.current.action = "https://mobile.inicis.com/smart/payment/";
      mobilePurchaseRef.current.target = "_self";
      mobilePurchaseRef.current.submit();
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("form", {
    id: "SendPayForm_id",
    name: "",
    method: "Post"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "goodname",
    value: payData.productName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "buyername",
    value: payData.buyerName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "buyertel",
    value: payData.buyerTel
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "buyeremail",
    value: payData.buyerEmail
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "price",
    value: payData.productPrice
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "mid",
    value: isTest ? "INIpayTest" : payData.mid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "gopaymethod",
    value: payServerText(payData.payStatus)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "mKey",
    value: isTest ? "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33" : SHA256(payData.mKey)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "signature",
    value: SHA256("oid=".concat(oid, "&price=").concat(payData.productPrice, "&timestamp=").concat(timestamp))
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "oid",
    value: oid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "timestamp",
    value: timestamp
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "version",
    value: "1.0"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "currency",
    value: "WON"
  }), payData.payStatus == 2 && /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "acceptmethod",
    value: "HPP(".concat(payData.telStatus, ")")
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "returnUrl",
    value: payData.returnUrl
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "closeUrl",
    value: payData.closeUrl
  })), /*#__PURE__*/_react.default.createElement("form", {
    name: "mobileweb",
    method: "post",
    acceptCharset: "euc-kr",
    ref: mobilePurchaseRef
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_NEXT_URL",
    value: payData.returnUrl
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_INI_PAYMENT",
    value: payServerTextMb(payData.payStatus)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_MID",
    value: isTest ? "INIpayTest" : payData.mid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_OID",
    value: oid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_GOODS",
    value: payData.productName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_AMT",
    value: payData.productPrice
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_UNAME",
    value: payData.buyerName
  }), payData.payStatus == 2 && /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_HPP_METHOD",
    value: payData.telStatus
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onClickPurchase
  }, "\uAD6C\uB9E4\uD558\uAE30 \uBC84\uD2BC"));
};

var _default = ReactInicis;
exports.default = _default;
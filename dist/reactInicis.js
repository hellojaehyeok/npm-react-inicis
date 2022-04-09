"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SHA = _interopRequireDefault(require("../utils/SHA256"));

var _makeTimeStamp = _interopRequireDefault(require("../utils/makeTimeStamp"));

var _randomStringFunc = _interopRequireDefault(require("../utils/randomStringFunc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var testURL = "https://stgstdpay.inicis.com/stdjs/INIStdPay.js";
var releaseURL = "https://stdpay.inicis.com/stdjs/INIStdPay.js"; // PC 결제수단 반환

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
    var _timeStamp = (0, _makeTimeStamp.default)();

    setTimestamp(_timeStamp);
    setOid(_timeStamp + (0, _randomStringFunc.default)(7));
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
    value: isTest ? "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33" : (0, _SHA.default)(payData.mKey)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "signature",
    value: (0, _SHA.default)("oid=".concat(oid, "&price=").concat(payData.productPrice, "&timestamp=").concat(timestamp))
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
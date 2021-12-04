"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactInicis = function ReactInicis(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/_react.default.createElement("div", null, "React Inicis (npm)", /*#__PURE__*/_react.default.createElement("br", null), "props : ", text);
};

var _default = ReactInicis;
exports.default = _default;
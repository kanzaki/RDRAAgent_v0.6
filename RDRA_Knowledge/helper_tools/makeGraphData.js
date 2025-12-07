var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/rescript/lib/js/caml.js
var require_caml = __commonJS({
  "node_modules/rescript/lib/js/caml.js"(exports2) {
    "use strict";
    function int_compare(x, y) {
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    }
    function bool_compare(x, y) {
      if (x) {
        if (y) {
          return 0;
        } else {
          return 1;
        }
      } else if (y) {
        return -1;
      } else {
        return 0;
      }
    }
    function float_compare(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else if (x > y || x === x) {
        return 1;
      } else if (y === y) {
        return -1;
      } else {
        return 0;
      }
    }
    function bigint_compare(x, y) {
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    }
    function string_compare(s1, s2) {
      if (s1 === s2) {
        return 0;
      } else if (s1 < s2) {
        return -1;
      } else {
        return 1;
      }
    }
    function bool_min(x, y) {
      if (x) {
        return y;
      } else {
        return x;
      }
    }
    function int_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function float_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function string_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function bool_max(x, y) {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    function int_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function float_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function string_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function i64_eq(x, y) {
      if (x[1] === y[1]) {
        return x[0] === y[0];
      } else {
        return false;
      }
    }
    function i64_ge(param, param$1) {
      var other_hi = param$1[0];
      var hi = param[0];
      if (hi > other_hi) {
        return true;
      } else if (hi < other_hi) {
        return false;
      } else {
        return param[1] >= param$1[1];
      }
    }
    function i64_neq(x, y) {
      return !i64_eq(x, y);
    }
    function i64_lt(x, y) {
      return !i64_ge(x, y);
    }
    function i64_gt(x, y) {
      if (x[0] > y[0]) {
        return true;
      } else if (x[0] < y[0]) {
        return false;
      } else {
        return x[1] > y[1];
      }
    }
    function i64_le(x, y) {
      return !i64_gt(x, y);
    }
    function i64_min(x, y) {
      if (i64_ge(x, y)) {
        return y;
      } else {
        return x;
      }
    }
    function i64_max(x, y) {
      if (i64_gt(x, y)) {
        return x;
      } else {
        return y;
      }
    }
    exports2.int_compare = int_compare;
    exports2.bool_compare = bool_compare;
    exports2.float_compare = float_compare;
    exports2.bigint_compare = bigint_compare;
    exports2.string_compare = string_compare;
    exports2.bool_min = bool_min;
    exports2.int_min = int_min;
    exports2.float_min = float_min;
    exports2.string_min = string_min;
    exports2.bool_max = bool_max;
    exports2.int_max = int_max;
    exports2.float_max = float_max;
    exports2.string_max = string_max;
    exports2.i64_eq = i64_eq;
    exports2.i64_neq = i64_neq;
    exports2.i64_lt = i64_lt;
    exports2.i64_gt = i64_gt;
    exports2.i64_le = i64_le;
    exports2.i64_ge = i64_ge;
    exports2.i64_min = i64_min;
    exports2.i64_max = i64_max;
  }
});

// node_modules/rescript/lib/js/caml_array.js
var require_caml_array = __commonJS({
  "node_modules/rescript/lib/js/caml_array.js"(exports2) {
    "use strict";
    function sub(x, offset, len2) {
      var result = new Array(len2);
      var j = 0;
      var i = offset;
      while (j < len2) {
        result[j] = x[i];
        j = j + 1 | 0;
        i = i + 1 | 0;
      }
      ;
      return result;
    }
    function len(_acc, _l) {
      while (true) {
        var l = _l;
        var acc = _acc;
        if (!l) {
          return acc;
        }
        _l = l.tl;
        _acc = l.hd.length + acc | 0;
        continue;
      }
      ;
    }
    function fill(arr, _i, _l) {
      while (true) {
        var l = _l;
        var i = _i;
        if (!l) {
          return;
        }
        var x = l.hd;
        var l$1 = x.length;
        var k = i;
        var j = 0;
        while (j < l$1) {
          arr[k] = x[j];
          k = k + 1 | 0;
          j = j + 1 | 0;
        }
        ;
        _l = l.tl;
        _i = k;
        continue;
      }
      ;
    }
    function concat(l) {
      var v = len(0, l);
      var result = new Array(v);
      fill(result, 0, l);
      return result;
    }
    function set(xs, index, newval) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      xs[index] = newval;
    }
    function get(xs, index) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      return xs[index];
    }
    function make(len2, init) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = init;
      }
      return b;
    }
    function make_float(len2) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = 0;
      }
      return b;
    }
    function blit(a1, i1, a2, i2, len2) {
      if (i2 <= i1) {
        for (var j = 0; j < len2; ++j) {
          a2[j + i2 | 0] = a1[j + i1 | 0];
        }
        return;
      }
      for (var j$1 = len2 - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
      }
    }
    function dup(prim) {
      return prim.slice(0);
    }
    exports2.dup = dup;
    exports2.sub = sub;
    exports2.concat = concat;
    exports2.make = make;
    exports2.make_float = make_float;
    exports2.blit = blit;
    exports2.get = get;
    exports2.set = set;
  }
});

// node_modules/rescript/lib/js/curry.js
var require_curry = __commonJS({
  "node_modules/rescript/lib/js/curry.js"(exports2) {
    "use strict";
    var Caml_array = require_caml_array();
    function app(_f, _args) {
      while (true) {
        var args = _args;
        var f = _f;
        var init_arity = f.length;
        var arity = init_arity === 0 ? 1 : init_arity;
        var len = args.length;
        var d = arity - len | 0;
        if (d === 0) {
          return f.apply(null, args);
        }
        if (d >= 0) {
          return /* @__PURE__ */ function(f2, args2) {
            return function(x) {
              return app(f2, args2.concat([x]));
            };
          }(f, args);
        }
        _args = Caml_array.sub(args, arity, -d | 0);
        _f = f.apply(null, Caml_array.sub(args, 0, arity));
        continue;
      }
      ;
    }
    function _1(o, a0) {
      var arity = o.length;
      if (arity === 1) {
        return o(a0);
      } else {
        switch (arity) {
          case 1:
            return o(a0);
          case 2:
            return function(param) {
              return o(a0, param);
            };
          case 3:
            return function(param, param$1) {
              return o(a0, param, param$1);
            };
          case 4:
            return function(param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            };
          case 5:
            return function(param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            };
          case 6:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            };
          default:
            return app(o, [a0]);
        }
      }
    }
    function __1(o) {
      var arity = o.length;
      if (arity === 1) {
        return o;
      } else {
        return function(a0) {
          return _1(o, a0);
        };
      }
    }
    function _2(o, a0, a1) {
      var arity = o.length;
      if (arity === 2) {
        return o(a0, a1);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [a1]);
          case 2:
            return o(a0, a1);
          case 3:
            return function(param) {
              return o(a0, a1, param);
            };
          case 4:
            return function(param, param$1) {
              return o(a0, a1, param, param$1);
            };
          case 5:
            return function(param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            };
          case 6:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            };
          default:
            return app(o, [
              a0,
              a1
            ]);
        }
      }
    }
    function __2(o) {
      var arity = o.length;
      if (arity === 2) {
        return o;
      } else {
        return function(a0, a1) {
          return _2(o, a0, a1);
        };
      }
    }
    function _3(o, a0, a1, a2) {
      var arity = o.length;
      if (arity === 3) {
        return o(a0, a1, a2);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2
            ]);
          case 2:
            return app(o(a0, a1), [a2]);
          case 3:
            return o(a0, a1, a2);
          case 4:
            return function(param) {
              return o(a0, a1, a2, param);
            };
          case 5:
            return function(param, param$1) {
              return o(a0, a1, a2, param, param$1);
            };
          case 6:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            };
          case 7:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2
            ]);
        }
      }
    }
    function __3(o) {
      var arity = o.length;
      if (arity === 3) {
        return o;
      } else {
        return function(a0, a1, a2) {
          return _3(o, a0, a1, a2);
        };
      }
    }
    function _4(o, a0, a1, a2, a3) {
      var arity = o.length;
      if (arity === 4) {
        return o(a0, a1, a2, a3);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3
            ]);
          case 3:
            return app(o(a0, a1, a2), [a3]);
          case 4:
            return o(a0, a1, a2, a3);
          case 5:
            return function(param) {
              return o(a0, a1, a2, a3, param);
            };
          case 6:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            };
          case 7:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3
            ]);
        }
      }
    }
    function __4(o) {
      var arity = o.length;
      if (arity === 4) {
        return o;
      } else {
        return function(a0, a1, a2, a3) {
          return _4(o, a0, a1, a2, a3);
        };
      }
    }
    function _5(o, a0, a1, a2, a3, a4) {
      var arity = o.length;
      if (arity === 5) {
        return o(a0, a1, a2, a3, a4);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [a4]);
          case 5:
            return o(a0, a1, a2, a3, a4);
          case 6:
            return function(param) {
              return o(a0, a1, a2, a3, a4, param);
            };
          case 7:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4
            ]);
        }
      }
    }
    function __5(o) {
      var arity = o.length;
      if (arity === 5) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4) {
          return _5(o, a0, a1, a2, a3, a4);
        };
      }
    }
    function _6(o, a0, a1, a2, a3, a4, a5) {
      var arity = o.length;
      if (arity === 6) {
        return o(a0, a1, a2, a3, a4, a5);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [a5]);
          case 6:
            return o(a0, a1, a2, a3, a4, a5);
          case 7:
            return function(param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
        }
      }
    }
    function __6(o) {
      var arity = o.length;
      if (arity === 6) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5) {
          return _6(o, a0, a1, a2, a3, a4, a5);
        };
      }
    }
    function _7(o, a0, a1, a2, a3, a4, a5, a6) {
      var arity = o.length;
      if (arity === 7) {
        return o(a0, a1, a2, a3, a4, a5, a6);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [a6]);
          case 7:
            return o(a0, a1, a2, a3, a4, a5, a6);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
        }
      }
    }
    function __7(o) {
      var arity = o.length;
      if (arity === 7) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return _7(o, a0, a1, a2, a3, a4, a5, a6);
        };
      }
    }
    function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
      var arity = o.length;
      if (arity === 8) {
        return o(a0, a1, a2, a3, a4, a5, a6, a7);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6,
              a7
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6,
              a7
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [
              a6,
              a7
            ]);
          case 7:
            return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
        }
      }
    }
    function __8(o) {
      var arity = o.length;
      if (arity === 8) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
        };
      }
    }
    exports2.app = app;
    exports2._1 = _1;
    exports2.__1 = __1;
    exports2._2 = _2;
    exports2.__2 = __2;
    exports2._3 = _3;
    exports2.__3 = __3;
    exports2._4 = _4;
    exports2.__4 = __4;
    exports2._5 = _5;
    exports2.__5 = __5;
    exports2._6 = _6;
    exports2.__6 = __6;
    exports2._7 = _7;
    exports2.__7 = __7;
    exports2._8 = _8;
    exports2.__8 = __8;
  }
});

// node_modules/rescript/lib/js/js_int.js
var require_js_int = __commonJS({
  "node_modules/rescript/lib/js/js_int.js"(exports2) {
    "use strict";
    function equal(x, y) {
      return x === y;
    }
    var max = 2147483647;
    var min = -2147483648;
    exports2.equal = equal;
    exports2.max = max;
    exports2.min = min;
  }
});

// node_modules/rescript/lib/js/js_math.js
var require_js_math = __commonJS({
  "node_modules/rescript/lib/js/js_math.js"(exports2) {
    "use strict";
    var Js_int = require_js_int();
    function unsafe_ceil(prim) {
      return Math.ceil(prim);
    }
    function ceil_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.ceil(f);
      }
    }
    function unsafe_floor(prim) {
      return Math.floor(prim);
    }
    function floor_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.floor(f);
      }
    }
    function random_int(min, max) {
      return floor_int(Math.random() * (max - min | 0)) + min | 0;
    }
    var ceil = ceil_int;
    var floor = floor_int;
    exports2.unsafe_ceil = unsafe_ceil;
    exports2.ceil_int = ceil_int;
    exports2.ceil = ceil;
    exports2.unsafe_floor = unsafe_floor;
    exports2.floor_int = floor_int;
    exports2.floor = floor;
    exports2.random_int = random_int;
  }
});

// node_modules/rescript/lib/js/caml_option.js
var require_caml_option = __commonJS({
  "node_modules/rescript/lib/js/caml_option.js"(exports2) {
    "use strict";
    function isNested(x) {
      return x.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
    }
    function some(x) {
      if (x === void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: 0
        };
      } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
        };
      } else {
        return x;
      }
    }
    function nullable_to_opt(x) {
      if (x == null) {
        return;
      } else {
        return some(x);
      }
    }
    function undefined_to_opt(x) {
      if (x === void 0) {
        return;
      } else {
        return some(x);
      }
    }
    function null_to_opt(x) {
      if (x === null) {
        return;
      } else {
        return some(x);
      }
    }
    function valFromOption(x) {
      if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
        return x;
      }
      var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
      if (depth === 0) {
        return;
      } else {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
        };
      }
    }
    function option_get(x) {
      if (x === void 0) {
        return;
      } else {
        return valFromOption(x);
      }
    }
    function option_unwrap(x) {
      if (x !== void 0) {
        return x.VAL;
      } else {
        return x;
      }
    }
    exports2.nullable_to_opt = nullable_to_opt;
    exports2.undefined_to_opt = undefined_to_opt;
    exports2.null_to_opt = null_to_opt;
    exports2.valFromOption = valFromOption;
    exports2.some = some;
    exports2.isNested = isNested;
    exports2.option_get = option_get;
    exports2.option_unwrap = option_unwrap;
  }
});

// node_modules/rescript/lib/js/belt_Array.js
var require_belt_Array = __commonJS({
  "node_modules/rescript/lib/js/belt_Array.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var Curry = require_curry();
    var Js_math = require_js_math();
    var Caml_option = require_caml_option();
    function get(arr, i) {
      if (i >= 0 && i < arr.length) {
        return Caml_option.some(arr[i]);
      }
    }
    function getExn(arr, i) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.res",
            36,
            2
          ],
          Error: new Error()
        };
      }
      return arr[i];
    }
    function set(arr, i, v) {
      if (i >= 0 && i < arr.length) {
        arr[i] = v;
        return true;
      } else {
        return false;
      }
    }
    function setExn(arr, i, v) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.res",
            49,
            2
          ],
          Error: new Error()
        };
      }
      arr[i] = v;
    }
    function swapUnsafe(xs, i, j) {
      var tmp = xs[i];
      xs[i] = xs[j];
      xs[j] = tmp;
    }
    function shuffleInPlace(xs) {
      var len = xs.length;
      for (var i = 0; i < len; ++i) {
        swapUnsafe(xs, i, Js_math.random_int(i, len));
      }
    }
    function shuffle(xs) {
      var result = xs.slice(0);
      shuffleInPlace(result);
      return result;
    }
    function reverseInPlace(xs) {
      var len = xs.length;
      var ofs = 0;
      for (var i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
        swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
      }
    }
    function reverse(xs) {
      var len = xs.length;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = xs[(len - 1 | 0) - i | 0];
      }
      return result;
    }
    function make(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f;
      }
      return res;
    }
    function makeByU(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f(i);
      }
      return res;
    }
    function makeBy(l, f) {
      return makeByU(l, Curry.__1(f));
    }
    function makeByAndShuffleU(l, f) {
      var u = makeByU(l, f);
      shuffleInPlace(u);
      return u;
    }
    function makeByAndShuffle(l, f) {
      return makeByAndShuffleU(l, Curry.__1(f));
    }
    function range(start, finish) {
      var cut = finish - start | 0;
      if (cut < 0) {
        return [];
      }
      var arr = new Array(cut + 1 | 0);
      for (var i = 0; i <= cut; ++i) {
        arr[i] = start + i | 0;
      }
      return arr;
    }
    function rangeBy(start, finish, step) {
      var cut = finish - start | 0;
      if (cut < 0 || step <= 0) {
        return [];
      }
      var nb = (cut / step | 0) + 1 | 0;
      var arr = new Array(nb);
      var cur = start;
      for (var i = 0; i < nb; ++i) {
        arr[i] = cur;
        cur = cur + step | 0;
      }
      return arr;
    }
    function zip(xs, ys) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = [
          xs[i],
          ys[i]
        ];
      }
      return s;
    }
    function zipByU(xs, ys, f) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = f(xs[i], ys[i]);
      }
      return s;
    }
    function zipBy(xs, ys, f) {
      return zipByU(xs, ys, Curry.__2(f));
    }
    function concat(a1, a2) {
      var l1 = a1.length;
      var l2 = a2.length;
      var a1a2 = new Array(l1 + l2 | 0);
      for (var i = 0; i < l1; ++i) {
        a1a2[i] = a1[i];
      }
      for (var i$1 = 0; i$1 < l2; ++i$1) {
        a1a2[l1 + i$1 | 0] = a2[i$1];
      }
      return a1a2;
    }
    function concatMany(arrs) {
      var lenArrs = arrs.length;
      var totalLen = 0;
      for (var i = 0; i < lenArrs; ++i) {
        totalLen = totalLen + arrs[i].length | 0;
      }
      var result = new Array(totalLen);
      totalLen = 0;
      for (var j = 0; j < lenArrs; ++j) {
        var cur = arrs[j];
        for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
          result[totalLen] = cur[k];
          totalLen = totalLen + 1 | 0;
        }
      }
      return result;
    }
    function slice(a, offset, len) {
      if (len <= 0) {
        return [];
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var copyLength = hasLen < len ? hasLen : len;
      if (copyLength <= 0) {
        return [];
      }
      var result = new Array(copyLength);
      for (var i = 0; i < copyLength; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function sliceToEnd(a, offset) {
      var lena = a.length;
      var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
      var len = lena > ofs ? lena - ofs | 0 : 0;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function fill(a, offset, len, v) {
      if (len <= 0) {
        return;
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var fillLength = hasLen < len ? hasLen : len;
      if (fillLength <= 0) {
        return;
      }
      for (var i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
        a[i] = v;
      }
    }
    function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function blit(a1, ofs1, a2, ofs2, len) {
      var lena1 = a1.length;
      var lena2 = a2.length;
      var srcofs1 = ofs1 < 0 ? Caml.int_max(lena1 + ofs1 | 0, 0) : ofs1;
      var srcofs2 = ofs2 < 0 ? Caml.int_max(lena2 + ofs2 | 0, 0) : ofs2;
      var blitLength = Caml.int_min(len, Caml.int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function forEachU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(a[i]);
      }
    }
    function forEach(a, f) {
      forEachU(a, Curry.__1(f));
    }
    function mapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(a[i]);
      }
      return r;
    }
    function map(a, f) {
      return mapU(a, Curry.__1(f));
    }
    function flatMapU(a, f) {
      return concatMany(mapU(a, f));
    }
    function flatMap(a, f) {
      return concatMany(mapU(a, Curry.__1(f)));
    }
    function getByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = Caml_option.some(v);
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getBy(a, p) {
      return getByU(a, Curry.__1(p));
    }
    function getIndexByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = i;
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getIndexBy(a, p) {
      return getIndexByU(a, Curry.__1(p));
    }
    function keepU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keep(a, f) {
      return keepU(a, Curry.__1(f));
    }
    function keepWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v, i)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepWithIndex(a, f) {
      return keepWithIndexU(a, Curry.__2(f));
    }
    function keepMapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        var v$1 = f(v);
        if (v$1 !== void 0) {
          r[j] = Caml_option.valFromOption(v$1);
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepMap(a, f) {
      return keepMapU(a, Curry.__1(f));
    }
    function forEachWithIndexU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(i, a[i]);
      }
    }
    function forEachWithIndex(a, f) {
      forEachWithIndexU(a, Curry.__2(f));
    }
    function mapWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(i, a[i]);
      }
      return r;
    }
    function mapWithIndex(a, f) {
      return mapWithIndexU(a, Curry.__2(f));
    }
    function reduceU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduce(a, x, f) {
      return reduceU(a, x, Curry.__2(f));
    }
    function reduceReverseU(a, x, f) {
      var r = x;
      for (var i = a.length - 1 | 0; i >= 0; --i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduceReverse(a, x, f) {
      return reduceReverseU(a, x, Curry.__2(f));
    }
    function reduceReverse2U(a, b, x, f) {
      var r = x;
      var len = Caml.int_min(a.length, b.length);
      for (var i = len - 1 | 0; i >= 0; --i) {
        r = f(r, a[i], b[i]);
      }
      return r;
    }
    function reduceReverse2(a, b, x, f) {
      return reduceReverse2U(a, b, x, Curry.__3(f));
    }
    function reduceWithIndexU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i], i);
      }
      return r;
    }
    function reduceWithIndex(a, x, f) {
      return reduceWithIndexU(a, x, Curry.__3(f));
    }
    function everyU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every(arr, f) {
      return everyU(arr, Curry.__1(f));
    }
    function someU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (b(arr[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some(arr, f) {
      return someU(arr, Curry.__1(f));
    }
    function everyAux2(arr1, arr2, _i, b, len) {
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr1[i], arr2[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every2U(a, b, p) {
      return everyAux2(a, b, 0, p, Caml.int_min(a.length, b.length));
    }
    function every2(a, b, p) {
      return every2U(a, b, Curry.__2(p));
    }
    function some2U(a, b, p) {
      var _i = 0;
      var len = Caml.int_min(a.length, b.length);
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (p(a[i], b[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some2(a, b, p) {
      return some2U(a, b, Curry.__2(p));
    }
    function eqU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena === lenb) {
        return everyAux2(a, b, 0, p, lena);
      } else {
        return false;
      }
    }
    function eq(a, b, p) {
      return eqU(a, b, Curry.__2(p));
    }
    function cmpU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena > lenb) {
        return 1;
      } else if (lena < lenb) {
        return -1;
      } else {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === lena) {
            return 0;
          }
          var c = p(a[i], b[i]);
          if (c !== 0) {
            return c;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function cmp(a, b, p) {
      return cmpU(a, b, Curry.__2(p));
    }
    function partitionU(a, f) {
      var l = a.length;
      var i = 0;
      var j = 0;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var ii = 0; ii < l; ++ii) {
        var v = a[ii];
        if (f(v)) {
          a1[i] = v;
          i = i + 1 | 0;
        } else {
          a2[j] = v;
          j = j + 1 | 0;
        }
      }
      a1.length = i;
      a2.length = j;
      return [
        a1,
        a2
      ];
    }
    function partition(a, f) {
      return partitionU(a, Curry.__1(f));
    }
    function unzip(a) {
      var l = a.length;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var i = 0; i < l; ++i) {
        var match = a[i];
        a1[i] = match[0];
        a2[i] = match[1];
      }
      return [
        a1,
        a2
      ];
    }
    function joinWithU(a, sep, toString) {
      var l = a.length;
      if (l === 0) {
        return "";
      }
      var lastIndex = l - 1 | 0;
      var _i = 0;
      var _res = "";
      while (true) {
        var res = _res;
        var i = _i;
        if (i === lastIndex) {
          return res + toString(a[i]);
        }
        _res = res + (toString(a[i]) + sep);
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function joinWith(a, sep, toString) {
      return joinWithU(a, sep, Curry.__1(toString));
    }
    function initU(n, f) {
      var v = new Array(n);
      for (var i = 0; i < n; ++i) {
        v[i] = f(i);
      }
      return v;
    }
    function init(n, f) {
      return initU(n, Curry.__1(f));
    }
    exports2.get = get;
    exports2.getExn = getExn;
    exports2.set = set;
    exports2.setExn = setExn;
    exports2.shuffleInPlace = shuffleInPlace;
    exports2.shuffle = shuffle;
    exports2.reverseInPlace = reverseInPlace;
    exports2.reverse = reverse;
    exports2.make = make;
    exports2.range = range;
    exports2.rangeBy = rangeBy;
    exports2.makeByU = makeByU;
    exports2.makeBy = makeBy;
    exports2.makeByAndShuffleU = makeByAndShuffleU;
    exports2.makeByAndShuffle = makeByAndShuffle;
    exports2.zip = zip;
    exports2.zipByU = zipByU;
    exports2.zipBy = zipBy;
    exports2.unzip = unzip;
    exports2.concat = concat;
    exports2.concatMany = concatMany;
    exports2.slice = slice;
    exports2.sliceToEnd = sliceToEnd;
    exports2.fill = fill;
    exports2.blit = blit;
    exports2.blitUnsafe = blitUnsafe;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.flatMapU = flatMapU;
    exports2.flatMap = flatMap;
    exports2.getByU = getByU;
    exports2.getBy = getBy;
    exports2.getIndexByU = getIndexByU;
    exports2.getIndexBy = getIndexBy;
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.keepWithIndexU = keepWithIndexU;
    exports2.keepWithIndex = keepWithIndex;
    exports2.keepMapU = keepMapU;
    exports2.keepMap = keepMap;
    exports2.forEachWithIndexU = forEachWithIndexU;
    exports2.forEachWithIndex = forEachWithIndex;
    exports2.mapWithIndexU = mapWithIndexU;
    exports2.mapWithIndex = mapWithIndex;
    exports2.partitionU = partitionU;
    exports2.partition = partition;
    exports2.reduceU = reduceU;
    exports2.reduce = reduce;
    exports2.reduceReverseU = reduceReverseU;
    exports2.reduceReverse = reduceReverse;
    exports2.reduceReverse2U = reduceReverse2U;
    exports2.reduceReverse2 = reduceReverse2;
    exports2.reduceWithIndexU = reduceWithIndexU;
    exports2.reduceWithIndex = reduceWithIndex;
    exports2.joinWithU = joinWithU;
    exports2.joinWith = joinWith;
    exports2.someU = someU;
    exports2.some = some;
    exports2.everyU = everyU;
    exports2.every = every;
    exports2.every2U = every2U;
    exports2.every2 = every2;
    exports2.some2U = some2U;
    exports2.some2 = some2;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.initU = initU;
    exports2.init = init;
  }
});

// node_modules/@rescript/core/src/Core__Array.res.js
var require_Core_Array_res = __commonJS({
  "node_modules/@rescript/core/src/Core__Array.res.js"(exports2) {
    "use strict";
    var Caml_option = require_caml_option();
    function make(length, x) {
      if (length <= 0) {
        return [];
      }
      var arr = new Array(length);
      arr.fill(x);
      return arr;
    }
    function fromInitializer(length, f) {
      if (length <= 0) {
        return [];
      }
      var arr = new Array(length);
      for (var i = 0; i < length; ++i) {
        arr[i] = f(i);
      }
      return arr;
    }
    function equal(a, b, eq) {
      var len = a.length;
      if (len === b.length) {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === len) {
            return true;
          }
          if (!eq(a[i], b[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      } else {
        return false;
      }
    }
    function compare(a, b, cmp) {
      var lenA = a.length;
      var lenB = b.length;
      if (lenA < lenB) {
        return -1;
      } else if (lenA > lenB) {
        return 1;
      } else {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === lenA) {
            return 0;
          }
          var c = cmp(a[i], b[i]);
          if (c !== 0) {
            return c;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function indexOfOpt(arr, item) {
      var index = arr.indexOf(item);
      if (index !== -1) {
        return index;
      }
    }
    function lastIndexOfOpt(arr, item) {
      var index = arr.lastIndexOf(item);
      if (index !== -1) {
        return index;
      }
    }
    function reduce(arr, init, f) {
      return arr.reduce(f, init);
    }
    function reduceWithIndex(arr, init, f) {
      return arr.reduce(f, init);
    }
    function reduceRight(arr, init, f) {
      return arr.reduceRight(f, init);
    }
    function reduceRightWithIndex(arr, init, f) {
      return arr.reduceRight(f, init);
    }
    function findIndexOpt(array, finder) {
      var index = array.findIndex(finder);
      if (index !== -1) {
        return index;
      }
    }
    function swapUnsafe(xs, i, j) {
      var tmp = xs[i];
      xs[i] = xs[j];
      xs[j] = tmp;
    }
    function random_int(min, max) {
      return (Math.floor(Math.random() * (max - min | 0)) | 0) + min | 0;
    }
    function shuffle(xs) {
      var len = xs.length;
      for (var i = 0; i < len; ++i) {
        swapUnsafe(xs, i, random_int(i, len));
      }
    }
    function toShuffled(xs) {
      var result = xs.slice();
      shuffle(result);
      return result;
    }
    function filterMap(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        var v$1 = f(v);
        if (v$1 !== void 0) {
          r[j] = Caml_option.valFromOption(v$1);
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepSome(__x) {
      return filterMap(__x, function(x) {
        return x;
      });
    }
    function findMap(arr, f) {
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === arr.length) {
          return;
        }
        var r = f(arr[i]);
        if (r !== void 0) {
          return r;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function last(a) {
      return a[a.length - 1 | 0];
    }
    exports2.make = make;
    exports2.fromInitializer = fromInitializer;
    exports2.equal = equal;
    exports2.compare = compare;
    exports2.indexOfOpt = indexOfOpt;
    exports2.lastIndexOfOpt = lastIndexOfOpt;
    exports2.reduce = reduce;
    exports2.reduceWithIndex = reduceWithIndex;
    exports2.reduceRight = reduceRight;
    exports2.reduceRightWithIndex = reduceRightWithIndex;
    exports2.findIndexOpt = findIndexOpt;
    exports2.filterMap = filterMap;
    exports2.keepSome = keepSome;
    exports2.toShuffled = toShuffled;
    exports2.shuffle = shuffle;
    exports2.findMap = findMap;
    exports2.last = last;
  }
});

// node_modules/@rescript/core/src/Core__Error.res.js
var require_Core_Error_res = __commonJS({
  "node_modules/@rescript/core/src/Core__Error.res.js"(exports2) {
    "use strict";
    var $$EvalError = {};
    var $$RangeError = {};
    var $$ReferenceError = {};
    var $$SyntaxError = {};
    var $$TypeError = {};
    var $$URIError = {};
    function panic(msg) {
      throw new Error("Panic! " + msg);
    }
    exports2.$$EvalError = $$EvalError;
    exports2.$$RangeError = $$RangeError;
    exports2.$$ReferenceError = $$ReferenceError;
    exports2.$$SyntaxError = $$SyntaxError;
    exports2.$$TypeError = $$TypeError;
    exports2.$$URIError = $$URIError;
    exports2.panic = panic;
  }
});

// node_modules/@rescript/core/src/Core__Option.res.js
var require_Core_Option_res = __commonJS({
  "node_modules/@rescript/core/src/Core__Option.res.js"(exports2) {
    "use strict";
    var Caml_option = require_caml_option();
    var Core__Error = require_Core_Error_res();
    function filter(opt, p) {
      if (opt !== void 0 && p(Caml_option.valFromOption(opt))) {
        return opt;
      }
    }
    function forEach(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function getExn(x, message) {
      if (x !== void 0) {
        return Caml_option.valFromOption(x);
      } else {
        return Core__Error.panic(message !== void 0 ? message : "Option.getExn called for None value");
      }
    }
    function mapOr(opt, $$default, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      } else {
        return $$default;
      }
    }
    function map(opt, f) {
      if (opt !== void 0) {
        return Caml_option.some(f(Caml_option.valFromOption(opt)));
      }
    }
    function flatMap(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function getOr(opt, $$default) {
      if (opt !== void 0) {
        return Caml_option.valFromOption(opt);
      } else {
        return $$default;
      }
    }
    function orElse(opt, other) {
      if (opt !== void 0) {
        return opt;
      } else {
        return other;
      }
    }
    function isSome(x) {
      return x !== void 0;
    }
    function isNone(x) {
      return x === void 0;
    }
    function equal(a, b, eq) {
      if (a !== void 0) {
        if (b !== void 0) {
          return eq(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return false;
        }
      } else {
        return b === void 0;
      }
    }
    function compare(a, b, cmp) {
      if (a !== void 0) {
        if (b !== void 0) {
          return cmp(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return 1;
        }
      } else if (b !== void 0) {
        return -1;
      } else {
        return 0;
      }
    }
    var mapWithDefault = mapOr;
    var getWithDefault = getOr;
    exports2.filter = filter;
    exports2.forEach = forEach;
    exports2.getExn = getExn;
    exports2.mapOr = mapOr;
    exports2.mapWithDefault = mapWithDefault;
    exports2.map = map;
    exports2.flatMap = flatMap;
    exports2.getOr = getOr;
    exports2.getWithDefault = getWithDefault;
    exports2.orElse = orElse;
    exports2.isSome = isSome;
    exports2.isNone = isNone;
    exports2.equal = equal;
    exports2.compare = compare;
  }
});

// node_modules/@rescript/core/src/Core__Ordering.res.js
var require_Core_Ordering_res = __commonJS({
  "node_modules/@rescript/core/src/Core__Ordering.res.js"(exports2) {
    "use strict";
    function isLess(ord) {
      return ord < 0;
    }
    function isEqual(ord) {
      return ord === 0;
    }
    function isGreater(ord) {
      return ord > 0;
    }
    function invert(ord) {
      return -ord;
    }
    function fromInt(n) {
      if (n < 0) {
        return -1;
      } else if (n > 0) {
        return 1;
      } else {
        return 0;
      }
    }
    exports2.isLess = isLess;
    exports2.isEqual = isEqual;
    exports2.isGreater = isGreater;
    exports2.invert = invert;
    exports2.fromInt = fromInt;
  }
});

// src/rdraGraph/RdraSheet2Graph.res.js
var require_RdraSheet2Graph_res = __commonJS({
  "src/rdraGraph/RdraSheet2Graph.res.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var Belt_Array = require_belt_Array();
    var Core__Array = require_Core_Array_res();
    var Core__Option = require_Core_Option_res();
    var Core__Ordering = require_Core_Ordering_res();
    var linkInfs = (obj) => obj["\u95A2\u9023\u60C5\u5831"];
    var linkStts = (obj) => obj["\u72B6\u614B\u30E2\u30C7\u30EB"];
    var linkVris = (obj) => obj["\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3"];
    function makeRdraData(data) {
      return {
        acts: data.acts.map(function(act) {
          return {
            grp: Core__Option.getOr(act["\u30A2\u30AF\u30BF\u30FC\u7FA4"], ""),
            act: Core__Option.getOr(act["\u30A2\u30AF\u30BF\u30FC"], ""),
            exp: Core__Option.getOr(act["\u8AAC\u660E"], "")
          };
        }),
        exss: data.exss.map(function(exs) {
          return {
            grp: Core__Option.getOr(exs["\u5916\u90E8\u30B7\u30B9\u30C6\u30E0\u7FA4"], ""),
            exs: Core__Option.getOr(exs["\u5916\u90E8\u30B7\u30B9\u30C6\u30E0"], ""),
            exp: Core__Option.getOr(exs["\u8AAC\u660E"], "")
          };
        }),
        infs: data.infs.map(function(inf) {
          return {
            ctx: Core__Option.getOr(inf["\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8"], ""),
            inf: Core__Option.getOr(inf["\u60C5\u5831"], ""),
            atr: Core__Option.getOr(inf["\u5C5E\u6027"], ""),
            lnkInf: linkInfs(inf),
            lnkStt: linkStts(inf),
            lnkVri: linkVris(inf),
            exp: Core__Option.getOr(inf["\u8AAC\u660E"], "")
          };
        }),
        stts: data.stts.map(function(stt) {
          return {
            ctx: Core__Option.getOr(stt["\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8"], ""),
            sttMdl: Core__Option.getOr(stt["\u72B6\u614B\u30E2\u30C7\u30EB"], ""),
            fromStt: Core__Option.getOr(stt["\u72B6\u614B"], ""),
            uc: Core__Option.getOr(stt["\u9077\u79FBUC"], ""),
            toStt: Core__Option.getOr(stt["\u9077\u79FB\u5148\u72B6\u614B"], ""),
            exp: Core__Option.getOr(stt["\u8AAC\u660E"], "")
          };
        }),
        cnds: data.cnds.map(function(cnd) {
          return {
            ctx: Core__Option.getOr(cnd["\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8"], "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8"),
            cnd: Core__Option.getOr(cnd["\u6761\u4EF6"], ""),
            exp: Core__Option.getOr(cnd["\u6761\u4EF6\u306E\u8AAC\u660E"], ""),
            vri: Core__Option.getOr(cnd["\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3"], ""),
            sttMdl: Core__Option.getOr(cnd["\u72B6\u614B\u30E2\u30C7\u30EB"], "")
          };
        }),
        vris: data.vris.map(function(vri) {
          return {
            ctx: Core__Option.getOr(vri["\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8"], "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8"),
            vri: Core__Option.getOr(vri["\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3"], ""),
            val: Core__Option.getOr(vri["\u5024"], ""),
            exp: Core__Option.getOr(vri["\u8AAC\u660E"], "")
          };
        }),
        bucs: data.bucs.map(function(buc) {
          var uc1 = Core__Option.getOr(buc["UC"], "");
          var uc2 = Core__Option.getOr(buc["\u30E6\u30FC\u30B9\u30B1\u30FC\u30B9"], "");
          return {
            biz: Core__Option.getOr(buc["\u696D\u52D9"], ""),
            buc: Core__Option.getOr(buc["BUC"], ""),
            job: Core__Option.getOr(buc["\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3"], ""),
            uc: uc1 === "" ? uc2 === "" ? "" : uc2 : uc1,
            mdl1: Core__Option.getOr(buc["\u95A2\u9023\u30E2\u30C7\u30EB1"], ""),
            obj1: Core__Option.getOr(buc["\u95A2\u9023\u30AA\u30D6\u30B8\u30A7\u30AF\u30C81"], ""),
            mdl2: Core__Option.getOr(buc["\u95A2\u9023\u30E2\u30C7\u30EB2"], ""),
            obj2: Core__Option.getOr(buc["\u95A2\u9023\u30AA\u30D6\u30B8\u30A7\u30AF\u30C82"], ""),
            exp: Core__Option.getOr(buc["\u8AAC\u660E"], "")
          };
        })
      };
    }
    function edgeBeUnique(edgeStore) {
      return Core__Array.reduce(edgeStore.objectPairs, [], function(acc, edgePairA) {
        var match = edgeStore.edge;
        if (match === "edge") {
          var infB = edgePairA.target;
          var infA = edgePairA.source;
          if (Core__Option.isNone(Belt_Array.getBy(acc, function(edgePairB) {
            var match2 = edgeStore.edge;
            return match2 === "edge" && infA === edgePairB.source ? infB === edgePairB.target : false;
          }))) {
            return acc.concat([edgePairA]);
          } else {
            return acc;
          }
        }
        if (match !== "arrow") {
          return acc;
        }
        var infB$1 = edgePairA.target;
        var infA$1 = edgePairA.source;
        if (Core__Option.isNone(Belt_Array.getBy(acc, function(edgePairB) {
          var match2 = edgeStore.edge;
          return match2 === "arrow" && infA$1 === edgePairB.source ? infB$1 === edgePairB.target : false;
        }))) {
          return acc.concat([edgePairA]);
        } else {
          return acc;
        }
      });
    }
    var ifString2Arrayy = (object) => {
      if (Array.isArray(object)) {
        return object;
      } else if (typeof object === "string") {
        return object.includes(",") ? object.split(",") : object.includes("\u3001") ? object.split("\u3001") : [object];
      } else {
        return [];
      }
    };
    function makeConnection2(data) {
      var rdraData = makeRdraData(data);
      var addPair = function(edgeStore, object1, object2) {
        var objectPair = {
          source: object1,
          target: object2
        };
        edgeStore.objectPairs = edgeStore.objectPairs.concat([objectPair]);
      };
      var bucConnection = function(bucs) {
        var bizBuc = {
          edge: "child",
          modelPair: {
            source: "\u696D\u52D9",
            target: "BUC"
          },
          objectPairs: []
        };
        var bucJob = {
          edge: "child",
          modelPair: {
            source: "BUC",
            target: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3"
          },
          objectPairs: []
        };
        var jobUC = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3",
            target: "UC"
          },
          objectPairs: []
        };
        var jobSrn = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3",
            target: "\u753B\u9762"
          },
          objectPairs: []
        };
        var jobAct = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3",
            target: "\u30A2\u30AF\u30BF\u30FC"
          },
          objectPairs: []
        };
        var jobInf = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3",
            target: "\u60C5\u5831"
          },
          objectPairs: []
        };
        var jobTmr = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3",
            target: "\u30BF\u30A4\u30DE\u30FC"
          },
          objectPairs: []
        };
        var jobExp = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var ucSrn = {
          edge: "edge",
          modelPair: {
            source: "UC",
            target: "\u753B\u9762"
          },
          objectPairs: []
        };
        var ucEvt = {
          edge: "edge",
          modelPair: {
            source: "UC",
            target: "\u30A4\u30D9\u30F3\u30C8"
          },
          objectPairs: []
        };
        var ucInf = {
          edge: "edge",
          modelPair: {
            source: "UC",
            target: "\u60C5\u5831"
          },
          objectPairs: []
        };
        var ucCnd = {
          edge: "edge",
          modelPair: {
            source: "UC",
            target: "\u6761\u4EF6"
          },
          objectPairs: []
        };
        var ucTmr = {
          edge: "edge",
          modelPair: {
            source: "UC",
            target: "\u30BF\u30A4\u30DE\u30FC"
          },
          objectPairs: []
        };
        var ucExp = {
          edge: "comment",
          modelPair: {
            source: "UC",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var srnAct = {
          edge: "edge",
          modelPair: {
            source: "\u753B\u9762",
            target: "\u30A2\u30AF\u30BF\u30FC"
          },
          objectPairs: []
        };
        var srnExs = {
          edge: "edge",
          modelPair: {
            source: "\u753B\u9762",
            target: "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0"
          },
          objectPairs: []
        };
        var evtExs = {
          edge: "edge",
          modelPair: {
            source: "\u30A4\u30D9\u30F3\u30C8",
            target: "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0"
          },
          objectPairs: []
        };
        var evtAct = {
          edge: "edge",
          modelPair: {
            source: "\u30A4\u30D9\u30F3\u30C8",
            target: "\u30A2\u30AF\u30BF\u30FC"
          },
          objectPairs: []
        };
        var infAct = {
          edge: "edge",
          modelPair: {
            source: "\u30A2\u30AF\u30BF\u30FC",
            target: "\u60C5\u5831"
          },
          objectPairs: []
        };
        var biz = {
          contents: ""
        };
        var buc = {
          contents: ""
        };
        var job = {
          contents: ""
        };
        var uc = {
          contents: ""
        };
        bucs.forEach(function(bucRec) {
          if (bucRec.biz !== "") {
            biz.contents = bucRec.biz;
          }
          if (bucRec.buc !== "") {
            buc.contents = bucRec.buc;
          }
          if (bucRec.job !== "") {
            job.contents = bucRec.job;
            uc.contents = "";
          }
          if (bucRec.uc !== "") {
            uc.contents = bucRec.uc;
          }
          console.log("Current refs:", bucRec);
          if (biz.contents !== "" && bucRec.buc !== "") {
            addPair(bizBuc, biz.contents, buc.contents);
          }
          if (buc.contents !== "" && bucRec.job !== "") {
            addPair(bucJob, buc.contents, bucRec.job);
          }
          if (job.contents !== "" && bucRec.uc !== "") {
            addPair(jobUC, job.contents, bucRec.uc);
          }
          if (job.contents !== "" && uc.contents === "") {
            if (bucRec.mdl1 === "\u753B\u9762" && bucRec.obj1 !== "") {
              addPair(jobSrn, job.contents, bucRec.obj1);
            }
            if (bucRec.mdl2 === "\u30A2\u30AF\u30BF\u30FC" && bucRec.obj2 !== "") {
              addPair(jobAct, job.contents, bucRec.obj2);
            }
            if (bucRec.mdl1 === "\u60C5\u5831" && bucRec.obj1 !== "") {
              addPair(jobInf, job.contents, bucRec.obj1);
            }
            if (bucRec.mdl1 === "\u30BF\u30A4\u30DE\u30FC" && bucRec.obj1 !== "") {
              addPair(jobTmr, job.contents, bucRec.obj1);
            }
            if (bucRec.exp !== "") {
              addPair(jobExp, job.contents, bucRec.exp);
            }
          }
          if (uc.contents !== "") {
            console.log("UC processing:", uc.contents, bucRec.mdl1, bucRec.obj1, bucRec.mdl2);
            if (bucRec.mdl1 === "\u753B\u9762" && bucRec.obj1 !== "") {
              addPair(ucSrn, uc.contents, bucRec.obj1);
            }
            if (bucRec.mdl1 === "\u30A4\u30D9\u30F3\u30C8" && bucRec.obj1 !== "") {
              addPair(ucEvt, uc.contents, bucRec.obj1);
            }
            if (bucRec.mdl1 === "\u60C5\u5831" && bucRec.obj1 !== "") {
              addPair(ucInf, uc.contents, bucRec.obj1);
            }
            if (bucRec.mdl1 === "\u6761\u4EF6" && bucRec.obj1 !== "") {
              addPair(ucCnd, uc.contents, bucRec.obj1);
            }
            if (bucRec.mdl1 === "\u30BF\u30A4\u30DE\u30FC" && bucRec.obj1 !== "") {
              addPair(ucTmr, uc.contents, bucRec.obj1);
            }
            if (bucRec.exp !== "") {
              addPair(ucExp, uc.contents, bucRec.exp);
            }
          }
          if (bucRec.mdl1 === "\u753B\u9762" && bucRec.mdl2 === "\u30A2\u30AF\u30BF\u30FC" && bucRec.obj1 !== "" && bucRec.obj2 !== "") {
            addPair(srnAct, bucRec.obj1, bucRec.obj2);
          }
          if (bucRec.mdl1 === "\u753B\u9762" && bucRec.mdl2 === "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0" && bucRec.obj1 !== "" && bucRec.obj2 !== "") {
            addPair(srnExs, bucRec.obj1, bucRec.obj2);
          }
          if (bucRec.mdl1 === "\u30A4\u30D9\u30F3\u30C8" && bucRec.mdl2 === "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0" && bucRec.obj1 !== "" && bucRec.obj2 !== "") {
            addPair(evtExs, bucRec.obj1, bucRec.obj2);
          }
          if (bucRec.mdl1 === "\u30A4\u30D9\u30F3\u30C8" && bucRec.mdl2 === "\u30A2\u30AF\u30BF\u30FC" && bucRec.obj1 !== "" && bucRec.obj2 !== "") {
            addPair(evtAct, bucRec.obj1, bucRec.obj2);
          }
          if (bucRec.mdl1 === "\u60C5\u5831" && bucRec.mdl2 === "\u30A2\u30AF\u30BF\u30FC" && bucRec.obj1 !== "" && bucRec.obj2 !== "") {
            return addPair(infAct, bucRec.obj1, bucRec.obj2);
          }
        });
        ucSrn.objectPairs = edgeBeUnique(ucSrn);
        ucEvt.objectPairs = edgeBeUnique(ucEvt);
        ucInf.objectPairs = edgeBeUnique(ucInf);
        ucCnd.objectPairs = edgeBeUnique(ucCnd);
        ucTmr.objectPairs = edgeBeUnique(ucTmr);
        srnAct.objectPairs = edgeBeUnique(srnAct);
        srnExs.objectPairs = edgeBeUnique(srnExs);
        evtExs.objectPairs = edgeBeUnique(evtExs);
        jobSrn.objectPairs = edgeBeUnique(jobSrn);
        jobAct.objectPairs = edgeBeUnique(jobAct);
        console.log("BUC", ucSrn.modelPair, ucSrn.objectPairs, ucInf.modelPair, ucInf.objectPairs);
        console.log("UC contents:", uc.contents, "ucInf pairs count:", ucInf.objectPairs.length, "");
        return [
          [
            bizBuc,
            bucJob
          ],
          [
            jobUC,
            jobSrn,
            jobAct,
            ucSrn,
            ucEvt,
            ucInf,
            ucCnd,
            ucTmr,
            ucExp,
            srnAct,
            evtExs,
            srnExs
          ]
        ];
      };
      var cndConnection = function(cnds) {
        var ctxCnd = {
          edge: "child",
          modelPair: {
            source: "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
            target: "\u6761\u4EF6"
          },
          objectPairs: []
        };
        var cndExp = {
          edge: "comment",
          modelPair: {
            source: "\u6761\u4EF6",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var cndVri = {
          edge: "edge",
          modelPair: {
            source: "\u6761\u4EF6",
            target: "\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3"
          },
          objectPairs: []
        };
        var cndStt = {
          edge: "edge",
          modelPair: {
            source: "\u6761\u4EF6",
            target: "\u72B6\u614B\u30E2\u30C7\u30EB"
          },
          objectPairs: []
        };
        var ctx = {
          contents: ""
        };
        var lnkVri = function(cnd) {
          var match2 = cnd.cnd;
          var match$12 = cnd.vri;
          if (match2 === "") {
            return;
          }
          if (match$12 === "") {
            return;
          }
          var vriAry = ifString2Arrayy(match$12);
          vriAry.map(function(toVri) {
            if (toVri !== "") {
              return addPair(cndVri, match2, toVri.trim());
            }
          });
        };
        cnds.forEach(function(cnd) {
          if (cnd.ctx !== "") {
            ctx.contents = cnd.ctx;
          }
          if (ctx.contents !== "" && cnd.cnd !== "") {
            addPair(ctxCnd, ctx.contents, cnd.cnd);
          }
          if (cnd.cnd !== "" && cnd.exp !== "") {
            addPair(cndExp, cnd.cnd, cnd.exp);
          }
          lnkVri(cnd);
          var match2 = cnd.cnd;
          var match$12 = cnd.sttMdl;
          if (match2 === "") {
            return;
          }
          if (match$12 === "") {
            return;
          }
          var sttGary = ifString2Arrayy(match$12);
          sttGary.map(function(toSttG) {
            if (toSttG !== "") {
              return addPair(cndStt, match2, toSttG.trim());
            }
          });
        });
        return [
          [ctxCnd],
          [
            cndExp,
            cndVri,
            cndStt
          ]
        ];
      };
      var vriConnection = function(vris) {
        var ctxVri = {
          edge: "child",
          modelPair: {
            source: "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
            target: "\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3"
          },
          objectPairs: []
        };
        var vriVal = {
          edge: "attribute",
          modelPair: {
            source: "\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3",
            target: "\u5024"
          },
          objectPairs: []
        };
        var vriExp = {
          edge: "comment",
          modelPair: {
            source: "\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var ctx = {
          contents: ""
        };
        vris.forEach(function(vri) {
          if (vri.ctx !== "") {
            ctx.contents = vri.ctx;
          }
          if (ctx.contents !== "" && vri.vri !== "") {
            addPair(ctxVri, ctx.contents, vri.vri);
          }
          if (vri.vri !== "" && vri.val !== "") {
            addPair(vriVal, vri.vri, vri.val);
          }
          if (vri.vri !== "" && vri.exp !== "") {
            return addPair(vriExp, vri.vri, vri.exp);
          }
        });
        return [
          [ctxVri],
          [
            vriVal,
            vriExp
          ]
        ];
      };
      var actConnection = function(acts) {
        var grpAct = {
          edge: "child",
          modelPair: {
            source: "\u30A2\u30AF\u30BF\u30FC\u7FA4",
            target: "\u30A2\u30AF\u30BF\u30FC"
          },
          objectPairs: []
        };
        var actExp = {
          edge: "comment",
          modelPair: {
            source: "\u30A2\u30AF\u30BF\u30FC",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var grp = {
          contents: ""
        };
        acts.forEach(function(act) {
          if (act.grp !== "") {
            grp.contents = act.grp;
          }
          if (grp.contents !== "" && act.act !== "") {
            addPair(grpAct, grp.contents, act.act);
          }
          if (act.act !== "" && act.exp !== "") {
            return addPair(actExp, act.act, act.exp);
          }
        });
        return [
          [grpAct],
          [actExp]
        ];
      };
      var exsConnection = function(exss) {
        var grpExs = {
          edge: "child",
          modelPair: {
            source: "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0\u7FA4",
            target: "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0"
          },
          objectPairs: []
        };
        var exsExp = {
          edge: "comment",
          modelPair: {
            source: "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var grp = {
          contents: ""
        };
        exss.forEach(function(exs) {
          if (exs.grp !== "") {
            grp.contents = exs.grp;
          }
          if (grp.contents !== "" && exs.exs !== "") {
            addPair(grpExs, grp.contents, exs.exs);
          }
          if (exs.exs !== "" && exs.exp !== "") {
            return addPair(exsExp, exs.exs, exs.exp);
          }
        });
        return [
          [grpExs],
          [exsExp]
        ];
      };
      var infConnection = function(infs) {
        var ctxInf = {
          edge: "child",
          modelPair: {
            source: "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
            target: "\u60C5\u5831"
          },
          objectPairs: []
        };
        var infAtr = {
          edge: "attribute",
          modelPair: {
            source: "\u60C5\u5831",
            target: "\u5C5E\u6027"
          },
          objectPairs: []
        };
        var infLnkInf = {
          edge: "edge",
          modelPair: {
            source: "\u60C5\u5831",
            target: "\u60C5\u5831"
          },
          objectPairs: []
        };
        var infLnkStt = {
          edge: "edge",
          modelPair: {
            source: "\u60C5\u5831",
            target: "\u72B6\u614B\u30E2\u30C7\u30EB"
          },
          objectPairs: []
        };
        var infLnkVri = {
          edge: "edge",
          modelPair: {
            source: "\u60C5\u5831",
            target: "\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3"
          },
          objectPairs: []
        };
        var infExp = {
          edge: "comment",
          modelPair: {
            source: "\u60C5\u5831",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var lnkInf = function(inf) {
          var match2 = inf.inf;
          var match$12 = inf.lnkInf;
          if (match2 === "") {
            return;
          }
          if (match$12.length === 0) {
            return;
          }
          var lnkInfAry = ifString2Arrayy(match$12);
          lnkInfAry.map(function(toInf) {
            if (toInf === "") {
              return;
            }
            var trimedInf = toInf.trim();
            var match$22 = Core__Ordering.isGreater(Caml.string_compare(match2, trimedInf)) ? [
              match2,
              trimedInf
            ] : [
              trimedInf,
              match2
            ];
            addPair(infLnkInf, match$22[0], match$22[1]);
          });
        };
        var lnkStt = function(inf) {
          var match2 = inf.inf;
          var match$12 = inf.lnkStt;
          if (match2 === "") {
            return;
          }
          if (!match$12 || match$12.length === 0) {
            return;
          }
          var sttGary = ifString2Arrayy(match$12);
          sttGary.map(function(toSttG) {
            if (toSttG !== "") {
              return addPair(infLnkStt, match2, toSttG.trim());
            }
          });
        };
        var ctx = {
          contents: ""
        };
        infs.forEach(function(inf) {
          if (inf.ctx !== "") {
            ctx.contents = inf.ctx;
          }
          if (ctx.contents !== "" && inf.inf !== "") {
            addPair(ctxInf, ctx.contents, inf.inf);
          }
          if (inf.inf !== "" && inf.atr !== "") {
            addPair(infAtr, inf.inf, inf.atr);
          }
          if (inf.inf !== "" && inf.exp !== "") {
            addPair(infExp, inf.inf, inf.exp);
          }
          lnkInf(inf);
          lnkStt(inf);
          var match2 = inf.inf;
          var match$12 = inf.lnkVri;
          if (match2 === "") {
            return;
          }
          if (!match$12 || match$12.length === 0) {
            return;
          }
          var vriAry = ifString2Arrayy(match$12);
          vriAry.map(function(toVri) {
            if (toVri !== "") {
              return addPair(infLnkVri, match2, toVri.trim());
            }
          });
        });
        infLnkInf.objectPairs = edgeBeUnique(infLnkInf);
        return [
          [ctxInf],
          [
            infAtr,
            infLnkInf,
            infLnkStt,
            infLnkVri,
            infExp
          ]
        ];
      };
      var sttConnection = function(stts) {
        var ctxSttMdl = {
          edge: "child",
          modelPair: {
            source: "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
            target: "\u72B6\u614B\u30E2\u30C7\u30EB"
          },
          objectPairs: []
        };
        var sttMdlStt = {
          edge: "child",
          modelPair: {
            source: "\u72B6\u614B\u30E2\u30C7\u30EB",
            target: "\u72B6\u614B"
          },
          objectPairs: []
        };
        var sttUc = {
          edge: "arrow",
          modelPair: {
            source: "\u72B6\u614B",
            target: "UC"
          },
          objectPairs: []
        };
        var ucStt = {
          edge: "arrow",
          modelPair: {
            source: "UC",
            target: "\u72B6\u614B"
          },
          objectPairs: []
        };
        var sttStt = {
          edge: "arrow",
          modelPair: {
            source: "\u72B6\u614B",
            target: "\u72B6\u614B"
          },
          objectPairs: []
        };
        var sttExp = {
          edge: "stereotype",
          modelPair: {
            source: "\u72B6\u614B",
            target: "\u8AAC\u660E"
          },
          objectPairs: []
        };
        var sttStp = {
          edge: "stereotype",
          modelPair: {
            source: "\u72B6\u614B",
            target: "Stereotype"
          },
          objectPairs: []
        };
        var sttMdlExp = {
          edge: "child",
          modelPair: {
            source: "\u72B6\u614B\u30E2\u30C7\u30EB",
            target: "\u72B6\u614B"
          },
          objectPairs: []
        };
        var ctx = {
          contents: ""
        };
        var sttMdl = {
          contents: ""
        };
        var mdlIdx = {
          contents: 0
        };
        stts.forEach(function(stt) {
          if (stt.sttMdl !== "" && stt.sttMdl !== sttMdl.contents) {
            mdlIdx.contents = mdlIdx.contents + 1 | 0;
          }
          var sttName = function(name, no) {
            return no.toString() + "." + name;
          };
          var fromStt = sttName(stt.fromStt, mdlIdx.contents);
          var toStt = sttName(stt.toStt, mdlIdx.contents);
          var start = sttName("start", mdlIdx.contents);
          var end = sttName("end", mdlIdx.contents);
          if (stt.ctx !== "") {
            ctx.contents = stt.ctx;
          }
          if (stt.sttMdl !== "") {
            sttMdl.contents = stt.sttMdl;
          }
          if (ctx.contents !== "" && stt.sttMdl !== "") {
            addPair(ctxSttMdl, ctx.contents, stt.sttMdl);
          }
          if (sttMdl.contents !== "" && stt.fromStt !== "") {
            addPair(sttMdlStt, sttMdl.contents, fromStt);
          }
          if (sttMdl.contents !== "" && stt.toStt !== "") {
            addPair(sttMdlStt, sttMdl.contents, toStt);
          }
          if (sttMdl.contents !== "" && stt.fromStt === "" && stt.toStt === "") {
            addPair(sttMdlExp, sttMdl.contents, stt.exp);
          }
          if (sttMdl.contents !== "" && stt.fromStt !== "" && stt.toStt === "") {
            addPair(sttExp, sttMdl.contents, stt.exp);
          }
          if (stt.fromStt !== "" && stt.uc !== "") {
            addPair(sttUc, fromStt, stt.uc);
          }
          if (stt.uc !== "" && stt.toStt !== "") {
            addPair(ucStt, stt.uc, toStt);
          }
          if (stt.fromStt !== "" && stt.toStt !== "") {
            addPair(sttStt, fromStt, toStt);
          }
          if (stt.fromStt === "" && stt.toStt !== "") {
            addPair(sttMdlStt, sttMdl.contents, start);
            addPair(sttStt, start, toStt);
            addPair(sttStp, start, "start");
          }
          if (stt.fromStt !== "" && stt.toStt === "") {
            addPair(sttMdlStt, sttMdl.contents, end);
            addPair(sttStt, fromStt, end);
            return addPair(sttStp, end, "end");
          }
        });
        sttUc.objectPairs = edgeBeUnique(sttUc);
        ucStt.objectPairs = edgeBeUnique(ucStt);
        sttStt.objectPairs = edgeBeUnique(sttStt);
        return [
          [
            sttMdlStt,
            ctxSttMdl
          ],
          [
            sttUc,
            ucStt,
            sttStp,
            sttStt
          ]
        ];
      };
      var match = actConnection(rdraData.acts);
      var match$1 = exsConnection(rdraData.exss);
      var match$2 = vriConnection(rdraData.vris);
      var match$3 = sttConnection(rdraData.stts);
      var match$4 = cndConnection(rdraData.cnds);
      var match$5 = infConnection(rdraData.infs);
      var match$6 = bucConnection(rdraData.bucs);
      var childEdges = match[0].concat(match$1[0], match$2[0], match$3[0], match$4[0], match$5[0], match$6[0]);
      var notChildEdges = match[1].concat(match$1[1], match$2[1], match$3[1], match$4[1], match$5[1], match$6[1]);
      return childEdges.concat(notChildEdges);
    }
    function conectin2String2(systemName, edgeStores) {
      var ary2String = function(edgeEnum, edgePairs) {
        return edgePairs.map(function(edgePair) {
          if (edgeEnum === "child") {
            return edgePair.source + "@@" + edgePair.target;
          } else if (edgeEnum === "attribute") {
            return edgePair.source + "@@" + edgePair.target;
          } else if (edgeEnum === "comment") {
            return edgePair.source + "@@" + edgePair.target;
          } else if (edgeEnum === "stereotype") {
            return edgePair.source + "@@" + edgePair.target;
          } else if (edgeEnum === "arrow") {
            return edgePair.source + "@@" + edgePair.target;
          } else {
            return edgePair.source + "@@" + edgePair.target;
          }
        }).join("//");
      };
      var modelString = function() {
        var edgePairsString = edgeStores.map(function(data) {
          var match = data.edge;
          var match$1 = data.modelPair;
          if (match === "child") {
            return "#child	" + match$1.source + "	" + match$1.target + "	" + ary2String("child", data.objectPairs);
          } else if (match === "attribute") {
            return "#attribute	" + match$1.source + "	" + match$1.target + "	" + ary2String("attribute", data.objectPairs);
          } else if (match === "comment") {
            return "#comment	" + match$1.source + "	" + match$1.target + "	" + ary2String("comment", data.objectPairs);
          } else if (match === "stereotype") {
            return "#stereotype	" + match$1.source + "	" + match$1.target + "	" + ary2String("stereotype", data.objectPairs);
          } else if (match === "arrow") {
            return "#arrow	" + match$1.source + "	" + match$1.target + "	" + ary2String("arrow", data.objectPairs);
          } else {
            return "#edge	" + match$1.source + "	" + match$1.target + "	" + ary2String("edge", data.objectPairs);
          }
        }).join("\n");
        return systemName + "\n" + edgePairsString;
      };
      return modelString();
    }
    exports2.linkInfs = linkInfs;
    exports2.linkStts = linkStts;
    exports2.linkVris = linkVris;
    exports2.makeRdraData = makeRdraData;
    exports2.edgeBeUnique = edgeBeUnique;
    exports2.ifString2Arrayy = ifString2Arrayy;
    exports2.makeConnection = makeConnection2;
    exports2.conectin2String = conectin2String2;
  }
});

// src/rdraFile2Rec.js
var fs = require("fs");
var path = require("path");
var { makeConnection, conectin2String } = require_RdraSheet2Graph_res();
function parseTSVFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    if (lines.length < 2) {
      console.warn(`\u30D5\u30A1\u30A4\u30EB ${filePath} \u306B\u306F\u30D8\u30C3\u30C0\u30FC\u3068\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093`);
      return [];
    }
    const headers = lines[0].split("	");
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split("	");
      const row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] ? values[index].trim() : "";
      });
      data.push(row);
    }
    console.log(`  - \u8AAD\u307F\u8FBC\u307F\u5B8C\u4E86: ${data.length}\u4EF6\u306E\u30C7\u30FC\u30BF`);
    return data;
  } catch (error) {
    console.error(`\u30D5\u30A1\u30A4\u30EB ${filePath} \u306E\u8AAD\u307F\u8FBC\u307F\u30A8\u30E9\u30FC:`, error.message);
    return [];
  }
}
function createRdraSheetDefT(rdraPath = "1_RDRA") {
  const rdraDir = path.join(process.cwd(), rdraPath);
  console.log(`RDRA\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA: ${rdraDir}`);
  let systemName = "XXXXX\u30B7\u30B9\u30C6\u30E0";
  try {
    const systemOverviewPath = path.join(rdraDir, "\u30B7\u30B9\u30C6\u30E0\u6982\u8981.json");
    const systemOverviewContent = fs.readFileSync(systemOverviewPath, "utf8");
    const systemOverview = JSON.parse(systemOverviewContent);
    systemName = systemOverview.system_name || systemName;
    console.log(systemName);
  } catch (error) {
    console.warn(`\u30B7\u30B9\u30C6\u30E0\u6982\u8981.json\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${error.message}`);
  }
  const acts = parseTSVFile(path.join(rdraDir, "\u30A2\u30AF\u30BF\u30FC.tsv"));
  const exss = parseTSVFile(path.join(rdraDir, "\u5916\u90E8\u30B7\u30B9\u30C6\u30E0.tsv"));
  const vris = parseTSVFile(path.join(rdraDir, "\u30D0\u30EA\u30A8\u30FC\u30B7\u30E7\u30F3.tsv"));
  const cnds = parseTSVFile(path.join(rdraDir, "\u6761\u4EF6.tsv"));
  const infs = parseTSVFile(path.join(rdraDir, "\u60C5\u5831.tsv"));
  const stts = parseTSVFile(path.join(rdraDir, "\u72B6\u614B.tsv"));
  const bucs = parseTSVFile(path.join(rdraDir, "BUC.tsv"));
  const rdraSheetDef = {
    systemName,
    acts,
    exss,
    vris,
    cnds,
    infs,
    stts,
    bucs
  };
  return rdraSheetDef;
}
function main(rdraPath = "1_RDRA") {
  try {
    console.log(`\u4F7F\u7528\u3059\u308BRDRA\u30D1\u30B9: ${rdraPath}`);
    const rdraData = createRdraSheetDefT(rdraPath);
    const outputPath = path.join(process.cwd(), "1_RDRA", "\u95A2\u9023\u30C7\u30FC\u30BF.txt");
    try {
      const connections = makeConnection(rdraData);
      const linkData = conectin2String(rdraData.systemName, connections);
      console.log(`- \u4F5C\u6210\u3055\u308C\u305F\u63A5\u7D9A\u6570: ${connections.length}`);
      try {
        fs.writeFileSync(outputPath, linkData, "utf8");
        console.log("\u2713 \u30D5\u30A1\u30A4\u30EB\u51FA\u529B\u5B8C\u4E86");
      } catch (writeError) {
        console.error("\u30D5\u30A1\u30A4\u30EB\u51FA\u529B\u30A8\u30E9\u30FC:", writeError.message);
      }
      console.log(linkData);
    } catch (error) {
      console.error("makeConnection\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:", error);
      console.error("\u30A8\u30E9\u30FC\u30B9\u30BF\u30C3\u30AF:", error.stack);
    }
    console.log("\nRDRA\u30C7\u30FC\u30BF\u306E\u51E6\u7406\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002");
  } catch (error) {
    console.error("\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:", error);
    console.error("\u30A8\u30E9\u30FC\u30B9\u30BF\u30C3\u30AF:", error.stack);
  }
}
console.log("=== \u30B9\u30AF\u30EA\u30D7\u30C8\u958B\u59CB ===");
console.log("require.main:", require.main);
console.log("module:", module);
console.log("process.argv:", process.argv);
if (require.main === module) {
  console.log("\u30B9\u30AF\u30EA\u30D7\u30C8\u304C\u76F4\u63A5\u5B9F\u884C\u3055\u308C\u307E\u3057\u305F");
  const rdraPath = process.argv[2] || "1_RDRA";
  console.log("\u4F7F\u7528\u3059\u308BRDRA\u30D1\u30B9:", rdraPath);
  main(rdraPath);
} else {
  console.log("\u30B9\u30AF\u30EA\u30D7\u30C8\u304C\u30E2\u30B8\u30E5\u30FC\u30EB\u3068\u3057\u3066\u8AAD\u307F\u8FBC\u307E\u308C\u307E\u3057\u305F");
}
console.log("=== \u30B9\u30AF\u30EA\u30D7\u30C8\u7D42\u4E86 ===");
module.exports = { createRdraSheetDefT, parseTSVFile, main };

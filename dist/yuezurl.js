this.YuezUrl = (function() {
  function YuezUrl() {
    this.protocol = window.location.protocol;
    this.hostname = window.location.hostname;
    this.port = window.location.port;
    this.pathname = window.location.pathname;
    this.search = window.location.search;
    this.hash = window.location.hash;
    this.params = (function() {
      var i, len, pair, param, params, params_arr, params_str, search;
      search = window.location.search;
      if (!search) {
        return {};
      }
      params_str = search.slice(1);
      params_arr = params_str.split("&");
      params = {};
      for (i = 0, len = params_arr.length; i < len; i++) {
        param = params_arr[i];
        pair = param.split("=");
        params[pair[0]] = pair[1];
      }
      return params;
    })();
  }

  YuezUrl.prototype.href = function() {
    if (this.pathname && this.pathname.indexOf("/") === this.pathname.length - 1) {
      this.pathname = this.pathname.slice(0, this.pathname.length - 1);
    }
    if (!this.port) {
      return this.protocol + "//" + this.hostname + this.pathname + this.search + this.hash;
    } else {
      return this.protocol + "//" + this.hostname + ":" + this.port + this.pathname + this.search + this.hash;
    }
  };

  YuezUrl.prototype.redirect = function() {
    return window.location.href = this.href();
  };

  YuezUrl.prototype.set = function(obj) {
    var key, value;
    for (key in obj) {
      value = obj[key];
      Object.defineProperty(this.params, key, {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    return this.reset_search();
  };

  YuezUrl.prototype.unset = function(name) {
    if (this.params.hasOwnProperty(name)) {
      delete this.params[name];
    }
    return this.reset_search();
  };

  YuezUrl.prototype.reset_search = function() {
    var key, ref, result, value;
    result = "";
    ref = this.params;
    for (key in ref) {
      value = ref[key];
      if (value) {
        result += key + "=" + value + "&";
      }
    }
    if (result) {
      return this.search = "?" + (result.slice(0, result.length - 1));
    } else {
      return this.search = "";
    }
  };

  return YuezUrl;

})();

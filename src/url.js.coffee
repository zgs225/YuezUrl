# 封装url操作
class @YuezUrl
  constructor: ->
    @protocol = window.location.protocol
    @hostname = window.location.hostname
    @port     = window.location.port
    @pathname = window.location.pathname
    @search   = window.location.search
    @hash     = window.location.hash
    @params   = (->
      search = window.location.search
      if not search
        return {}
      params_str = search.slice 1
      params_arr = params_str.split "&"
      params     = {}
      for param in params_arr
        pair = param.split "="
        params[pair[0]] = pair[1]
      return params
    )()

  href: ->
    if @pathname and @pathname.indexOf("/") == @pathname.length - 1
      @pathname = @pathname.slice 0, @pathname.length - 1
    if not @port
      "#{ @protocol }//#{ @hostname }#{ @pathname }#{ @search }#{ @hash }"
    else
      "#{ @protocol }//#{ @hostname }:#{ @port }#{ @pathname }#{ @search }#{ @hash }"

  reload: ->
    window.location.protocol = @protocol
    window.location.hostname = @hostname
    window.location.port     = @port
    window.location.pathname = @pathname
    window.location.search   = @search
    window.location.hash     = @hash

  redirect: ->
    @reload()
    window.location.href = @href()

  set: (obj)->
    for key, value of obj
      Object.defineProperty(@params, key, {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true
      })
    @reset_search()

  unset: (name)->
    delete @params[name] if @params.hasOwnProperty(name)
    @reset_search()

  reset_search: ->
    result = ""
    for key, value of @params
      result += "#{ key }=#{ value }&" if value
    if result
      @search = "?#{ result.slice(0, result.length - 1) }"
    else
      @search = ""


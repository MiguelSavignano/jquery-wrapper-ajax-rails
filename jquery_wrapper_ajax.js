$.put = function(url, data, callbackSucess, callbackerror){
  if( jQuery.isFunction(data) ){
    callbackSucess = data
    callbackerror = callbackSucess
    data = undefined
  }
  return $.ajax({
      url: url,
      data:data,
      // if you use jquery_ujs you don't need this
      // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: "PUT",
      dataType: 'json',
      success: callbackSucess,
      error:callbackerror
  });
}
$.delete = function(url, data, callbackSucess, callbackerror){
  if( jQuery.isFunction(data) ){
    callbackSucess = data
    callbackerror = callbackSucess
    data = undefined
  }
  return $.ajax({
      url: url,
      data:data,
      type: "DELETE",
      dataType: 'json',
      success: callbackSucess,
      error:callbackerror
  });
}
$.post = function(url, data, callbackSucess, callbackerror){
  if( jQuery.isFunction(data) ){
    callbackSucess = data
    callbackerror = callbackSucess
    data = undefined
  }
  return $.ajax({
      url: url,
      data:data,
      // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: "POST",
      dataType: 'json',
      success: callbackSucess,
      error:callbackerror
  });
}
$.create = function(type,data, callback){
  var _data = {}
  _data[type] = data
  return $.post("/"+type+"s",_data ,callback)
}
$.railsCreate = function(data, callback){
  if(!data.type){ return console.error("You need to set the type key in the object") }
  data.type = data.type.toLowerCase()
  return $.create(data.type, data, callback)
}
$.update = function(type, data, callback){
  var _data = {}
  _data[type] = data
  return $.put("/"+type+"s/"+data.id,_data ,callback)
}
$.railsUpdate = function(data, callback){
  if(!data.type){ return console.error("You need to set the type key in the object") }
  data.type = data.type.toLowerCase()
  return $.update(data.type, data, callback)
}
$.destroy = function(type,data,callback){
  return $.delete("/"+type+"s/"+data.id,callback)
}
$.railsDestroy = function(data, callback){
  if(!data.type){ return console.error("You need to set the type key in the object") }
  data.type = data.type.toLowerCase()
  return $.delete(data.type, data.id,_data ,callback)
}
$.action = function(json_config, callbackSucess, callbackerror){
  var method = json_config.method || "PUT"
  var action = json_config.action
  var type   = json_config.type
  var data   = json_config.data

  var _data = {}
  _data[type] = data

  var url = "/"+type+"s/"+data.id+"/"+action
  return $.ajax({
      url: url,
      type: method,
      data: _data,
      dataType: 'json',
      success: callbackSucess,
      error:callbackerror
  });
}
$.railsAction = function(action, data, callback, method){
  if(!data.type){ return console.error("You need to set the type key in the object") }
  var json_config = {
    type:data.type.toLowerCase(),
    data:data,
    method:method || "PUT",
    action:action
  }
  return $.action(json_config, callback)
}
$.railsActionDelete = function(action, data, callback){
  return $.railsAction(action,data, callback, "DELETE")
}

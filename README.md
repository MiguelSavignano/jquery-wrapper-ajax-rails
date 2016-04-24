# jquery-wrapper-ajax-rails

Following the [rails routing conventions](http://guides.rubyonrails.org/routing.html)

* unsubscribe_service_path   	DELETE	/services/:id/unsubscribe(.:format)  	services#unsubscribe
* subscribe_service_path	    PUT	    /services/:id/subscribe(.:format)	    services#subscribe
* services_path	              GET	    /services(.:format)	                  services#index
*                             POST	  /services(.:format)	                  services#create
* new_service_path	          GET	    /services/new(.:format)	              services#new
* edit_service_path	          GET	    /services/:id/edit(.:format)	        services#edit
* service_path	              GET	    /services/:id(.:format)	              services#show
*                             PATCH	  /services/:id(.:format)	              services#update
*                             PUT	    /services/:id(.:format)	              services#update
*                             DELETE	/services/:id(.:format)

You can update a resource by ajax
```javascript
$.railsUpdate({type:"service", id:5220, description:"foo bazz", active:true},
              (service_updated) => console.log(service_updated)
)
```
This it's only a wrapper for the Jquery ajax call

```javascript
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
```

```javascript
$.update = function(type, data, callback){
  var _data = {}
  _data[type] = data
  return $.put("/"+type+"s/"+data.id,_data ,callback)
}
```
```javascript
$.railsUpdate = function(data, callback){
  if(!data.type){ return console.error("You need to set the type key in the object") }
  data.type = data.type.toLowerCase()
  return $.update(data.type, data, callback)
}
```

The result it's a ajax call like this
```
 url = http://localhost:3000/services/5220
 data = {
   service:{
     description:"foo bazz",
     active:true
   }
 }
```

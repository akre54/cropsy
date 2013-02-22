cropsy.js
=========

cropsy is a jQuery plugin for creating a draggable and zoomable cropper window
around an attached image, similar to Twitter's profile image selector. Its name
comes from the Staten Island urban legend of
[Cropsey](http://movies.nytimes.com/2010/06/04/movies/04cropsey.html?_r=0).
Coder beware. 

Sample usage
------------

```javascript
$('#profile-img').cropsy({
  max_scale: 2,
  mask_padding: 40
});
```

Demo
----

A demo is [available online](http://buildingawesome.com/upload/) showing how to
use cropsy in conjunction with [Fine Uploader](http://fineuploader.com). The
easiest for is to instantiate a cropsy instance during the uploader's onComplete
callback.

Requirements
------------

cropsy's only hard dependency is on jQuery. It also depends on jQueryUI's draggable
and slider components, but these should be removed at some point in the future.

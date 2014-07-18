(function(){

    var viewport = document.querySelector("meta[name=viewport]"),
    iosDevice = {};
    
    // this function prevents zooming
    function freezeScaling() {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
    
    // this function once again allows zooming
    function reenableScaling() {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
    
    // this function determines whether or not the site is
    // being viewed on an iPad
    if (navigator && navigator.userAgent && navigator.userAgent != null) {
        var strUserAgent = navigator.userAgent.toLowerCase();
        if(strUserAgent.match(/(ipad)/)){
            iosDevice.deviceName = "ipad"; 
            iosDevice.landscapeThreshold = 650;    
        } 
        if(strUserAgent.match(/(iphone|ipod)/)){
            iosDevice.deviceName = "iphone"; 
            iosDevice.landscapeThreshold = 320;     
        }
    } 
    
    // if the user is on an iOS device, prevent zooming on page load 
    // (don't worry, we will reenable zooming in the code at the bottom)
    if(iosDevice.deviceName) {
        freezeScaling();
    }
    
    // freeze scaling when the user flips to landscape, and then
    // unfreeze it when the go to portrait
    $(window).on("orientationchange",function(){
        if($(window).width() > iosDevice.landscapeThreshold) {
            freezeScaling();
        }
        window.scrollTo(0, 0);
    });
    
    // Re-enable scaling as soon as the user attempts to zoom
    document.body.addEventListener('gesturestart', reenableScaling);

})();
(function(){
    // Helper functions for handling classes
    function hasClass(el, cls) {
        if (el.className.match('(?:^|\\s)'+cls+'(?!\\S)')) { return true; } 
        }
    function addClass(el, cls) {
        if (!el.className.match('(?:^|\\s)'+cls+'(?!\\S)')) { el.className += ' '+cls; } 
        }
    function delClass(el, cls) {
        el.className = el.className.replace(new RegExp('(?:^|\\s)'+cls+'(?!\\S)'),'');
        }

    // Function for class toggles based on viewport position
    // params: element, classes to add, distance from top, unit ('percent' or 'pixels')
    function elementFromTop(elem, classToAdd, distanceFromTop, unit) {
        var winY = window.innerHeight || document.documentElement.clientHeight, 
        elemLength = elem.length, distTop, distPercent, distPixels, distUnit, i;
        for (i = 0; i < elemLength; ++i) {
            distTop = elem[i].getBoundingClientRect().top;
            distPercent = Math.round((distTop / winY) * 100);
            distPixels = Math.round(distTop);
            distUnit = unit == 'percent' ? distPercent : distPixels;
            if (distUnit <= distanceFromTop) {
                if (!hasClass(elem[i], classToAdd)) { addClass(elem[i], classToAdd); }
            } else {
                delClass(elem[i], classToAdd);
            }
        }
    }

    function topFade(topFadeElems) {
        for(i = 0; i < topFadeElems.length; i++) {
            var distTop = topFadeElems[i].getBoundingClientRect().top;
            topFadeElems[i].style.opacity = (distTop / 120) * 1;
        }
    }

    var viewportAnims = function (event) {
        var topFadeElems = document.querySelectorAll('.top--fade--out');
        if(topFadeElems.length) {
            topFade(topFadeElems);
        }
        elementFromTop(document.querySelectorAll('.viewport-anim'),       'top--fade--out',       120, 'pixels'); // as top of element hits 120px off top of viewport
        elementFromTop(document.querySelectorAll('.viewport-anim'),        'bottom--fade--in',      100, 'percent'); // as top of element enters bottom of viewport         
    }

    window.addEventListener('scroll', viewportAnims, false);
    window.addEventListener('resize', viewportAnims, false);

    elementFromTop(document.querySelectorAll('.viewport-anim'),        'default--fade--in',      100, 'percent'); // as top of element enters bottom of viewport 
})();

(function($) {
  
  $.ec.puff = function(o) {
  
    return this.queue(function() {
  
      // Create element
      var el = $(this);
    
      // Set options
      var mode = $.ec.setMode(el, o.options.mode || 'hide'); // Set Mode
      var percent = parseInt(o.options.percent) || 150; // Set default puff percent
      o.options.fade = true; // It's not a puff if it doesn't fade! :)
      var original = {height: el.height(), width: el.width()}; // Save original
    
      // Adjust
      var factor = percent / 100;
      el.from = (mode == 'hide') ? original : {height: original.height * factor, width: original.width * factor};
    
      // Animation
      o.options.from = el.from;
      o.options.percent = (mode == 'hide') ? percent : 100;
      o.options.mode = mode;
    
      // Animate
      el.effect('scale', o.options, o.duration, o.callback);
      el.dequeue();
    });
    
  };

  $.ec.scale = function(o) {
    
    return this.queue(function() {
    
      // Create element
      var el = $(this);

      // Set options
      var mode = $.ec.setMode(el, o.options.mode || 'effect'); // Set Mode
      var percent = parseInt(o.options.percent) || (parseInt(o.options.percent) == 0 ? 0 : (mode == 'hide' ? 0 : 100)); // Set default scaling percent
      var direction = o.options.direction || 'both'; // Set default axis
      var origin = o.options.origin; // The origin of the scaling
      if (mode != 'effect') { // Set default origin and restore for show/hide
        origin = origin || ['middle','center'];
        o.options.restore = true;
      }
      var original = {height: el.height(), width: el.width()}; // Save original
      el.from = o.options.from || (mode == 'show' ? {height: 0, width: 0} : original); // Default from state
    
      // Adjust
      var factor = { // Set scaling factor
        y: direction != 'horizontal' ? (percent / 100) : 1,
        x: direction != 'vertical' ? (percent / 100) : 1
      };
      el.to = {height: original.height * factor.y, width: original.width * factor.x}; // Set to state
      if (origin) { // Calculate baseline shifts
        var baseline = $.ec.getBaseline(origin, original);
        el.from.top = (original.height - el.from.height) * baseline.y;
        el.from.left = (original.width - el.from.width) * baseline.x;
        el.to.top = (original.height - el.to.height) * baseline.y;
        el.to.left = (original.width - el.to.width) * baseline.x;
      };
      if (o.options.fade) { // Fade option to support puff
        if (mode == 'show') {el.from.opacity = 0; el.to.opacity = 1;};
        if (mode == 'hide') {el.from.opacity = 1; el.to.opacity = 0;};
      };
    
      // Animation
      o.options.from = el.from; o.options.to = el.to;
    
      // Animate
      el.effect('size', o.options, o.duration, o.callback);
      el.dequeue();
    });
    
  };
  
  $.ec.size = function(o) {

    return this.queue(function() {
      
      // Create element
      var el = $(this), props = ['position','top','left','width','height','overflow','opacity'];
      var props1 = ['position','overflow','opacity']; // Always restore
      var props2 = ['width','height','overflow']; // Copy for children
      var cProps = ['fontSize'];
      var vProps = ['borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'];
      var hProps = ['borderLeftWidth', 'borderRightWidth', 'paddingLeft', 'paddingRight'];
      
      // Set options
      var mode = $.ec.setMode(el, o.options.mode || 'effect'); // Set Mode
      var restore = o.options.restore || false; // Default restore
      var scale = o.options.scale || 'both'; // Default scale mode
      var original = {height: el.height(), width: el.width()}; // Save original
      el.from = o.options.from || original; // Default from state
      el.to = o.options.to || original; // Default to state
      
      // Adjust
      var factor = { // Set scaling factor
        from: {y: el.from.height / original.height, x: el.from.width / original.width},
        to: {y: el.to.height / original.height, x: el.to.width / original.width}
      };
      if (scale == 'box' || scale == 'both') { // Scale the css box
        if (factor.from.y != factor.to.y) { // Vertical props scaling
          props = props.concat(vProps);
          el.from = $.ec.setTransition(el, vProps, factor.from.y, el.from);
          el.to = $.ec.setTransition(el, vProps, factor.to.y, el.to);
        };
        if (factor.from.x != factor.to.x) { // Horizontal props scaling
          props = props.concat(hProps);
          el.from = $.ec.setTransition(el, hProps, factor.from.x, el.from);
          el.to = $.ec.setTransition(el, hProps, factor.to.x, el.to);
        };
      };
      if (scale == 'content' || scale == 'both') { // Scale the content
        if (factor.from.y != factor.to.y) { // Vertical props scaling
          props = props.concat(cProps);
          el.from = $.ec.setTransition(el, cProps, factor.from.y, el.from);
          el.to = $.ec.setTransition(el, cProps, factor.to.y, el.to);
        };
      };
      $.ec.save(el, restore ? props : props1); el.show(); // Save & Show
      $.ec.createWrapper(el); // Create Wrapper
      el.css('overflow','hidden').css(el.from); // Shift
      
      // Animate
      if (scale == 'content' || scale == 'both') { // Scale the children
        vProps = vProps.concat(['marginTop','marginBottom']).concat(cProps); // Add margins/font-size
        hProps = hProps.concat(['marginLeft','marginRight']); // Add margins
        props2 = props.concat(vProps).concat(hProps); // Concat
        el.find("*[width]").each(function(){
          child = $(this);
          if (restore) $.ec.save(child, props2);
          var c_original = {height: child.height(), width: child.width()}; // Save original
          child.from = {height: c_original.height * factor.from.y, width: c_original.width * factor.from.x};
          child.to = {height: c_original.height * factor.to.y, width: c_original.width * factor.to.x};
          if (factor.from.y != factor.to.y) { // Vertical props scaling
            child.from = $.ec.setTransition(child, vProps, factor.from.y, child.from);
            child.to = $.ec.setTransition(child, vProps, factor.to.y, child.to);
          };
          if (factor.from.x != factor.to.x) { // Horizontal props scaling
            child.from = $.ec.setTransition(child, hProps, factor.from.x, child.from);
            child.to = $.ec.setTransition(child, hProps, factor.to.x, child.to);
          };
          child.css(child.from); // Shift children
          child.animate(child.to, o.duration, o.options.easing, function(){
            if (restore) $.ec.restore(child, props2); // Restore children
          }); // Animate children
        });
      };
      
      // Animate
      el.animate(el.to, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
        if(mode == 'hide') el.hide(); // Hide
        $.ec.restore(el, restore ? props : props1); $.ec.removeWrapper(el); // Restore
        if(o.callback) o.callback.apply(this, arguments); // Callback
        el.dequeue();
      }}); 
      
    });

  };
  
})(jQuery);
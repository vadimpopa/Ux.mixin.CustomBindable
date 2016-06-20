# Ux.mixin.CustomBindable
CustomBindable for enabling and disabling view model bindings when needed

Demo: https://fiddle.sencha.com/#fiddle/1c26

![Alt Text](https://github.com/vadimpopa/Ux.mixin.CustomBindable/blob/master/example/bindings.gif)


How to use it:

- Declare bindings as config:
```javascript
Ext.define('Fiddle.view.MyTab',{
    extend: 'Ext.grid.Panel',
    mixins: {
         customBindable: 'Fiddle.mixin.CustomBindable'
    },
    
    config: {
          customBindings: {
              $value: [
                {
                    bind: '{simpsons}',
                    get: function (data) {
                        console.log('Binding called, store updated');
                        
                        this.getStore().setData(data);
                        
                        return data;
                    }
                }
              ],
              lazy: true
          }
      }
  });
```

- Declare bindings trough init method:
```javascript
Ext.define('Fiddle.view.MyTab',{
    extend: 'Ext.grid.Panel',
    mixins: {
         customBindable: 'Fiddle.mixin.CustomBindable'
    },
    
    initCustomBindings: function() {
      return [
        {
            bind: '{simpsons}',
            get: function (data) {
                console.log('Binding called, store updated');
                
                this.getStore().setData(data);
                
                return data;
            }
        }
      ];
	}
});
```

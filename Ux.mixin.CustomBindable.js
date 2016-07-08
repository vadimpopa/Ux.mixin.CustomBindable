Ext.define('Ux.mixin.CustomBindable', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'customBindable',
        after: {
            initComponent: 'initCustomBindable'
        },
        before: {
            destroy: 'destroy'
        }
    },

    config: {
        customBindings: {
            $value: [],
            lazy: true
        }
    },

    initCustomBindable: function () {
        var me = this;
        var bindings;
        var config;

        if (me.initCustomBindings) {
            bindings = me.initCustomBindings();

            Ext.apply(me.config, {
                customBindings: bindings
            });
        }

        me.on({
            scope: me,
            activate: function () {
                var me = this;

                if (!me.customBindings) {
                    me.getCustomBindings();
                } else {                    
                    me.mixins.customBindable.enable.call(me);
                }
            },
            deactivate: function () {
                this.mixins.customBindable.disable.call(this);
            }
        });
    },

    applyCustomBindings: function (bindings) {
        var i,ln;
        var binding;
        var bounds = [];
        var vm = this.lookupViewModel();

        for (i = 0, ln = bindings.length; i < ln; i++) {
            binding = vm.bind(
                bindings[i].bind,
                bindings[i].get,
                this,
                {
                    twoWay: false
                }
            );

            bounds.push(binding);
        }

        return bounds;
    },
    
    enable: function () {
        var i,ln;
        var bindings = this.getCustomBindings();
        var scheduler;

        for (i = 0, ln = bindings.length; i < ln; i++) { 
            scheduler = bindings[i].getScheduler();
            scheduler.add(bindings[i]);
            bindings[i].schedule(); 
        }
        
        if (scheduler) {
            scheduler.notify();
        }
    },

    disable: function () {
        var i,ln;
        var bindings = this.getCustomBindings();
        var scheduler;

        for (i = 0, ln = bindings.length; i < ln; i++) {
            scheduler = bindings[i].getScheduler();
            scheduler.remove(bindings[i]);
        }
    },

    destroy: function () {
        var me = this;

        if (me.customBindings) {
            me.mixins.customBindable.disable.call(me);
            me.setCustomBindings([]);
        }
    }
});


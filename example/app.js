Ext.define('Fiddle.view.Breakdown', {
    extend: 'Ext.tab.Panel',
    xtype: 'breakdown',
    title: 'Godfather Breakdown',
    viewModel: {
        data: {
            simpsons: null
        }
    },
    items: [{
        xtype: 'panel',
        title: 'First tab',
        items: [{
            xtype: 'button',
            id: 'refreshButton',
            text: 'Refresh Data',
            handler: function () {
                var vm = this.up('tabpanel').lookupViewModel();
                var date = (new Date()).toTimeString();
                
                vm.set('simpsons', [
                    { name: 'Lisa', email: 'lisa@simpsons.com', date: date },
                    { name: 'Bart', email: 'bart@simpsons.com', date: date },
                    { name: 'Homer', email: 'homer@simpsons.com', date: date },
                    { name: 'Marge', email: 'marge@simpsons.com', date:  date}
                ]);
                
                console.log('View model data changed');
            }
        }]
    },{
        xtype : 'custombindabletabpanel',
        title: 'Custombindable'
    }]
})


Ext.application({
    name: 'Godfather Breakdown',
    mainView: 'Fiddle.view.Breakdown'
});

//# sourceURL=dynamicScript.js
        

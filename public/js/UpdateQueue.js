function UpdateQueue(){
    this.init();
}
UpdateQueue.prototype = {
    init: function(){
        this.items = [];
    },
    clean: function(){
        this.items.length = 0;
    }, // end clean
    add: function(item){
        item.updated = false;
        this.items.push(item);
    },
    remove: function(item){
        item.updated = true;
    },
    removeSplice: function(item){
        item.updated = true;
        var index = this.items.indexOf(item);
        if(index > -1){
            this.items.splice(index, 1);
        }
    },
    update: function(){
        for (var i = this.items.length - 1; i >= 0; i--) {
            var item = this.items[i];
            if(item.updated){
                this.items.splice(i,1);
            }else{
                item.update();
            }
        }
    } // end update
} // end UpdateQueue

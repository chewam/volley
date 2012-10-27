var Positions = function() {

    this.items = $.extend({}, __POSITIONS__ || {});

};

Positions.prototype.set = function(position, data) {
    this.items[position] = data;
};

Positions.prototype.get = function(position) {
    return this.items[position];
};

var Positions = function(items) {

    this.items = $.extend({}, items || __POSITIONS__ || {});

};

Positions.prototype.set = function(position, data) {
    this.items[position] = data;
};

Positions.prototype.get = function(position) {
    return this.items[position];
};

Positions.prototype.remove = function(position) {
    delete this.items[position];
};

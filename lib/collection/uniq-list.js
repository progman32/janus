(function() {
  var DerivedList, UniqList, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DerivedList = require('./list').DerivedList;

  util = require('../util/util');

  UniqList = (function(_super) {
    __extends(UniqList, _super);

    function UniqList(parent, options) {
      var elem, _i, _len, _ref,
        _this = this;

      this.parent = parent;
      this.options = options != null ? options : {};
      UniqList.__super__.constructor.call(this);
      this.counts = [];
      _ref = parent.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        this._tryAdd(elem);
      }
      parent.on('added', function(elem) {
        return _this._tryAdd(elem);
      });
      parent.on('removed', function(elem) {
        return _this._tryRemove(elem);
      });
    }

    UniqList.prototype._tryAdd = function(elem) {
      var idx;

      idx = this.list.indexOf(elem);
      if (idx >= 0) {
        return this.counts[idx] += 1;
      } else {
        this.counts[this.counts.length] = 1;
        return this._add(elem);
      }
    };

    UniqList.prototype._tryRemove = function(elem) {
      var idx;

      idx = this.list.indexOf(elem);
      if (idx >= 0) {
        this.counts[idx] -= 1;
        if (this.counts[idx] === 0) {
          this.counts.splice(idx, 1);
          return this._removeAt(idx);
        }
      }
    };

    return UniqList;

  })(DerivedList);

  util.extend(module.exports, {
    UniqList: UniqList
  });

}).call(this);

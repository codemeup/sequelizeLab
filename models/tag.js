"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define("Tag", {
    tagname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
      Tag.hasMany(db.PostTag);      
    }
    }
  });

  return Tag;
};

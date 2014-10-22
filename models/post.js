"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    AuthorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    post: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
      Post.belongsTo(db.Author);  
      }
    }
  });
  return Post;
};

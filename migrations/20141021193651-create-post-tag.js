"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("PostsTags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: "Tags",
        referencesKey: "id"
      },
      postId: {
        type: DataTypes.INTEGER,
        references: "Posts",
        referencesKey: "id"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("PostTags").done(done);
  }
};
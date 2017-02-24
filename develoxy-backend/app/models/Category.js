const models = require('./index');

module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        // userId,
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'parent_id'
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'category',
        underscored: true,
        classMethods: {
            countBaseLeaves: function(userId) {
                return Category.count({where: {
                    userId,
                    parentId: null
                }});
            }
        },
        instanceMethods: {
            update: function(parent, index) {
                this.parent = parent;
                this.index = index;
                return this.save();
            },
            moveUp: function() {
                this.index = this.index - 1;
                return this.save();
            },
            moveDown: function() {
                this.index = this.index + 1;
                return this.save();
            }
        }
    });

    return Category
}
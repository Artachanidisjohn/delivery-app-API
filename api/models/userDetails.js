module.exports = (sequelize, DataTypes) => {
    const UserDetails = sequelize.define('UserDetails', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tk: {
            type: DataTypes.STRING,
            allowNull: false
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bell: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'user_details',
        timestamps: false
    });

    return UserDetails;
};

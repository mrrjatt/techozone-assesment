module.exports= (sequelize ,DataTypes)=>{
    const Vehicle = sequelize.define('vehicle', {      
      name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      categoryId:{
        type:DataTypes.INTEGER,
      },
      distance:{
        type:DataTypes.FLOAT,
      },
      description:{
        type:DataTypes.STRING,
      },
      price:{
        type:DataTypes.FLOAT,
      },
      image:{
        type:DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('image');
          return rawValue ? 'http://localhost:3000/vehicles/'+rawValue: null;
        }
      },
      averageRating:{
        type:DataTypes.FLOAT,
      },
      ratings:{
        type:DataTypes.INTEGER,
      },
      time:{
        type:DataTypes.STRING,
      },
      company:{
        type:DataTypes.STRING,
      },
      isDiscounted:{
        type:DataTypes.INTEGER,
        defaultValue:0
      },
      discountedPrice:{
        type:DataTypes.FLOAT,
      }
      
    });
    Vehicle.sync({}).then(()=>{
        console.log("table Vehicle is created!!!")
    }).catch((error)=>console.log(error))
      return Vehicle;
}
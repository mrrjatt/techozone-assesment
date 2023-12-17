module.exports= (sequelize ,DataTypes)=>{
    const Category = sequelize.define('category', {      
      name:{
        type:DataTypes.STRING,
        allowNull:false
      }
    });
    Category.sync({}).then(()=>{
        console.log("table Category is created!!!")
    }).catch((error)=>console.log(error))
      return Category;
}
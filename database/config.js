const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_ATLAS,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            });

        console.log('Online DB');
        
    } catch (error) {
        console.log(error);
        throw new Error(' DB Error ',error)
        
    }
}

module.exports = {
    dbConnection
}
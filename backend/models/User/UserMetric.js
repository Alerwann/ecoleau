import mongoose from 'mongoose';



const userMetricSchema = new mongoose.Schema({

id: {
     type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfil',
    required: true,
    unique: true
},
  identifiant :{ //j'aimerai avoir l'identifiant venant de User à l'aide l'id de userProfil
    type : String,
    required:true
  },
  nbAppel :{
    type: Number,
    required:true,
    default:0
  },
  DMT :{
    type: Number,
    required:true,
    default:0
  },
  satCli :{
    type: Number,
    required:true,
    default:0
  },
 

},{
    timestamps :true
}
)


export default mongoose.model("userMetric", userMetricSchema)
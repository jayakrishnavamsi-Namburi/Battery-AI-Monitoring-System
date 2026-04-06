import BatteryData from "../model/BatteryData.js";
export const saveBatteryData = async (req,res)=>{

  try{

    const data = await BatteryData.create(req.body);

    const io = req.app.get("io");

    io.emit("battery-update", data);

    console.log("Battery update emitted");

    res.json({
      message:"Battery data stored",
      data
    });

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

};


export const getBatteryHistory = async (req,res)=>{

  try{

    const data = await BatteryData.find().sort({createdAt:-1}).limit(100);

    res.json(data);

  }catch(err){

    res.status(500).json(err.message);

  }

};
import jobModels from "../Models/jobModels.js";
import mongoose from "mongoose";
import moment from "moment"
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModels.create(req.body);
  res.status(200).json({
    success: true,
    message: "Job Created Succesfully",
    job,
  });
};

//GET ALL JOB ******************
export const getAllJobControllers = async (req, res, next) => {

  //qyery 
  const {status, workType, search, sort} = req.query
  //Condition for searching and filtering
  const queryObject  = {
    createdBy :  req.user.userId
  }
  //logic Filters
  if(status  &&  status){
    queryObject.status = status
  }
  if(workType  && workType){
    queryObject.workType = workType; 
  }
  if(search) {
    queryObject.position = {
      $regex: search , $options:'i'
    }
  }
  let queryResult = jobModels.find(queryObject)

  //sorting
  if(sort  === 'latest'){
    queryResult = queryResult.sort('-createdAt')
  }

  if (sort === "oldest") {
    queryResult = queryResult.sort("-createdAt");
  }

  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }

  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
 
  queryResult = queryResult.skip(skip).limit(limit)
  //jobs count
  const totalJobs = await jobModels.countDocuments(queryResult)
  const numOfPage = Math.ceil(totalJobs / limit)

  const jobs = await queryResult;

  // const jobs = await jobModels.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
  });
};

// *****UPDATE JOB ******************
export const updateJobControllers = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please provide all fields");
  }
  //Find job
  const job = await jobModels.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No jobs found with this id ${id}`);
  }
  //
  // if(req.user.userId === job.createdBy.toString()){
  //     next("Your no  authorized to update this job")
  //     return;
  // }
  const updateJob = await jobModels.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updateJob });
};

//DELETE JOB |\ delete
export const deleteJobControllers = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobModels.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No job found withb this ID ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next(`Your not authorise to delete thi job`);
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Successfully Job is deleted" });
};

//=====JOBS STATS AND FILTER
export const jobStatsController = async (req, res) => {
  const stats = await jobModels.aggregate([
    //SEARCH BY USER JOB
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    //gropup
    {
      $group :{
        _id: '$status',
         count: {$sum:1},
      }
    }
  ]);

  //DEFAULT STATS
  const defaultstats = {
    pending: stats.pending || 0,
    reject :  stats.reject || 0,
    interview:  stats.interview || 0
  }

  //Monthly yearly stats
  let monthlyApplication =  await jobModels.aggregate([
    {
      $match : {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
       $group:{
      _id: {
        year :{$year : '$createdAt'},
        month: {$month : '$createdAt'}
      },
      count : {
        $sum :1
      }
     }
    }
   
  ])
//year motnh proper using moment library
monthlyApplication = monthlyApplication.map((item) => {
  const {_id:{year, month},count} = item
  const date = moment().month(month - 1).year(year).format("MMM Y")
  return {date, count}
}).reverse()

  res.status(200).json({
    message: true,
    totaljob: stats.length,
    defaultstats, monthlyApplication
  });
};

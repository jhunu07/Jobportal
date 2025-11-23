
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";

// Get user data
// Get user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth?.userId; // Clerk userId
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No Clerk userId found" });
    }

    // Since Clerk ID is stored as _id in your schema
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in database" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};



//Apply for job 
export const applyForJob = async (req, res) => {


    const { jobId } = req.body;
    const userId = req.auth.userId; // Assuming you're using Clerk for authentication

    try {
        // Validate jobId
        if (!jobId) {
            return res.json({ success: false, message: 'Job ID is required' });
        }

        // Check if the user has already applied for this job

        const isAlreadyApplied = await JobApplication.find({ userId, jobId });

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'You have already applied for this job' });

        }
        const jobData = await Job.findById(jobId)
        if (!jobData) {
            return res.json({ success: false, message: 'Job not found' });
        }
        await JobApplication.create({
            userId,
            jobId,
            companyId: jobData.companyId,
            date: new Date(),

        })
        res.json({ success: true, message: 'Application submitted successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get use applied data
export const getUserApplications = async (req, res) => {
    try {
        const userId = req.auth.userId; // Assuming you're using Clerk for authentication
        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category  level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No applications found' });
        }
        return res.json({ success: true, applications });

    } catch (error) {

        res.json({ success: false, message: error.message });

    }

}


//Update user profile(resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId; // Assuming you're using Clerk for authentication
        const resumeFile = req.file; // Assuming you're using multer for file uploads
        
        if (!resumeFile) {
            return res.json({ success: false, message: 'Resume file is required' });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path); // Assuming multer stores the file path in req.file.path
            userData.resume = resumeUpload.secure_url
        }
        await userData.save();

        res.json({ success: true, message: 'Resume updated successfully', user: userData });

    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}


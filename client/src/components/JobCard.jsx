import React, { useCallback, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const goToJob = useCallback(() => { navigate(`/job/${job._id}`); scrollTo(0,0); }, [navigate, job._id])
  const applyNow = useCallback((e) => { e.stopPropagation(); navigate(`/apply-job/${job._id}`); scrollTo(0,0); }, [navigate, job._id])

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'CO'
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-wrapper {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={goToJob}
        className='card-wrapper bg-white rounded-lg border border-l-4 border-l-blue-500 border-gray-200 overflow-hidden cursor-pointer transition-all duration-300'
        style={{
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 12px 24px rgba(59, 130, 246, 0.15)'
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: isHovered ? 'rgba(239, 246, 255, 0.5)' : 'white'
        }}
      >
        {/* Card Content */}
        <div className='p-5'>
          {/* Top Row - Logo & Badge */}
          <div className='flex items-start justify-between gap-3 mb-4'>
            <div className='h-10 w-10 rounded-md bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform duration-300'
              style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
            >
              {!imgError && job?.companyId?.image ? (
                <img
                  className='h-full w-full object-contain p-1'
                  src={job.companyId.image}
                  alt="Company logo"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className='h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs'>
                  {getInitials(job?.companyId?.name)}
                </div>
              )}
            </div>

            <span className='text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full'>
              {job?.level}
            </span>
          </div>

          {/* Job Title */}
          <h3 className='font-bold text-base text-gray-900 mb-1.5 line-clamp-2 transition-colors duration-300'
            style={{ color: isHovered ? '#2563eb' : '#111827' }}
          >
            {job?.title}
          </h3>

          {/* Company Name */}
          <p className='text-sm text-gray-600 mb-3 font-medium'>
            {job?.companyId?.name}
          </p>

          {/* Info Row */}
          <div className='flex items-center gap-2 mb-4 text-xs text-gray-500'>
            <svg className='w-3.5 h-3.5 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
            </svg>
            <span>{job?.location}</span>
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed'>
            {job?.description ? job.description.replace(/<[^>]*>/g, '').slice(0, 80) : 'No description'}
          </p>

          {/* Apply Button */}
          <button
            onClick={applyNow}
            className='w-full font-semibold text-sm py-2.5 rounded-lg transition-all duration-300'
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                : '#f0f4ff',
              color: isHovered ? 'white' : '#2563eb',
              border: isHovered ? 'none' : '2px solid #2563eb',
              boxShadow: isHovered ? '0 6px 12px rgba(37, 99, 235, 0.25)' : 'none'
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  )
}

export default React.memo(JobCard)

import React from 'react'

function PostLoading() {
  return (
    <div className="border border-blue-300 shadow rounded-md max-w-sm p-2 w-[23%] px-2 mb-4">
    <div className="animate-pulse flex flex-col space-y-4">
        <div className="w-full h-40 bg-slate-700 rounded"></div>
        <div className='w-full justify-center mb-4'>
            <div className="space-y-3">
                <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                <div className="h-2 bg-slate-700 rounded w-3/4"></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PostLoading

import React from 'react';

const Page = () => {
  return (
    <>
      <nav><h1 className='main-heading'>Profile</h1></nav>
      <div className="flex items-center justify-center h-screen">
        <div className="h-full w-6/12 bg-[#201d1d] rounded-3xl">
          <div className='main-posts-container'>
            <div className='main-new-container'>
              <div className='main-new'>
                <div className='main-dp'>

                </div>
                <div className='main-text'>
                  <span>What's new?</span>
                </div>

              </div>

            </div>
          </div>


        </div>
      </div>
    </>
  );
}

export default Page;

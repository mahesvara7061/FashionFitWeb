import React from 'react'




const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
    }
  return (
      <div className='text-center py-10'>
          <p className='text-2xl medium'>Subscribe now to get more discounts and updates from us!</p>
          <p className='text-gray-500'>Be the first to know about our latest products and exclusive offers.</p>
          <div className='flex justify-center'>
              <form onSubmit={onSubmitHandler} >
                  <input type='email' placeholder='Enter your email' className='w-96 p-2 rounded-md border border-gray-300' />
                  <button type='submit' className='bg-black text-white p-2 rounded-md'>Subscribe</button>
              </form>
          </div>
      
    </div>
  )
}

export default NewsletterBox

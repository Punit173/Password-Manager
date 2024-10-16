import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gray-400 p-5 text-center flex items-center place-content-evenly'>
        <a href=""><img src="https://static-00.iconduck.com/assets.00/password-icon-1903x2048-m0d1f305.png" width={50} alt="" /></a>
        <ul className='flex gap-5'>
            <a href="/"><li className='hover:underline'>Add Password</li></a>
            <a href="/show"><li className='hover:underline'>Show Passwords</li></a>
        </ul>
    </div>
  )
}

export default Navbar

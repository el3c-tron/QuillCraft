#QuillCraft

<div className="flex flex-row">
    
    {/* LOGO DIV */}
    
          <div className="flex flex-row p-4 ml-8 mt-4">

              <p className="text-[30px] text-[#F1D4D4] font-semibold ">Quill </p>
              
              <p className="text-[30px] font-['Pacifico'] text-transparent bg-clip-text bg-gradient-to-r from-[#F1D4D4] via-[#C060A1] to-[#8c14a4]">
                  Craft.
              </p>

          </div>

      </div>


# FORM DATA

const getdata = (e) => {
    e.preventDefault();
    ;(async() => {

      const formData = new FormData()
      formData.append('avatar', file)
      formData.append('fullname', fullname)
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)

      const response = await axios.post('/api/v1/user/register', formData);

      console.log(response);

    })();
    
}

<form onSubmit={getdata}>

          <input type="text" onChange={(e) => setFullname(e.target.value)} value={fullname}></input>
          <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}></input>
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}></input>
          <input type="text" onChange={(e) => setPassword(e.target.value)} value={password}></input>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
          <button >Click</button>

        </form>

<!-- LIkE and Bookmark button on blog page -->

<div className='border-2 p-4 flex '>
        <div className='p-2 w-fit'>
          <button className='flex pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-[0px_0px_10px_5px_rgba(0,0,0,.5)] hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,.3)] transition-all ease-in-out duration-500'>
            <div className={`stroke-[#ff0000] stroke-2 ${like ? 'fill-[#ff0000] ' : 'fill-none'}`}>
              <Like />
            </div>
            <span className='tracking-widest text-[0.94rem] ml-2 '>
              {likesCount}
            </span>
          </button>

        </div>

        <div className='p-2 w-fit'>
          <button className='flex p-2 rounded-lg shadow-[0px_0px_10px_5px_rgba(0,0,0,.5)] hover:shadow-[0px_0px_10px_5px_rgba(0,0,0,.3)] transition-all ease-in-out duration-500'>
            <div className={`stroke-[#ffff00] stroke-2 ${like ? 'fill-[#ffff00] ' : 'fill-none'}`}>
              <Star />
            </div>
          </button>

        </div>
      </div>
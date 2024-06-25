import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Comments({content, blogId, owner, createdAt, blogOwner}) {

    const [username, setUsername] = useState("");


    useEffect(()=> {
        axios.get(`/api/v1/user/getUserById/${owner}`)
            .then((response) => {
                setUsername(response.data.data.username)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [owner])

    const updationDate = parseInt(createdAt.substring(8,10));
    const updationMonth = parseInt(createdAt.substring(5,7));
    const updationYear = parseInt(createdAt.substring(0,4));
    const updationHour = parseInt(createdAt.substring(11,13));
    const updationMinute = parseInt(createdAt.substring(14,16));
    const updationSecond = parseInt(createdAt.substring(17,19));

    const date = new Date();
    const currentDate = date.getUTCDate();
    const currentMonth = date.getUTCMonth() + 1;
    const currentYear = date.getUTCFullYear();
    const currentHour = date.getUTCHours();
    const currentMinute = date.getUTCMinutes();
    const currentSecond = date.getUTCSeconds();

    let time;   

    if (currentYear - updationYear !== 0) time = currentYear - updationYear + ' years';
    else if(currentMonth - updationMonth !== 0) time = currentMonth - updationMonth + ' months';
    else if(currentDate - updationDate !== 0) time = currentDate - updationDate + ' days';
    else if(currentHour - updationHour !== 0) time = currentHour - updationHour + ' hours';
    else if(currentMinute - updationMinute !== 0) time = currentMinute - updationMinute + ' minutes';
    else time = currentSecond - updationSecond + ' seconds';

    return (
        <div className='flex flex-col w-[80%]'>
            <Link to={`/userProfile/${owner}`}>
                {
                    (owner === blogOwner) ? (
                        <span className='text-[0.8rem] font-[Pacifico] tracking-widest text-[#d3b81d] cursor-pointer'> 
                            @{username}
                        </span>
                    ) : (
                        <span className='text-[0.8rem] font-[Pacifico] tracking-widest text-[#80b3ff] cursor-pointer'> 
                            @{username}
                        </span>
                    )
                }
                
            </Link>
            <p className='text-[.9rem] mt-2 tracking-widest'>
                {content}
            </p>
            <span className='mt-2 text-[.7rem] opacity-30 tracking-widest'>
                {time} ago
            </span>
        </div>
    )
}

export default Comments
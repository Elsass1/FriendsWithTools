'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import UserTabs from '@/app/components/UserTabs';
import { User } from '@/app/lib/types';


const UserPage = () => {

  const [userInformation, setUserInformation] = useState<User []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [connectedUser, setConnectedUser] = useState<User | undefined>(undefined);

  const connectedUserEmail = 'john.doe@example.com';

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/user');
        const data: User []= await response.json();
        setUserInformation(data);
        setLoading(false);

        const user = data.find(user => user.email === connectedUserEmail);
        setConnectedUser(user);
      } catch (error) {
        console.error('Failed to fetch information for this user');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading your user details...</div>;
  }

  console.log('User info state:', userInformation);

  userInformation.map((userInfo) => console.log('user name', userInfo.name));

  return (
    <div className='flex flex-col justify-center'>
      <header className=' flex row-span-1 row py-4 px-8  border rounded border-solid border-zinc-400  bg-darkGreen items-center justify-start mb-1'>
        <Avatar className='h-14 w-14 mr-8'>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='rounded-full' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='chat-info flex-col'>
          <p className='font-bold text-xl text-white'>{connectedUser?.name}{' '}{connectedUser?.lastName}</p>
          <p className='text-xs text-slate-50'>Created on June 25th, 2024 {connectedUser.}</p>
        </div>
      </header>
      {userInformation ?
        <UserTabs userInformation={userInformation} /> : <p>no user</p>
      }
      <Button variant='destructive' className='flex justify-self-center w-52 ml-[5.5rem] my-3'>Log out</Button>
    </div>
  );
};

export default UserPage;

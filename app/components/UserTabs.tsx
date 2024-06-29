/* eslint-disable react/no-unescaped-entities */

import React, {useEffect, useState} from 'react';
import { editUserDetails } from '../api/editUserDetails/route';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { User } from '../lib/types';

export interface UserDetailsProps {
  userInformation: User
}

const UserTabs = ({userInformation}:UserDetailsProps ) => {
  const [userDetails, setUserDetails] = useState(userInformation);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUserDetails(userInformation);
  }, [userInformation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      ...userDetails
    };
    try {
      const response = await fetch('/api/editUserDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log('API response:',responseData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const updateUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Hello {userDetails.name}</h1>
          {isEditing ? (
            <div className="space-y-1">
              <Label htmlFor="name">Edit Name</Label>
              <Input
                id="name"
                name="name"
                value={userDetails.name}
                onChange={updateUser}
              />

              <Button type="submit" className="bg-darkGreen">
                Save
              </Button>
            </div>
          ) : (
            <Button className="bg-darkGreen" onClick={toggleEdit}>
              Edit
            </Button>
          )}
        </form>
      </div>


      <Tabs defaultValue="account" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <form action="">
          <TabsContent value="account">
            <Card>
              <CardHeader className='mt-5'>
                <CardTitle>Account</CardTitle>
                <CardDescription>
              Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-12">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" />
                </div>
                <div className="space-y-1 grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="profile-pic">Profile Picture</Label>
                  <Input type='file' id="profile-pic" />
                </div>
              </CardContent>
              <CardFooter className='mt-4 mb-4'>
                <Button className='bg-darkGreen'>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
        <TabsContent value="password">
          <Card>
            <CardHeader className='mt-5'>
              <CardTitle>Password</CardTitle>
              <CardDescription>
              Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-12">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter className='mt-4 mb-4'>
              <Button className='bg-darkGreen'>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UserTabs;
function setUserInfo (arg0: any) {
  throw new Error('Function not implemented.');
}


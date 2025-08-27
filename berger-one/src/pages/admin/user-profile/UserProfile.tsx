import React from 'react';
import UserProfileForm from '../../components/User-Profile/UserProfileForm';

const UserProfile = (data: any) => {
    return (
        <>
            <UserProfileForm />
        </>
    );
};

export default React.memo(UserProfile);

import './styles.scss';

import ProfileHeading from './ProfileHeading';
import ProfileContent from '../ProfileContent';

import UserProfileData from './UserProfileData';
import ProfileOptions from './ProfileOptions';

const ProfileInformation = () => {
  return (
    <section className='information animate__animated animate__fadeIn'>
      <ProfileHeading />

      <ProfileContent>
        <UserProfileData />
        <ProfileOptions />
      </ProfileContent>
    </section>
  );
};

export default ProfileInformation;

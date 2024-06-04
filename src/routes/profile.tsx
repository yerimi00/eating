import React, { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GENDER, GRADE } from '../constants';
import CreateProfileInput from '../components/createProfileInput';

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [grade, setGrade] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      try {
        
        const q = doc(db, 'user', uid)
        const querySnapshot = await getDoc(q);
        if (querySnapshot.exists()) {
          const userData = querySnapshot.data();
          setName(userData.name);
          setGrade(userData.grade);
          setGender(userData.gender);
        } else {
          console.log('No matching documents.');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'user', user.uid)
      try {
        await updateDoc(userRef, {
            name: name,
            grade: grade,
            gender: gender,
          });
          setIsEditing(false);
        
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/loginSignup');
    console.log('Logout');
  };

  const handleLogoOnClick = () => {
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen bg-white p-8">
      <div className='flex flex-col item-center justify-center bg-white w-full'>
        <div className='flex items-center justify-center mt-10'>
        <img onClick={handleLogoOnClick} src="/images/subLogo.png" alt="Logo" className="w-48 h-24" />
        </div>
      <div className="bg-white rounded-lg w-full">
        <h1 className="text-2xl mb-6 mt-6 font-bold text-gray-500">MY page</h1>
        <div className="mb-4">
          <CreateProfileInput
            label="이름"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=''
            disabled={!isEditing}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-600 tracking-wide mb-2">
              학년
            </label>
            <div className="grid grid-cols-2 gap-3">
            {GRADE.map((gradeOption, idx) => (
                <button
                  type="button"
                  key={gradeOption}
                  onClick={() => setGrade(idx)}
                  disabled={!isEditing}
                  className={`p-3.5 border  rounded text-sm  ${
                    idx === 2 ? "col-span-2" : ""
                  } ${
                    grade === idx
                      ? "border-loginSignupBt bg-loginSignupBt text-white"
                      : " border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {gradeOption}
                </button>
            ))}
          </div>
        </div>
        <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 tracking-wide mb-2">
              성별
            </label>
            <div className="grid grid-cols-2 gap-3">
            {GENDER.map((genderOption, idx) => (
              <button
              type="button"
              key={genderOption}
              onClick={() => setGender(idx)}
              disabled={!isEditing}
              className={`p-3.5 border  rounded text-sm ${
                gender === idx
                  ? "border-loginSignupBt bg-loginSignupBt text-white"
                  : " border-gray-300 bg-white text-gray-400"
              }`}
            >
              {genderOption}
            </button>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 mt-44">
          {isEditing ? (
            <button
              className="flex-1 bg-button text-white font-semibold tracking-wider py-4  rounded w-full"
              onClick={handleSave}
            >
              완료
            </button>
          ) : (
            <button
              className="flex-1 bg-button text-white font-semibold tracking-wider py-4  rounded w-full"
              onClick={handleUpdate}
            >
              수정하기
            </button>
          )}
          <button
            className="flex-1 bg-button text-white font-semibold tracking-wider py-4 rounded w-full"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;

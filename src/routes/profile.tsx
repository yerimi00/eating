import React, { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { GENDER, GRADE } from '../constants';

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img onClick= {handleLogoOnClick} src="/images/subLogo.png" alt="Logo" className="w-40 h-20" />
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-4">MY page</h1>
        <div className="mb-4">
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">학년</label>
          <div className="flex space-x-2">
            {GRADE.map((gradeOption, idx) => (
              <button
              className={`flex-1 p-2 border rounded ${grade === idx ? 'bg-gray-200' : ''}`}
              onClick={() => setGrade(idx)}
              disabled={!isEditing}
            >
              {gradeOption}
            </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">성별</label>
          <div className="flex space-x-2">
            {GENDER.map((genderOption, idx) => (
              <button
              className={`flex-1 p-2 border rounded ${gender === idx ? 'bg-gray-200' : ''}`}
              onClick={() => setGender(idx)}
              disabled={!isEditing}
            >
              {genderOption}
            </button>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <button
              className="flex-1 bg-orange-400 text-white py-2 rounded"
              onClick={handleSave}
            >
              완료
            </button>
          ) : (
            <button
              className="flex-1 bg-orange-400 text-white py-2 rounded"
              onClick={handleUpdate}
            >
              수정하기
            </button>
          )}
          <button
            className="flex-1 bg-orange-400 text-white py-2 rounded"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

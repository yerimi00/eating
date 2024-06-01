import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';

const MyPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      try {
        const q = query(collection(db, 'user'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
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
    console.log('Update:', { name, grade, gender });
  };

  const handleLogout = () => {
    auth.signOut();
    console.log('Logout');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-4">MY page</h1>
        <div className="mb-4">
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">학년</label>
          <div className="flex space-x-2">
            <button
              className={`flex-1 p-2 border rounded ${grade === '1학년' ? 'bg-gray-200' : ''}`}
              onClick={() => setGrade('1학년')}
            >
              1학년
            </button>
            <button
              className={`flex-1 p-2 border rounded ${grade === '2학년' ? 'bg-gray-200' : ''}`}
              onClick={() => setGrade('2학년')}
            >
              2학년
            </button>
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className={`flex-1 p-2 border rounded ${grade === '3,4학년' ? 'bg-gray-200' : ''}`}
              onClick={() => setGrade('3,4학년')}
            >
              3,4학년
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">성별</label>
          <div className="flex space-x-2">
            <button
              className={`flex-1 p-2 border rounded ${gender === '여성' ? 'bg-gray-200' : ''}`}
              onClick={() => setGender('여성')}
            >
              여성
            </button>
            <button
              className={`flex-1 p-2 border rounded ${gender === '남성' ? 'bg-gray-200' : ''}`}
              onClick={() => setGender('남성')}
            >
              남성
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="flex-1 bg-orange-400 text-white py-2 rounded"
            onClick={handleUpdate}
          >
            수정하기
          </button>
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

export default MyPage;

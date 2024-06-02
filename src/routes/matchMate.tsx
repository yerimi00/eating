import React, { useState } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MatchConditions from '../components/matchConditions';
import Matching from '../components/\bmatching';
import MatchComplete from '../components/matchComplete';


const MatchMate: React.FC = () => {
  const [gender, setGender] = useState<string>('랜덤');
  const [location, setLocation] = useState<string>('랜덤');
  const [grade, setGrade] = useState<string>('랜덤');
  const [matching, setMatching] = useState<boolean>(false);
  const [matched, setMatched] = useState<boolean>(false);
  const [mate, setMate] = useState<{ name: string; location: string } | null>(null);

  const handleMatch = async () => {
    setMatching(true);
    setMatched(false);
    setMate(null);

    const user = auth.currentUser;

    const q = query(
      collection(db, 'room'),
      where('status', '==', 0),
      where('wantGender', 'in', [gender, '랜덤']),
      where('wantGrade', 'in', [grade, '랜덤']),
      where('location', 'in', [location, '랜덤'])
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const room = querySnapshot.docs[0];
      await addDoc(collection(db, 'room'), {
        ...room.data(),
        user_2: user?.name,
        status: 1
      });
      setMate({ name: room.data().user_1, location: room.data().location });
      setMatched(true);
    } else {
      await addDoc(collection(db, 'room'), {
        user_1: user.name,
        user_2: '',
        status: 0,
        location: location,
        grade: user.grade,
        gender: user.gender,
        wantGrade: grade,
        wantGender: gender,
      });
    }
    setMatching(false);
  };

  const handleCancel = () => {
    setMatching(false);
    setMatched(false);
    setMate(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-4">학식 메이트 매칭하기</h1>
        {!matching && !matched && (
          <MatchConditions
            gender={gender}
            setGender={setGender}
            location={location}
            setLocation={setLocation}
            grade={grade}
            setGrade={setGrade}
            handleMatch={handleMatch}
          />
        )}
        {matching && (
          <Matching handleCancel={handleCancel} />
        )}
        {matched && mate && (
          <MatchComplete mate={mate} handleCancel={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default MatchMate;

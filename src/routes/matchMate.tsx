import React, { useState } from 'react';
import { collection, query, where, getDocs, addDoc, Query, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MatchConditions from '../components/matchConditions';
import Matching from '../components/\bmatching';
import MatchComplete from '../components/matchComplete';

const MatchMate: React.FC = () => {
  const [gender, setGender] = useState<number | null>(null);
  const [location, setLocation] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [matching, setMatching] = useState<boolean>(false);
  const [matched, setMatched] = useState<boolean>(false);
  const [mate, setMate] = useState<{ name: number; location: number } | null>(null);

  const filterByCondition = (
    queryRef: Query,
    { gender, grade }: { gender: number | null; grade: number | null; }
  ): Query => {
    queryRef = query(queryRef, where("isValid", "==", 0));

    if (gender !== null && gender !== 2) {
      queryRef = query(queryRef, where("gender", "==", gender));
    }

    // if (location !== null && location !== 3) {
    //   queryRef = query(queryRef, where("location", "==", location));
    // }

    if (grade !== null && grade !== 3) {
      queryRef = query(queryRef, where("grade", "==", grade));k
    }

    return queryRef;
  };

  const handleMatch = async () => {
    setMatching(true);
    setMatched(false);
    setMate(null);

    const user = auth.currentUser;

    if(!user?.emailVerified) {
      alert('이메일 인증이 완료되지 않았습니다. 인증을 완료해주세요.');
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

    let queryRef: Query = collection(db, 'room');
    queryRef = filterByCondition(queryRef, { gender, grade });

    const querySnapshot = await getDocs(queryRef);
    let roomMatched = false;

    if (!querySnapshot.empty) {
      for (const room of querySnapshot.docs) {
        const roomData = room.data();
        if (
          (roomData.wantGrade === grade || roomData.wantGrade === 3) &&
          (roomData.wantGender === gender || roomData.wantGender === 2) &&
          (roomData.wantLocation === location || roomData.wantLocation === 3) 
        ) {
          await updateDoc(room.ref, {
            user_2: userData?.name,
            isValid: 1,
          });
          setMate({ name: roomData.user_1, location: roomData.location });
          setMatched(true);
          roomMatched = true;
          break;
        }
      }
    }

    if (!roomMatched) {
      await addDoc(collection(db, 'room'), {
        user_1: userData?.name,
        user_2: '',
        isValid: 0,
        grade: userData?.grade,
        gender: userData?.gender,
        wantlocation: location,
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

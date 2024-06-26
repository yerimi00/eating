import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, Query, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import MatchConditions from '../components/matchConditions';
import MatchComplete from '../components/matchComplete';
import Matching from '../components/\bmatching';
import { useNavigate } from 'react-router-dom';

interface IUserData {
  gender: number
  grade: number
  name: string
}

const MatchMate: React.FC = () => {
  const [gender, setGender] = useState<number | null>(null);
  const [location, setLocation] = useState<number | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [matching, setMatching] = useState<boolean>(false);
  const [matched, setMatched] = useState<boolean>(false);
  const [mate, setMate] = useState<{ name: string; location: number } | null>(null);
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/home");
  }

  const filterByCondition = (
    queryRef: Query,
    { gender, grade }: { gender: number | null; grade: number | null; }
  ): Query => {
    queryRef = query(queryRef, where("isValid", "==", 0));

    if (gender !== null && gender !== 2) {
      queryRef = query(queryRef, where("gender", "==", gender));
    }

    if (grade !== null && grade !== 3) {
      queryRef = query(queryRef, where("grade", "==", grade));
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
      setMatching(false);
      return;
    }

    const userDocRef = doc(db, 'user', user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data() as IUserData;
    const {grade: myGrade, gender: MyGender, name: MyName} = userData;

    let queryRef: Query = collection(db, 'room');
    queryRef = filterByCondition(queryRef, { gender, grade });

    const querySnapshot = await getDocs(queryRef);
    let roomMatched = false;

    if (!querySnapshot.empty) {
      for (const room of querySnapshot.docs) {
        const roomData = room.data();
        if (roomData.wantGrade < 3) {
          if (roomData.wantGrade !== myGrade) {
            continue;
          } 
        }

        if (roomData.wantGender < 2) {
          if (roomData.wantGender !== MyGender) {
            continue;
          } 
        }

        if (roomData.wantLocation < 3) {
          if (roomData.wantLocation !== location) {
            continue;
          } 
        }

        await updateDoc(room.ref, {
            user_2: MyName,
            isValid: 1,
        });
        setMate({ name: roomData.user_1, location: roomData.location }); // 수정: wantLocation -> location
        setMatching(false);
        setMatched(true);
        roomMatched = true;
        break;
      }
    } 

    if (!roomMatched) {
      const newRoomRef = await addDoc(collection(db, 'room'), {
        user_1: MyName,
        user_2: '',
        isValid: 0,
        grade: myGrade,
        gender: MyGender,
        location:Math.floor(Math.random() * 2),  // 수정: wantlocation -> location
        wantGrade: grade,
        wantGender: gender,
        // wantLocation: location,
      });
      setCreatedRoomId(newRoomRef.id);
    }
  };

  const handleCancel = async () => {
    setMatching(false);
    setMatched(false);
    setMate(null);

    if (createdRoomId) {
      const roomRef = doc(db, 'room', createdRoomId);
      await updateDoc(roomRef, { isValid: 1 });
    }

    setCreatedRoomId(null);
  };

  useEffect(() => {
    if (createdRoomId) {
      const roomRef = doc(db, 'room', createdRoomId);
      const unsubscribe = onSnapshot(roomRef, (doc) => {
        const roomData = doc.data();
        if (roomData && roomData.isValid === 1 && roomData.user_2 !== '') {
          setMate({ name: roomData.user_2, location: roomData.location }); // 수정: wantLocation -> location
          setMatching(false);
          setMatched(true);
        }
      });
      return () => unsubscribe();
    }
  }, [createdRoomId]);

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 w-full">
        <div className='mb-6'>
          <div className="flex flex-col items-center justify-center mt-10">
            <img onClick={handleOnClick} src="/images/subLogo.png" alt="Logo" className="w-48 h-24"/>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-500">학식 메이트 매칭하기</h1>
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

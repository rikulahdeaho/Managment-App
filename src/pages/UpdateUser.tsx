import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './pages.css';

const UpdateUser: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [created, setCreated] = useState('');
    const history = useHistory();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'Users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log(userData)

            setName(userData?.Name || '');
            setEmail(userData?.Email || '');
            setRole(userData?.Role || '');
          }
        } catch (error) {
          console.error('Error fetching user: ', error);
        }
      };
  
      fetchData();
    }, [userId]);
  
    const handleUpdateUser = async () => {
      try {
        await updateDoc(doc(db, 'Users', userId), { Name: name, Email: email, Role: role, Created: created });
        history.push('/home');
      } catch (error) {
        console.error('Error updating user: ', error);
      }
    };
  
    return (
      <IonPage style={{ padding: "15px" }}>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h2>Update: {name}</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonInput
                fill="outline"
                placeholder="Name"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
                clearInput
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonInput
                fill="outline"
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonInput
                fill="outline"
                placeholder="Role"
                value={role}
                onIonChange={(e) => setRole(e.detail.value!)}
                clearInput
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton onClick={handleUpdateUser} fill="solid">Update User</IonButton>
              <IonButton onClick={() => { history.push('/home') }} fill="outline">Back</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
    );
  };

export default UpdateUser;
import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './pages.css';

const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();

  const handleCreateUser = async () => {
    try {
      const currentTime = Timestamp.now();
      await addDoc(collection(db, 'Users'), { Name: name, Email: email, Role: role, Created: currentTime, Updated: '' });
      history.push('/home');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h2>Create User</h2>
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
              <IonButton onClick={handleCreateUser} fill="solid">Create User</IonButton>
              <IonButton onClick={() => { history.push('/home') }} fill="outline">Back</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;
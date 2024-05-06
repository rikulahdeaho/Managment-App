import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonToast } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';
import './pages.css';

const Tab2: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setShowToast(true);
      setToastMessage('Registered successfully!');
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.message);
      setToastMessage(error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="form-container">
          <h1>Register</h1>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
          <IonToast isOpen={showToast} message={toastMessage} position="top" onDidDismiss={() => setShowToast(false)} duration={3000} />
          <p className="login-link">Already have an account? <Link to="/tab1">Login</Link></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

import React, {useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { IonContent, IonPage, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonTitle, IonToast, IonButtons } from '@ionic/react';
import { Link } from 'react-router-dom';
import './pages.css';

const Tab1: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setShowToast(true);
      setToastMessage('Logged in successfully!');
      console.log('Logged in successfully!');
      // Redirect or navigate to the next page upon successful login
    } catch (error) {
      console.error('Error signing in:', error.message);
      setToastMessage(error.message);
      setShowToast(true);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{user ? `Welcome, ${user.email}` : 'Lab4'}</IonTitle>
          <IonButtons slot="end">
            {user && <IonButton expand="block" onClick={() => firebase.auth().signOut()}>Logout</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="login-form">
          <h1>Login</h1>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
          <IonToast isOpen={showToast} message={toastMessage} position="top" onDidDismiss={() => setShowToast(false)} duration={3000} />
          <p className="register-link">Don't have an account? <Link to="/tab2">Register</Link></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
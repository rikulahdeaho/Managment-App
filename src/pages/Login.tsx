import React, { useState } from 'react';
import { IonButton, IonInput, IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './pages.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    history.push('/home');
  };

  return (
    <IonPage style={{ padding: "15px" }}>
      <IonContent>
        <IonInput
          type="email"
          placeholder="Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
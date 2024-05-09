import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonSpinner, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { getDocs, collection, DocumentData, deleteDoc, doc } from 'firebase/firestore';
import './pages.css';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const history = useHistory();

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'Users');
      const snapshot = await getDocs(usersRef);
      const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    history.push('/create');
  };
  
  const handleUpdateUser = async (userId: string) => {
    history.push(`/update/${userId}`);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'Users', userId));
      fetchUsers(); // Fetch fresh data after deletion
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <h1>Users</h1>
        <IonButton onClick={handleCreateUser}>Create User</IonButton>
        <IonButton onClick={() => console.log("logout")}>Logout</IonButton>
        <div className="card-container">
          {loading ? (
            <IonSpinner />
          ) : (
            users.map((user: any) => (
              <IonCard key={user.id} className="custom-card">
                <IonCardHeader>
                  <IonCardTitle>{user.Name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Email: {user.Email}</p>
                  <p>Role: {user.Role}</p>
                  <IonButton onClick={() => handleUpdateUser(user.id)} className="update-button">Update</IonButton>
                  <IonButton onClick={() => handleDeleteUser(user.id)} fill="outline" className="delete-button">Delete</IonButton>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
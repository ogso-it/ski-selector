// src/app/services/firebase-test.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, signInAnonymously } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTestService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async testFirestore(): Promise<boolean> {
    try {
      const testDocRef = doc(this.firestore, 'testConnection', 'testDoc');
      
      // Write test data
      await setDoc(testDocRef, {
        message: 'Firebase connection test',
        timestamp: new Date(),
        status: 'success'
      });
      
      // Read test data
      const docSnap = await getDoc(testDocRef);
      
      if (docSnap.exists()) {
        console.log('✅ Firestore connection successful!', docSnap.data());
        return true;
      } else {
        console.error('❌ Firestore write succeeded but read failed');
        return false;
      }
    } catch (error) {
      console.error('❌ Firestore connection failed:', error);
      return false;
    }
  }

  async testAuth(): Promise<boolean> {
    try {
      const userCredential = await signInAnonymously(this.auth);
      console.log('✅ Auth connection successful! User:', userCredential.user.uid);
      return true;
    } catch (error) {
      console.error('❌ Auth connection failed:', error);
      return false;
    }
  }

  async testAllConnections(): Promise<void> {
    console.log('🧪 Testing Firebase connections...');
    
    const firestoreSuccess = await this.testFirestore();
    const authSuccess = await this.testAuth();
    
    if (firestoreSuccess && authSuccess) {
      console.log('🎉 All Firebase connections are working!');
    } else {
      console.error('💥 Some Firebase connections failed');
    }
  }
}
import app from "firebase/app";
import firebaseConfig from "./config";
import 'firebase/auth';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  //registrar un usuario
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
      displayName: name,
    })
  }

  //Login de un usuario
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //logout de usuario
  async logOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
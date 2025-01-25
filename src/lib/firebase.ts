import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAb5tKml-O9wZvDxNbxLJBTGkk7DzE2yYk",
  authDomain: "cortexcatalyst-f1d83.firebaseapp.com",
  projectId: "cortexcatalyst-f1d83",
  storageBucket: "cortexcatalyst-f1d83.firebasestorage.app",
  messagingSenderId: "96151340359",
  appId: "1:96151340359:web:da7a0387b1f7ff1e643862",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");
facebookProvider.addScope("public_profile");

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Email Sign In Error:", error);
    let errorMessage = "Failed to sign in";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled";
        break;
      case "auth/user-not-found":
      case "auth/invalid-credential":
        errorMessage = "Invalid email or password";
        break;
      case "auth/wrong-password":
        errorMessage = "Invalid email or password";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later";
        break;
    }

    return { success: false, error: errorMessage };
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  try {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Email Sign Up Error:", error);
    let errorMessage = "Failed to create account";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "An account already exists with this email";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Email/password accounts are not enabled";
        break;
      case "auth/weak-password":
        errorMessage = "Password must be at least 6 characters long";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many attempts. Please try again later";
        break;
    }

    return { success: false, error: errorMessage };
  }
};

export const resetPassword = async (email: string): Promise<AuthResult> => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    console.error("Password Reset Error:", error);
    let errorMessage = "Failed to send password reset email";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/user-not-found":
        errorMessage = "No account found with this email";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many attempts. Please try again later";
        break;
    }

    return { success: false, error: errorMessage };
  }
};

export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Google Sign In Error:", error);
    let errorMessage = "Failed to sign in with Google";

    switch (error.code) {
      case "auth/popup-blocked":
        errorMessage =
          "Please allow popups for this website to sign in with Google";
        break;
      case "auth/popup-closed-by-user":
        errorMessage = "Sign in cancelled. Please try again";
        break;
      case "auth/unauthorized-domain":
        errorMessage = "This domain is not authorized for Google sign in";
        break;
      case "auth/cancelled-popup-request":
        errorMessage = "Only one popup request allowed at a time";
        break;
    }

    return { success: false, error: errorMessage };
  }
};

export const signInWithFacebook = async (): Promise<AuthResult> => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, facebookProvider);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Facebook Sign In Error:", error);
    let errorMessage = "Failed to sign in with Facebook";

    switch (error.code) {
      case "auth/popup-blocked":
        errorMessage =
          "Please allow popups for this website to sign in with Facebook";
        break;
      case "auth/popup-closed-by-user":
        errorMessage = "Sign in cancelled. Please try again";
        break;
      case "auth/unauthorized-domain":
        errorMessage = "This domain is not authorized for Facebook sign in";
        break;
      case "auth/cancelled-popup-request":
        errorMessage = "Only one popup request allowed at a time";
        break;
    }

    return { success: false, error: errorMessage };
  }
};

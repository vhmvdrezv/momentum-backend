// src/auth/auth.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(@Inject('FIREBASE_ADMIN') private readonly firebase: typeof admin) {}

  async verifyIdToken(token: string) {
    try {
      const decoded = await this.firebase.auth().verifyIdToken(token);
      return decoded;
    }  catch (error) {
      console.error('Firebase token verification error:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });
      throw new UnauthorizedException(`Invalid Firebase token: ${error.message}`);
    }
  } 
}

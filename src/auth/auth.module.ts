import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}

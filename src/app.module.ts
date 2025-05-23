import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { TimeEntriesModule } from './time-entries/time-entries.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [FirebaseModule, AuthModule, TimeEntriesModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

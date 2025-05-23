import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class TimeEntriesService {
    constructor(@Inject('FIREBASE_ADMIN') private readonly firebase: typeof admin) {}

    async getTimeEntries(userId: number) {
        const snapshot = (await this.firebase.firestore().collection('timeEntries').get()).docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return snapshot;
    }

    async createTimeEntry() {
        /*
            class TimeEntry {
            String projectName;
            Duration duration;
            DateTime? startTime;
            DateTime? endTime;
            String? description;
            bool isTracking;
            bool isFavorite;

            TimeEntry({
                required this.projectName,
                required this.duration,
                this.startTime,
                this.endTime,
                this.description,
                this.isTracking = false,
                this.isFavorite = false,
            });
            }
        */
        const timeEntry = {
            projectName: 'Project A',
            startTime: new Date(),
            endTime: new Date(),
            duration: "",
            description: 'Worked on project A',
            isTracking: false,
            isFavorite: false,
        };

        const docRef = this.firebase.firestore().collection('timeEntries').doc();
        await docRef.set(timeEntry);
        return docRef.id;
    }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Injectable()
export class TodosService {
    constructor(@Inject('FIREBASE_ADMIN') private readonly firebase: typeof admin) {}

    async createTodo(createTodoDto: CreateTodoDto, userId: string) {
        const todoData = {
            ...createTodoDto,
            userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        const docRef = await this.firebase.firestore().collection('todos').add(todoData);

        return {
            status: 'success',
            message: 'Todo created successfully',
            data: {
                id: docRef.id,
                ...todoData,
            },
        };
    }

    async getTodos(userId: string) {
        // just creating a query object 
        const todosRef = this.firebase
            .firestore()
            .collection('todos')
            .where('userId', '==', userId)
            .orderBy('createdAt');
        // execute the query
        const snapshot = await todosRef.get();

        if (snapshot.empty) {
            return {
                status: 'success',
                message: 'No todos found',
                data: [],
            };
        }

        const todos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return {
            status: 'success',
            message: 'Todos retrieved successfully',
            data: todos,
        };
    }

    async updateTodo(updateTodoDto: UpdateTodoDto, todoId: string) {
        // just creating a query
        const todosRef = this.firebase.firestore().collection('todos').doc(todoId);
        const doc = await todosRef.get();
        //console.log(todoId)

        if (!doc.exists) {
            throw new NotFoundException('todo not found');
        }

        await todosRef.update({
            ...updateTodoDto,
            updatedAt: this.firebase.firestore.FieldValue.serverTimestamp(),
        });

        const updatedDoc = await todosRef.get();

        return {
            status: 'success', 
            message: 'Todo updated successfully',
            data: {
                id: updatedDoc.id,
                ...updatedDoc.data(),
            }
        }
    }

    async deleteTodo(todoId: string) {
        const todosRef = this.firebase.firestore().collection('todos').doc(todoId);
        const doc = await todosRef.get();
        if (!doc.exists) {
            throw new NotFoundException('todo not found');
        }

        await todosRef.delete();
        return {
            status: 'success', 
            message: 'Todo deleted successfully',
        }
    } 

    
}

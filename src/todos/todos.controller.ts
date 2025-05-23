import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@UseGuards(FirebaseAuthGuard)
@Controller('todos')
export class TodosController {
    
    constructor(
        private readonly todosService: TodosService
    ) { }

   
    @Post()
    async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() req) {
        console.log(req.user);
        return this.todosService.createTodo(createTodoDto, req.user.uid);
    }

    @Get()
    async getTodos(@Req() req) {
        return this.todosService.getTodos(req.user.uid);
    }

    @Patch(':id')
    async updateTodo(@Body() updateTodoDto: UpdateTodoDto, @Param('id') todoId: string) {
        return this.todosService.updateTodo(updateTodoDto, todoId)
    }

    @Delete(':id')
    async deleteTodo(@Param('id') todoId: string) {
        return this.todosService.deleteTodo(todoId);
    } 
}

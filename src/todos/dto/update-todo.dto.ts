import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTodoDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;
    
    @IsOptional()
    @IsNotEmpty()
    category: string;

    @IsOptional()
    @IsBoolean()
    isDone: boolean;

    @IsOptional()
    @IsBoolean()
    isFavorite: boolean
}
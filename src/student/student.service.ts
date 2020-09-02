import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
  ) {}

  getStudent(id: string): Promise<Student> {
    return this.repository.findOne(id);
  }

  createStudent(input: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = input;
    const student = this.repository.create({ firstName, lastName });
    return this.repository.save(student);
  }

  getStudents(): Promise<Student[]> {
    return this.repository.find();
  }
}

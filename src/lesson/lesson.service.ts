import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne(id);
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      students,
    });
    // lesson.name = name this works fine too
    // lesson.startDate = startDate this works fine too
    // lesson.endDate = endDate this works fine too
    return this.lessonRepository.save(lesson);
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  assignStudentsToLesson(
    lessonId: string,
    studensIds: string[],
  ): Promise<Lesson> {
    return this.lessonRepository.findOne(lessonId).then(lesson => {
      const prevStudents = lesson.students ? lesson.students : [];
      lesson.students = [...prevStudents, ...studensIds];
      return this.lessonRepository.save(lesson);
    });
  }
}

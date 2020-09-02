import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AsignStudentsToLessonInput } from './asign-students-to-lesson.input';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    console.log(createLessonInput);
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  asignStudentsToLesson(
    @Args('assignStudentsToLessonInput') input: AsignStudentsToLessonInput,
  ) {
    const { lessonId, studentsIds } = input;
    return this.lessonService.assignStudentsToLesson(lessonId, studentsIds);
  }
}

import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AsignStudentsToLessonInput {
  @Field(type => ID)
  lessonId: string;

  @Field(type => [ID])
  studentsIds: string[];
}

import { Component, signal } from '@angular/core';
import { Question } from '../../interfaces/question';
import { QuestionService } from '../../services/question.service';
import { JsonPipe } from '@angular/common';
import { QuestionItemComponent } from '../question-item/question-item.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [
    JsonPipe,
    QuestionItemComponent,
  ],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent {
  protected readonly questions = signal<Question[]>([]);
  private total = 0;

  constructor(private readonly questionService: QuestionService) {
    this.loadQuestions(0);
  }

  private loadQuestions(page: number) {
    this.questionService.getQuestions(page)
    .pipe(
      delay(5000),
    ).subscribe(questions => {
      this.total = questions.total;

      this.questions.update(oldQuestions => {
        return [...oldQuestions, ...questions.data];
      });
    });
  }

  loaded(id: number) {
    if (this.questions().length < this.total && this.questions().at(-2)?.id === id) {
      this.loadQuestions(this.questions().length / 5);
    }
  }
}


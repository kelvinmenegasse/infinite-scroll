import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { Question } from '../interfaces/question';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  fakeDatabase: Question[] = [
    {
      id: 1,
      title: "What is the capital of France?",
      body: "The capital of France is a well-known city in Europe.",
      htmlBody: "<p>The capital of France is a well-known city in Europe.</p>",
      upvotes: 10,
      downvotes: 2,
      createdAt: new Date('2023-01-01'),
      lastModified: null,
      authorId: 1,
      topicId: 1,
    },
    {
      id: 2,
      title: "What is 2 + 2?",
      body: "Basic arithmetic question.",
      htmlBody: "<p>Basic arithmetic question.</p>",
      upvotes: 5,
      downvotes: 1,
      createdAt: new Date('2023-01-02'),
      lastModified: null,
      authorId: 2,
      topicId: 2,
    },
    {
      id: 3,
      title: "What is the largest planet?",
      body: "A question about the solar system.",
      htmlBody: "<p>A question about the solar system.</p>",
      upvotes: 8,
      downvotes: 0,
      createdAt: new Date('2023-01-03'),
      lastModified: new Date('2023-01-04'),
      authorId: 3,
      topicId: 3,
    },
    {
      id: 4,
      title: "What is the boiling point of water?",
      body: "A common science question.",
      htmlBody: "<p>A common science question.</p>",
      upvotes: 3,
      downvotes: 1,
      createdAt: new Date('2023-01-04'),
      lastModified: null,
      authorId: 4,
      topicId: 4,
    },
    {
      id: 5,
      title: "Who wrote '1984'?",
      body: "A question about literature.",
      htmlBody: "<p>A question about literature.</p>",
      upvotes: 12,
      downvotes: 3,
      createdAt: new Date('2023-01-05'),
      lastModified: null,
      authorId: 5,
      topicId: 5,
    },
    {
      id: 6,
      title: "What is the speed of light?",
      body: "A fundamental question in physics.",
      htmlBody: "<p>A fundamental question in physics.</p>",
      upvotes: 7,
      downvotes: 2,
      createdAt: new Date('2023-01-06'),
      lastModified: new Date('2023-01-07'),
      authorId: 6,
      topicId: 6,
    },
    {
      id: 7,
      title: "What is the largest mammal?",
      body: "A question about animals.",
      htmlBody: "<p>A question about animals.</p>",
      upvotes: 9,
      downvotes: 1,
      createdAt: new Date('2023-01-07'),
      lastModified: null,
      authorId: 7,
      topicId: 7,
    },
    {
      id: 8,
      title: "What is the boiling point of mercury?",
      body: "A question about chemistry.",
      htmlBody: "<p>A question about chemistry.</p>",
      upvotes: 4,
      downvotes: 1,
      createdAt: new Date('2023-01-08'),
      lastModified: new Date('2023-01-09'),
      authorId: 8,
      topicId: 8,
    },
    {
      id: 9,
      title: "Who painted the Mona Lisa?",
      body: "A question about art.",
      htmlBody: "<p>A question about art.</p>",
      upvotes: 11,
      downvotes: 3,
      createdAt: new Date('2023-01-09'),
      lastModified: null,
      authorId: 9,
      topicId: 9,
    },
    {
      id: 10,
      title: "What is the largest ocean?",
      body: "A question about geography.",
      htmlBody: "<p>A question about geography.</p>",
      upvotes: 6,
      downvotes: 2,
      createdAt: new Date('2023-01-10'),
      lastModified: new Date('2023-01-11'),
      authorId: 10,
      topicId: 10,
    },
    {
      id: 11,
      title: "What is the boiling point of nitrogen?",
      body: "A question about chemistry.",
      htmlBody: "<p>A question about chemistry.</p>",
      upvotes: 4,
      downvotes: 1,
      createdAt: new Date('2023-01-11'),
      lastModified: new Date('2023-01-12'),
      authorId: 11,
      topicId: 11,
    },
    {
      id: 12,
      title: "Who wrote 'War and Peace'?",
      body: "A question about literature.",
      htmlBody: "<p>A question about literature.</p>",
      upvotes: 12,
      downvotes: 3,
      createdAt: new Date('2023-01-12'),
      lastModified: null,
      authorId: 12,
      topicId: 12,
    },
    {
      id: 13,
      title: "What is the speed of sound?",
      body: "A fundamental question in physics.",
      htmlBody: "<p>A fundamental question in physics.</p>",
      upvotes: 7,
      downvotes: 2,
      createdAt: new Date('2023-01-13'),
      lastModified: new Date('2023-01-14'),
      authorId: 13,
      topicId: 13,
    },
    {
      id: 14,
      title: "What is the largest bird?",
      body: "A question about animals.",
      htmlBody: "<p>A question about animals.</p>",
      upvotes: 9,
      downvotes: 1,
      createdAt: new Date('2023-01-14'),
      lastModified: null,
      authorId: 14,
      topicId: 14,
    },
    {
      id: 15,
      title: "What is the boiling point of gold?",
      body: "A question about chemistry.",
      htmlBody: "<p>A question about chemistry.</p>",
      upvotes: 4,
      downvotes: 1,
      createdAt: new Date('2023-01-15'),
      lastModified: new Date('2023-01-16'),
      authorId: 15,
      topicId: 15,
    },
    {
      id: 16,
      title: "Who painted the Sistine Chapel?",
      body: "A question about art.",
      htmlBody: "<p>A question about art.</p>",
      upvotes: 11,
      downvotes: 3,
      createdAt: new Date('2023-01-16'),
      lastModified: null,
      authorId: 16,
      topicId: 16,
    },
    {
      id: 17,
      title: "What is the largest desert?",
      body: "A question about geography.",
      htmlBody: "<p>A question about geography.</p>",
      upvotes: 6,
      downvotes: 2,
      createdAt: new Date('2023-01-17'),
      lastModified: new Date('2023-01-18'),
      authorId: 17,
      topicId: 17,
    },
    {
      id: 18,
      title: "What is the boiling point of oxygen?",
      body: "A question about chemistry.",
      htmlBody: "<p>A question about chemistry.</p>",
      upvotes: 4,
      downvotes: 1,
      createdAt: new Date('2023-01-18'),
      lastModified: new Date('2023-01-19'),
      authorId: 18,
      topicId: 18,
    },
    {
      id: 19,
      title: "Who wrote 'The Odyssey'?",
      body: "A question about literature.",
      htmlBody: "<p>A question about literature.</p>",
      upvotes: 12,
      downvotes: 3,
      createdAt: new Date('2023-01-19'),
      lastModified: null,
      authorId: 19,
      topicId: 19,
    },
    {
      id: 20,
      title: "What is the speed of light?",
      body: "A fundamental question in physics.",
      htmlBody: "<p>A fundamental question in physics.</p>",
      upvotes: 7,
      downvotes: 2,
      createdAt: new Date('2023-01-20'),
      lastModified: new Date('2023-01-21'),
      authorId: 20,
      topicId: 20,
    },
  ];
  constructor(private httpClient: HttpClient) {
  }

  /*
  getQuestions(page: number): Observable<PaginatedResponse<Question>> {
    return this.httpClient.get<PaginatedResponse<Question>>(`${environment.apiUrl}question`, {
      params: {
        take: 5,
        skip: page * 5,
      },
    });
  }
  */

  
  
  // Função para simular uma chamada de API paginada
  simulateApiCall<T>(data: T[], page: number, take: number): PaginatedResponse<T> {
    const skip = page * take;
    const paginatedData = data.slice(skip, skip + take);
    return {
      data: paginatedData,
      total: data.length,
    };
  }
  
  // Função específica para obter questões usando a função genérica
  getQuestions(page: number): Observable<PaginatedResponse<Question>> {
    const take = 5;
    const response = this.simulateApiCall(this.fakeDatabase, page, take);
    return of(response);
  }

}

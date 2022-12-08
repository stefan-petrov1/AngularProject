import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private httpClient: HttpClient) {}
  // sadly can't use http client options because the server doesn't accept encoded spaces before and after AND

  getPosts(query: string = '') {
    if (query) {
      query = '?' + query;
    }

    return this.httpClient.get<IPost[]>(`api/data/posts${query}`);
  }

  getLength(query: string = '') {
    if (query) {
      query = '&' + query;
    }

    return this.httpClient.get<number>(`api/data/posts?count${query}`);
  }
}

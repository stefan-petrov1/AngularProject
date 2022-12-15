import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, PostData } from 'src/app/shared/interfaces';

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

  getPostsByOwnerId(ownerId: string) {
    const query = `?where=${encodeURIComponent(`_ownerId="${ownerId}"`)}`;
    return this.httpClient.get<IPost[]>(`api/data/posts${query}`);
  }

  getLength(query: string = '') {
    if (query) {
      query = '&' + query;
    }

    return this.httpClient.get<number>(`api/data/posts?count${query}`);
  }

  getPostById(id: string) {
    return this.httpClient.get<IPost>(`api/data/posts/${id}`);
  }

  createPost(postData: PostData) {
    return this.httpClient.post<IPost>('api/data/posts', postData);
  }

  editPost(postData: PostData, id: string) {
    return this.httpClient.put<IPost>(`api/data/posts/${id}`, postData);
  }

  deletePost(id: string) {
    return this.httpClient.delete(`api/data/posts/${id}`);
  }
}

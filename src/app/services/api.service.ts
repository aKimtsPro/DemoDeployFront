import { Injectable } from '@angular/core';
import {IBook} from "../models/book.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Injectable()
export class ApiService {

  private static readonly BASE_URL = `${environment.api.baseUrl}/books`

  constructor(
    private readonly $client: HttpClient,
  ) {}

  createBook(book: IBook): Observable<IBook> {
    return this.$client.post<IBook>(ApiService.BASE_URL, {...book})
  }

  getAll(): Observable<IBook[]> {
    return this.$client.get<any>(ApiService.BASE_URL).pipe(
      map(res => res._embedded.books as IBook[])
    )
  }

}

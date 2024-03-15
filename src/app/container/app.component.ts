import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BOOK_FORM_OPTS} from "../form/book.form";
import {Observable} from "rxjs";
import {IBook} from "../models/book.model";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  protected readonly form: FormGroup;
  protected books$: Observable<IBook[]>;

  constructor(
    private readonly $api: ApiService,
    builder: FormBuilder
  ) {
    this.form = builder.group(BOOK_FORM_OPTS);
    this.books$ = $api.getAll()
  }

  handleSubmit(){
    if( this.form.valid ){
      this.$api.createBook(this.form.value).subscribe(
        () => this.books$ = this.$api.getAll()
      )
    }
  }
}

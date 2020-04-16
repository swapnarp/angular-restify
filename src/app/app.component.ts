import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private filesToUpload = null;
  public message = '';
  constructor(private http: HttpClient) { }

  files(files) {
    this.message = '';
    this.filesToUpload = files;
  }

  upload() {
    const formData = new FormData();
    const files = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i}`, files.item(i), files.item(i).name);
    }
    this.http.post('http://localhost:3000/upload', formData).subscribe(response => this.message = response['message']);
  }
}

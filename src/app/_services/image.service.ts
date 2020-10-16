import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageModel } from '../_models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string;

  constructor(
    private http: HttpClient,
  ) {

    this.url = environment.API_URL;
  }


  addImage(model: ImageModel) {
    return this.http.post<ImageModel>(`${this.url}/api/images/add-image.php`, model);
  }
}



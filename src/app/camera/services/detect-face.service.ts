import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CameraPhoto } from '@capacitor/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class DetectFaceService {
  constructor(private httpClient: HttpClient) {}

  detectFace(photo: CameraPhoto): Observable<boolean> {
    const filename = Guid.create() + '.jpg';
    const f = new File([photo.base64String], filename, { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('file', f);

    this.httpClient.post<any>(environment.detectFaceUrl, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    // .pipe(
    //   map((_) => {
    //     return true;
    //   })
    // );

    return of(true);
  }
}

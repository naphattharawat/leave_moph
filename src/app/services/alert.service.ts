import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(text = 'เกิดข้อผิดพลาด', title = 'Error!') {
    return Swal.fire({
      title: title,
      text: text,
      type: 'error',
      confirmButtonText: 'Cool'
    });
  }

  success(text = 'Success', title = 'congrate') {
    return Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

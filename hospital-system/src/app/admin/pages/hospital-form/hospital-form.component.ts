import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospital-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hospital-form.component.html',
})
export class HospitalFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  hospitalId: string | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      urlApi: ['', Validators.required],
    });

    this.hospitalId = this.route.snapshot.paramMap.get('id');
    this.editMode = !!this.hospitalId;

    if (this.editMode) {
      this.http
        .get<any>(`http://localhost:3000/api/hospitales/${this.hospitalId}`)
        .subscribe((data) => {
          this.form.patchValue(data);
        });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    const endpoint = `http://localhost:3000/api/hospitales${
      this.editMode ? '/' + this.hospitalId : ''
    }`;
    const method = this.editMode ? 'put' : 'post';

    this.http[method](endpoint, data).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}

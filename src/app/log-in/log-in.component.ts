import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  submitted = false;
  public logInForm: FormGroup | any;
  public programmingLanguages: Array<string> = ['Angular', 'Ionic', 'HTML', 'CSS']
  public selectedProgrammingLanguages: Array<string> = []

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.onClickData();
  }

  initializeForm() {
    this.logInForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      contactNumber: [null, [Validators.required, Validators.min(999999999), Validators.max(10000000001)]],
      skillsName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      languageKnow: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  onClickData() {
    setTimeout(() => {
      this.logInForm.setValue({
        fullName: 'Mohd',
        lastName: 'Fahad',
        email: 'Email@gmail.com',
        contactNumber: 1234567890,
        skillsName: 'Coding',
        languageKnow: 'CSS',
        experienceInYears: '3',
        proficiency: 'advanced',
      });
    }, 2000);
  }

  onSubmit() {
    const data = {
      ...this.logInForm.value,
      languageKnow: this.selectedProgrammingLanguages
    }
    console.log(data);

    this.submitted = true
    this.logInForm.markAllAsTouched()
    if(this.logInForm.valid){
      return ;
    }
    console.log(this.logInForm.value);
    
  }

  onLoadDataClick() {
    this.onClickData()
  }

  onLanguageClick(ev: any) {
    console.log(ev);
    
    if (ev.target.checked) {
      // Add in an array
      this.selectedProgrammingLanguages.push(ev.target.value);
    } else {
      // Remove from an array
      const index = this.selectedProgrammingLanguages.findIndex(v => v === ev.target.value);
      if (index !== -1) this.selectedProgrammingLanguages.splice(index, 1);
    }
    console.log(this.selectedProgrammingLanguages);
  }
}

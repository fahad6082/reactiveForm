import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  public employeeForm: FormGroup | any;
  // fullNameLength = 0;

  validationMessages: any = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greated than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.',
    },

    lastName: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be greated than 2 characters.',
      maxlength: 'Last Name must be less than 10 characters.',
    },

    email: {
      required: 'Email is required',
    },

    contactNumber: {
      required: 'Contact Number is required',
    },

    skillsName: {
      required: 'Skills Name is required',
    },

    experienceInYears: {
      required: 'Experience In Years is required',
    },

    proficiency: {
      required: 'Proficiency is required',
    },
  };

  formErrors: any = {
    fullName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    skillsName: '',
    experienceInYears: '',
    proficiency: '',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      skills: this.fb.group({
        skillsName: ['', [Validators.required]],
        experienceInYears: ['', [Validators.required]],
        proficiency: ['', [Validators.required]],
      }),
    });

    this.employeeForm.valueChanges.subscribe((data: any) => {
      this.logValidatorErrors(this.employeeForm)
    })

    // this.employeeForm.get('fullName').valueChanges.subscribe((value : string) => {
    //   this.fullNameLength = value.length
    //   console.log(value);

    // })

    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value));
    //   this.fullNameLength = value.length
    // });

    // this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value));
    //   this.fullNameLength = value.length
    // })
  }

  // ngOnInit(): void {
  //   this.employeeForm = new FormGroup({
  //     fullName: new FormControl(),
  //     email: new FormControl(),
  //     lastName: new FormControl(),
  //     contactNumber: new FormControl(),
  //     skills: new FormGroup({
  //       skillsName: new FormControl(),
  //       experienceInYears: new FormControl(),
  //       proficiency: new FormControl()
  //     })
  //   })
  // }

  //[[[ method to loop all the formgroups]]]
  // logKeyValuePairs(group: FormGroup): void {
  //  Object.keys(group.controls).forEach((key: string) => {
  //  const abstractControl: AbstractControl = group.get(key) as AbstractControl;
  //  if(abstractControl instanceof FormGroup) {

  //   // {{{{Recursively call the method to loop through nested formgroups}}}}
  //   this.logKeyValuePairs(abstractControl);
  //  } else {
  //   // console.log(`Key = ${key} Value = ${abstractControl.value}`);
  //   // abstractControl.disable()
  //  }
  //  })
  // };

  logValidatorErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl: AbstractControl = group.get(key) as AbstractControl;
      if (abstractControl instanceof FormGroup) {
        this.logValidatorErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && 
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  onLoadDataClick(): void {
    this.employeeForm.patchValue({
      fullName: 'Mohd Fahad',
      email:'Gmail.com',
      lastName: 'Siddiqui',
      contactNumber:7172737475,
      skills:{
        skillsName:'coding',
        experienceInYears: 1,
        proficiency:'beginner'
      }
    })
  // console.log(this.employeeForm.value);  
  }
  
  onSubmit(): void {
    console.log(this.employeeForm.value);
    this.logValidatorErrors(this.employeeForm);
    console.log(this.formErrors);
  }
}

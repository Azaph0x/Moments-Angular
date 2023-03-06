import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: String
  @Input() momentData: Moment | null = null;
  @Output() onSubmit = new EventEmitter<Moment>();

  momentForm!: FormGroup

  ngOnInit(): void {
      this.momentForm = new FormGroup({
        id: new FormControl(this.momentData ? this.momentData.id :''),
        title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
        description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
        image: new FormControl('')
      });
  }

  get title() {
    return this.momentForm.get('title')!;
  }


  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]

    // outra forma de inserir dados alem do, new FormControl(''),
    this.momentForm.patchValue({ image: file})
  }

  submit(): void {
    if(this.momentForm.invalid) {
      return;
    }

    console.log(this.momentForm.value)
    this.onSubmit.emit(this.momentForm.value)
  }

}

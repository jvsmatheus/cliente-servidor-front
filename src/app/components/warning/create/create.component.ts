import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarningService } from '../../../services/warning.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Warning } from '../../../models/warning';

interface Form {
    descricao: FormControl<string | null>;
}

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @Output() formSubmittedEvent = new EventEmitter<void>();

  form: FormGroup<Form>;
  warning: Warning = {};
  category: any;

  constructor(
    private warningService: WarningService,
    private snack_bar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup<Form>({
      descricao: new FormControl<string | null>('', [Validators.required, Validators.maxLength(500)])
    });
    console.log(data);
    
    this.warning = this.data.warning;
    this.category = this.data.category;
  }

  save() {
    let form_value = this.form.value;

    const cleaned_value = {
        descricao: form_value.descricao || ''
    };

    // Verifique se a categoria está disponível e é válida
    if (!this.category || !this.category.id) {
        this.snack_bar.open('Categoria inválida', 'fechar', {duration: 2000, panelClass: ['custom-snackbar-error']});
        return;
    }

    // Montando o objeto warning com categoria completa
    this.warning = {
        descricao: cleaned_value.descricao,
        categoria: this.category // Enviando a categoria completa
    };
    console.log(this.warning);
    
    this.warningService.create(this.warning).subscribe({
        next: () => {
            this.snack_bar.open('Aviso cadastrado com sucesso', 'fechar', {duration: 2000, panelClass: ['custom-snackbar-success']});
            this.formSubmittedEvent.emit();
        },
        error: (err) => {
            console.error('Erro ao cadastrar aviso:', err);
            this.snack_bar.open('Erro ao cadastrar aviso', 'fechar', {duration: 2000, panelClass: ['custom-snackbar-error']});
            this.formSubmittedEvent.emit();
        }
    });
}

}

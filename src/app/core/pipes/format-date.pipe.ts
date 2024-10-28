import { PipeTransform, Pipe } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({ name: 'formatDate', standalone: true })
export class FormatDatePipe implements PipeTransform {
    transform(value: string | Date): string {
        return dayjs(value).format("MMM D, YYYY");
    }
}
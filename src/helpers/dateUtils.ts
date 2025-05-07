import { format, parseISO, isValid } from 'date-fns';

/**
 * Преобразует дату-строку ISO (или любой формат, parseISO умеет много случаев)
 * в строку вида "dd.MM.yyyy".
 * Если передано что-то некорректное, возвращает пустую строку или дефолт.
 */
export function formatDate(dateString: string | undefined | null, fallback = '—'): string {
  if (!dateString) return fallback;
  const date = parseISO(dateString);
  if (!isValid(date)) return fallback;
  return format(date, 'dd.MM.yyyy');
}

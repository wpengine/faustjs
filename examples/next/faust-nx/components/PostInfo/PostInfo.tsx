import { FormatDate } from 'components';

type Props = {
  date?: string,
  author?: string,
  className?: string,
};

export default function PostInfo({ date, author, className }: Props): JSX.Element | null {
  if (!date && !author) {
    return null;
  }

  return (
    <div className={className}>
      {date && (
        <time dateTime={date}>
          <FormatDate date={date} />
        </time>
      )}
      {date && author && <>&nbsp;</>}
      {author && <span>By {author}</span>}
    </div>
  );
}

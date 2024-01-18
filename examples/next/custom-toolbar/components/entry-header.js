import style from "./entry-header.module.css";

export default function EntryHeader({ title, date, author }) {
  return (
    <div className={style.entry}>
      {title && <h2 className={style.title}>{title}</h2>}

      {date && author && (
        <div className={style.meta}>
          By {author} on <time>{new Date(date).toDateString()}</time>
        </div>
      )}
    </div>
  );
}
